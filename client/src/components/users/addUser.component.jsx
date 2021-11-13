import React from "react";
import axios from "axios";
import './style/addUser.style.css'
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
    <div className="addUser">
      <div className="addUserWarpper">
      <input type="text" name="passportId" className="passportId" placeholder="Passport ID" onChange={inputHandler}/>
      <input type="text" name="cash" className="cash" placeholder="Cash"onChange={inputHandler}/>
      <input type="text" name="credit" className="credit" placeholder="Credit"onChange={inputHandler}/>
      <input type="button" value="Add User" onClick={onFormSubmit}/>
      </div>
      <div className="message" ref={messageRef}></div>
      <div className="addUserLogo">
        <h1><span className="Add-h1">Add</span> <span className="New-h1">New</span> <span className='user-h1'>User</span> </h1>
      </div>
    </div>
  );
}

export default AddUser;
