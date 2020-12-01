import React from "react";
import logo from '../images/tech-friend-logo.png'
//Redirect
import { useHistory } from "react-router-dom";

export default function Header({ user }) {
  
  let history = useHistory();

  return (
    <header>
      <div className='header-inner'>
        <a href='/'><div className='logo'><span>TECH FRIEND</span><img className='logo-icon' src={logo} alt="logo"/></div></a>
        <nav>
          <ul>
            <li>
              <a href='/discover'>discover</a>
            </li>
            <li>
              <a href='/login'>{user ? 'Logout' : 'Login'}</a>
            </li>
            <li className='btn'>
              <a href='/about'>About Frank</a>
            </li>
          </ul>
          <select onChange={(e) => history.push(e.target.value)}>
            <option value='/'>Home</option> 
            <option value='/discover'>Discover</option> 
            <option value='/login'>{user ? 'Logout' : 'Login'}</option>
            <option value='/about'>About Frank</option> 
          </select> 
        </nav>
      </div>
    </header>
  );
}

