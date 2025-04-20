import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux';
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react'

function Navbar() {
  const {isAuthenticated, user} = useSelector(state=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () =>{
    dispatch(logout());
    navigate('/login');
  };

  const toggleLogoutDropdown = () => {
    setShowLogout((prev) => !prev);
  };

  // Close dropdown if clicked outside
useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <nav>
    <div className="navbar">
        <div className="left">
           <div className='logo'> 
            <span class="material-symbols-outlined bg-logo">earbuds</span>
            <span class="material-symbols-outlined bg">home</span>
           </div>  
        
            <div className="search-music">

            <span class="material-symbols-outlined" id='search'>search</span>
            <input type="text" 
             className='search-input'
             placeholder='What do you want to play?'
            />
            </div> 
        </div>
        
        <div className="right">
           <div className="menu-items">
                <input type="button" value="Explore Premium" className='install-btn' />
                <span class="material-symbols-outlined">download</span>
                <span className='install'>Install App</span>
                <span class="material-symbols-outlined" id='notification'>notifications</span>
                {!isAuthenticated ? (
              <Link to='/login'><span className="material-symbols-outlined" id="account-circle">account_circle</span></Link>
            ) : (
               <div className="user-info">
                <p  onClick={toggleLogoutDropdown}  className="pcolor">{user?.fname[0]}</p>
                {showLogout && (
                  <div className="dropdown">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div> 
              
            )}
            </div>
                    
        </div>
        

    </div>
         

    </nav>
  )
}

export default Navbar