import React from "react";
import TransactionContainer from "../transactions/transactionContainer.component";
import "./style/user.style.css";
import axios from "axios";
function User({ id, passportId, cash, credit }) {
  const [user, setUser] = React.useState({
    id,
    passportId,
    cash,
    credit,
  });

  const messageRef = React.useRef();
  const UserTransferHandler = (amount, toAccountPassportID) => {
    const requestData = {
      amount: amount,
      receiverPassportId: toAccountPassportID,
      id: user.id,
    };
    axios
      .put("http://localhost:5000/transfer", requestData)
      .then((response) => {
        console.log(response);
        const tempUser = { ...user };
        tempUser.cash -= amount;
      })
      .catch((error) => {
        console.log(error.message);
        messageRef.current.textContent = "Error transfer failed: ";
      });
  };
  const userUpdateHandler = (amount, transactionType) => {
    /**
     * deposit
     * withdrow
     * changeCredit
     */
    const requestData = {
      amount: amount,
      id: user.id,
    };
    console.log(requestData);

    axios
      .put(`http://localhost:5000/${transactionType}`, requestData)
      .then((response) => {
        const tempUser = { ...user };
        if (transactionType === "deposit") {
          tempUser.cash += amount;
        } else if (transactionType === "withdrow") {
          tempUser.cash -= amount;
        } else if (transactionType === "changeCredit") {
          tempUser.credit = amount;
        }
      })
      .catch((error) => {
        console.log(error.message);
        messageRef.current.textContent = `Error ${transactionType} failed:`;
      });
  };
  const hideMessage = () => {
    messageRef.current.textContent = "";
  };
  return (
    <div className="userWarpper">
      <div className="user">
        <div className="id">Id : {id}</div>
        <div className="passportId"> PassportId : {passportId}</div>
        <div className="cash">Cash : {cash}</div>
        <div className="credit">Credit : {credit}</div>
      </div>
    
        <TransactionContainer
          hideMessage={hideMessage}
          UserTransferHandler={UserTransferHandler}
          userUpdateHandler={userUpdateHandler}
        />
   
      <div ref={messageRef} className="message"></div>
    </div>
  );
}

export default User;
