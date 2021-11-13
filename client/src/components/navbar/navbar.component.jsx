import React from 'react'
import {Link} from 'react-router-dom'
import './style/navbar.style.css'
function Navbar() {
    return (
        <div className="navbar">
            <ul>
              <Link to={'/'}><li>Home</li></Link>
              <Link to={'/users'} ><li>Users</li></Link>
              <Link to={'/addUser'}><li>Add User</li></Link>
            </ul>  
        </div>
    )
}

export default Navbar
