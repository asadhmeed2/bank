import "./App.css";
import AddUser from "./components/users/addUser.component";
import Home from "./components/home/home.component";
import UserContainer from "./components/users/userContainer.component";
import Navbar from "./components/navbar/navbar.component";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/users" element={<UserContainer/>}/>
      <Route path="/addUser" element={<AddUser/>}/>
     </Routes>
    </Router>
    </div>
  );
}

export default App;
