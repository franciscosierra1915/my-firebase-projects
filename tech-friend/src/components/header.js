import React from "react";
import logo from '../images/tech-friend-logo.png'

export default function Header() {

  return (
    <header>
      <div className='header-inner'>
        <div className='logo' href='/'><span>TECH FRIEND</span><img className='logo-icon' src={logo} alt="logo"/></div>
        <nav>
          <ul>
            <li>
              <a href='/discover'>discover</a>
            </li>
            {/* <li>
              <a href='/'>products</a>
            </li>
            <li>
              <a href='/'>solutions</a>
            </li> */}
            <li>
              <a href='/login'>login</a>
            </li>
            <li className='btn'>
              <a href='/'>About Frank</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
