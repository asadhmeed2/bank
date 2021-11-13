import React from 'react'
import {Link} from 'react-router-dom'
import './style/navbar.style.css'
function Navbar() {
    return (
        <div className="navbar">
            <ul>
              <Link className='link' to={'/'}><li>Home</li></Link>
              <Link className='link' to={'/users'} ><li>Users</li></Link>
              <Link className='link' to={'/addUser'}><li>Add User</li></Link>
            </ul>  
        </div>
    )
}

export default Navbar
