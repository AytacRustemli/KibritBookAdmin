import React from "react";
import { Link } from "react-router-dom";
import './sideBar.scss';
// import logo from "../../Images/Logo.png"
import logo from "../../Images/logo.jpeg"

const SideBar = () => {
  return (
    <div id="sideBar">
      <ul>
        <li className='dashboard'>
          <img width="50" className='p-1' src={logo} alt="" />
          <span>KibritBook</span>
        </li>
        <hr />
        <li className="book">
          <Link to='/book'>Book</Link>
        </li>
        <li className="language">
          <Link to='/language'>Language</Link>
        </li>
        <li className="genre">
          <Link to='/genre'>Genre</Link>
        </li>
        <li className="author">
          <Link to='/author'>Author</Link>
        </li>
        <li className="publisher">
          <Link to='/publisher'>Publisher</Link>
        </li>
        <li className="slider">
          <Link to='/slider'>Slider</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default SideBar;