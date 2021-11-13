import React from "react";
import axios from "axios";
import User from './user.component'
function UserContainer() {
    const [users,setUsers] = React.useState([]);
  React.useEffect(() => {
    (()=> {
      axios.get("http://localhost:5000/users").then((response) => {
          setUsers(response.data)
      });
    })();
  }, []);

  return <div>
      {users.map((user)=>{
          return <User key={user.id} id={user.id} passportId={user.passportId} cash={user.cash} credit={user.credit}/>
      })}
  </div>;
}

export default UserContainer;
