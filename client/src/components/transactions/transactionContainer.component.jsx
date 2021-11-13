import React from "react";
import Transaction from "./transaction.component";
import "./style/transactionContainer.style.css";
function TransactionContainer({
  hideMessage,
  userUpdateHandler,
  UserTransferHandler,
}) {
  const [transactionType, setTransactionType] = React.useState("hide");
  const [transferData, setTransferData] = React.useState({
    amount: 0,
    receiverPassportId: 0,
  });
  const [amount, setAmount] = React.useState(0);
  const listHandler = (type) => {
    console.log(transactionType);
    setTransactionType(type);
    {
      type === "hide" && (() => hideMessage())();
    }
  };
  const updateUserHandler = () => {
    userUpdateHandler(amount, transactionType);
  };
  const updateOnChangHandler = (e) => {
    if (transactionType !== "transfer") {
      setAmount(e.target.value);
    } else {
      const tempTransferData = { ...transferData };
      tempTransferData[e.target.name] = e.target.value;
      setTransferData(tempTransferData);
    }
  };
  const trasferHandler = () => {
    UserTransferHandler(transferData.amount, transferData.receiverPassportId);
  };

  return (
    <>
    <div className="transaction-container">
      <div className="transactions-list">
        <button
          className="btn deposit"
          onClick={() => {
            listHandler("deposit");
          }}
        >
          deposit
        </button>
        <button
          className="btn withdrow"
          onClick={() => {
            listHandler("withdrow");
          }}
        >
          withdrow
        </button>
        <button
          className="btn change-credit"
          onClick={() => {
            listHandler("changeCredit");
          }}
        >
          change credit
        </button>
        <button
          className="btn transfer"
          onClick={() => {
            listHandler("transfer");
          }}
        >
          transfer
        </button>
      </div>
      </div>
      <div className="transactions-list">
        {transactionType === "deposit" && (
          <Transaction
            type="deposit"
            onAmountChange={updateOnChangHandler}
            onClick={updateUserHandler}
            secondInputName={0}
          />
        )}
        {transactionType === "withdrow" && (
          <Transaction
            type="withdrow"
            onAmountChange={updateOnChangHandler}
            onClick={updateUserHandler}
            secondInputName={0}
          />
        )}
        {transactionType === "changeCredit" && (
          <Transaction
            type="updateCredit"
            onAmountChange={updateOnChangHandler}
            onClick={updateUserHandler}
            secondInputName={0}
          />
        )}
        {transactionType === "transfer" && (
          <Transaction
            type="transfer"
            onAmountChange={updateOnChangHandler}
            onClick={trasferHandler}
            secondInputName={"receiverPassportId"}
          />
        )}
        {transactionType !== "hide" && (
          <button
            className="btn hide"
            onClick={() => {
              listHandler("hide");
            }}
          >
            hide
          </button>
        )}
      </div>
    
    </>
  );
}

export default TransactionContainer;
