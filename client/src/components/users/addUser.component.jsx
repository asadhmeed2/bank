import React from "react";
import axios from "axios";
function AddUser() {
    const [user,setUser]=React.useState({passportId:"",cash:"",credit:""});
    const messageRef =React.useRef();
  const inputHandler=(e)=>{
    const tempUser ={...user};
    tempUser[e.target.name]=e.target.value
    setUser(tempUser);
  
  }
  const onFormSubmit=()=>{
    console.log(user);
    axios.post("http://localhost:5000/users",user).then(response=>{
        messageRef.current.textContent = 'user wase added successfuly'
    }).catch(error=>{
      console.log(error);
    });
  }
  return (
    <div className="user">
      <input type="text" name="passportId" className="passportId" placeholder="Passport ID" onChange={inputHandler}/>
      <input type="text" name="cash" className="cash" placeholder="Cash"onChange={inputHandler}/>
      <input type="text" name="credit" className="credit" placeholder="Credit"onChange={inputHandler}/>
      <input type="button" value="Add User" onClick={onFormSubmit}/>
      <div className="message" ref={messageRef}></div>
    </div>
  );
}

export default AddUser;
