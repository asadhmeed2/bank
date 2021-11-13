import React from "react";
import Transaction from "./transaction.component";
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
      if(transactionType !== "transfer"){
          setAmount(e.target.value);
      }else{
       const tempTransferData = {...transferData}
       tempTransferData[e.target.name] = e.target.value;
       setTransferData(tempTransferData);
    }
    
  };
  const trasferHandler = () => {
    UserTransferHandler(transferData.amount, transferData.receiverPassportId);
  };

  return (
    <div className="transaction-container">
      <div className="transactions-list">
        <div
          className="deposit"
          onClick={() => {
            listHandler("deposit");
          }}
        >
          deposit
        </div>
        <div
          className="withdrow"
          onClick={() => {
            listHandler("withdrow");
          }}
        >
          withdrow
        </div>
        <div
          className="change-credit"
          onClick={() => {
            listHandler("changeCredit");
          }}
        >
          change credit
        </div>
        <div
          className="transfer"
          onClick={() => {
            listHandler("transfer");
          }}
        >
          transfer
        </div>
      </div>
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
        <div
          className="hide"
          onClick={() => {
            listHandler("hide");
          }}
        >
          hide
        </div>
      )}
    </div>
  );
}

export default TransactionContainer;
