const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const uniqid = require("uniqid");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//add user
app.post("/users", (req, res) => {
  if (!fs.existsSync(path.resolve(__dirname, "./user.json"))) {
    fs.writeFileSync("user.json", "[]");
  }
  let users = new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, "./user.json"), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  users
    .then((data) => {
      if (
        data.find((user) => {
          return parseInt(req.body.passportId) === user.passportId;
        })
      ) {
        return res.status(200).send("user exist");
      }

      const user = {
        id: uniqid(),
        passportId: parseInt(req.body.passportId),
        cash: parseInt(req.body.cash),
        credit: parseInt(req.body.credit),
      };
      let temp = [...data, user];
      new Promise((resolve, reject) => {
        fs.writeFileSync(
          path.resolve(__dirname, "./user.json"),
          JSON.stringify(temp)
        );
        resolve(user);
      })
        .then((user) => {
          return res.status(201).json({ user: user });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json("Internal Server Error");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json("file not found");
    });
});

// get all users
app.get("/users", (req, res) => {
  new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, "./user.json"), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  }).then((data) => {
    res.status(200).json(data);
  });
});
// get user by id
app.get("/users/:id", (req, res) => {
  new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, "./user.json"), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  })
    .then((data) => {
      const user = data.find((user) => user.id === req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json("user does not exist");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

//Deposit to user
app.put("/deposit", (req, res) => {
  depositOrWithdrowOrUpdateCredit("deposit", req, res);
});
//Withdrow from user
app.put("/withdrow", (req, res) => {
  depositOrWithdrowOrUpdateCredit("withdrow", req, res);
});
//Update user credit
app.put("/changeCredit", (req, res) => {
  depositOrWithdrowOrUpdateCredit("updateCredit", req, res);
});
//Update user credit
app.put("/transfer", (req, res) => {
  depositOrWithdrowOrUpdateCredit("transfer", req, res);
});
/**
 *
 * @param {*} type type of the transaction deposit or withdrow or update credit
 * @param {*} req request from the client
 * @param {*} res respons to the client
 * function handle the update of the user data
 */
function depositOrWithdrowOrUpdateCredit(type, req, res) {
  if (!fs.existsSync(path.resolve(__dirname, "./user.json"))) {
    fs.writeFileSync("user.json", "[]");
  }
  let users = new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, "./user.json"), (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  users
    .then((data) => {
      const user = data.find((user) => {
        return req.body.id === user.id;
      });
      if (!user) {
        return res.status(200).send("user does not exist");
      }
      if (type === "deposit") {
        if (parseInt(req.body.amount) >= 0) {
          user.cash += parseInt(req.body.amount);
        } else {
          return res.status(406).send("connot deposit a Negative Number");
        }
      } else if (type === "withdrow") {
        if (parseInt(req.body.amount) >= 0) {
          if (user.cash - parseInt(req.body.amount) >= -user.credit) {
            user.cash -= parseInt(req.body.amount);
          } else {
            return res.status(406).send("cannot withdrow credit too low");
          }
        } else {
          return res.status(406).send("connot withdrow a Negative Number");
        }
      } else if (type === "updateCredit") {
        if (parseInt(req.body.amount) >= 0) {
          if (user.cash >= -parseInt(req.body.amount)) {
            user.credit = parseInt(req.body.amount);
          } else {
            return res.status(406).send("credit connot be less then user cash");
          }
        } else {
          return res.status(406).send("credit connot be a Negative Number");
        }
      } else if (type === "transfer") {
        if (parseInt(req.body.receiverPassportId)) {
          const receiverUser = data.find((user) => {
            return req.body.receiverPassportId === user.passportId;
          });
          if (!receiverUser) {
            return res
              .status(404)
              .send("the user with you transfered the cash to daes not exist");
          }
          if (user.passportId === receiverUser.passportId) {
            return res
              .status(406)
              .send("connot transfer from user to the same user");
          }
          
          if (user.cash >= -user.credit) {
            user.cash -= parseInt(req.body.amount);
            receiverUser.cash += parseInt(req.body.amount);
          } else {
            return res.status(406).send("cannot withdrow credit too low");
          }
        } else {
          return res
            .status(406)
            .send("transfered cash cannot be a Negative Number");
        }
      }
      new Promise((resolve, reject) => {
        fs.writeFileSync(
          path.resolve(__dirname, "./user.json"),
          JSON.stringify(data)
        );
        resolve(user);
      })
        .then((user) => {
          if (type === "deposit") {
            return res
              .status(201)
              .json(`deposit success new cash amount is : ${user.cash}`);
          } else if (type === "withdrow") {
            return res
              .status(201)
              .json(`withdrow success new cash amount is : ${user.cash}`);
          } else if (type === "updateCredit") {
            return res
              .status(201)
              .json(
                `credit successfuly updated new credit is : ${user.credit}`
              );
          } else if (type === "transfer") {
            return res
              .status(201)
              .json(`the transaction of ${req.body.amount} is success`);
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json("Internal Server Error");
        });
    })
    .catch((err) => {
      return res.status(404).json("file not found");
    });
}
app.listen("5000", () => {
  console.log("listening on port 5000");
});
