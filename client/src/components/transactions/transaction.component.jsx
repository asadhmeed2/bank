import React from 'react'
import'./style/transaction.style.css'
function Transaction({type,onAmountChange,onClick,secondInputName}) {
    const onInputChange= (e)=>{
        if(parseInt(e.target.value)>=0){
            onAmountChange(e);
        }else{
            e.target.value = e.target.value && Math.max(0, e.target.value);
        }
    }
    const onBtnClick= (e)=>{
        onClick(e)
    }
    return (
        <div className={'transaction'}>
          <input type="button"  value={type} onClick={onBtnClick} />  
          <input type="number" name={'amount'} placeholder={'amount'} onChange={onInputChange}/>  
          {secondInputName?<input type="number" name={secondInputName} placeholder={'to account with id of'}  onChange={onInputChange}/>:""}  
        </div>
    )
}

export default Transaction
