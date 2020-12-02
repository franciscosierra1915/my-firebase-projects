import React from "react";
import logo from '../images/tech-friend-logo.png'
import { Link } from "react-router-dom";
//Redirect
import { useHistory } from "react-router-dom";

export default function Header({ session }) {

  let history = useHistory();

  return (
    <header>
      <div className='header-inner'>
      <Link to="/" className='react-links'><div className='logo'><span>TECH FRIEND</span><img className='logo-icon' src={logo} alt="logo"/></div></Link>
        <nav>
          <ul>
            <li>
            <Link className='react-links' to="/discover">Discover</Link>
            </li>
            <li>
            <Link to="/login" className='react-links'>{session}</Link>
            </li>
            <li className='btn'>
            <Link to="/about" className='react-links'>About Frank</Link>
            </li>
          </ul>
          <select onChange={(e) => history.push(e.target.value)}>
            <option value='/'>Home</option> 
            <option value='/discover'>Discover</option> 
            <option value='/login'>{session}</option>
            <option value='/about'>About Frank</option> 
          </select> 
        </nav>
      </div>
    </header>
  );
}


