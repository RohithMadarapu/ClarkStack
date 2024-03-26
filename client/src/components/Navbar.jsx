import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../../slices/userSlice';

function Navbar() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='hero'>
            <div className='nav-content'>
                <div className='logo-container'>
                    <Link to="/" className="link-no-underline">
                        <img src="../public/Logo.png" className="logo" />
                    </Link>
                </div>
                <div className='middle-content'>
                    <ul className="navbar-nav">
                        <li className="nav-item  ">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile">Profile</Link>
                        </li>

                    </ul>
                    {!user ? (
                        <div className="btns">
                            <button>
                                <Link to="/register">Sign Up</Link>
                            </button>
                            <button>
                                <Link to="/login">Sign In</Link>
                            </button>
                        </div>
                    ) : (
                        <div className='user_info'>
                            <div className='user_name' onClick={handleDropdownToggle}>
                                <h3>Hi, {user.userName}</h3>
                            </div>
                            <div className="icons" ref={dropdownRef}>
                                <AccountCircleIcon sx={{ fontSize: 40, color: 'white' }} className="user_icon" />
                                <ArrowDropDownIcon sx={{ fontSize: 35, color: "white", cursor: 'pointer' }} onClick={handleDropdownToggle} />
                                {isDropdownOpen && (
                                    <div className="dropdown">
                                        <p onClick={handleLogout}>Logout</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;

