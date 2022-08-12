import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function Nav({ setAuth }) {
    const navStyle = {
        color: 'black',
        textDecoration: 'none'
    }

    return (
        <nav>
            <Link className='logo' to={'/'}>
                <h3>BYsport</h3>
            </Link>
            <ul className='nav-links'>
                <Link style={navStyle} to={'/'}>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to={'/program'}>
                    <li>Program</li>
                </Link>
                <Link style={navStyle} to={'/register'}>
                    <li>Register</li>
                </Link>
                <Link style={navStyle} to={'/login'}>
                    <li>{!setAuth ? 'Login' : 'Logout'}</li>
                </Link>    
                
            </ul>
        </nav>
    );
}

export default Nav;
