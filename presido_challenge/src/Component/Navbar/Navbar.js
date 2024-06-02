import React from "react";
import './Navbar.css'
export default function Navbar(){
    return(
      <div className="nav-container">
        <div className="logo-title"><img className="logo" src="/logo.png"></img>
        <h1 >Rentify</h1></div>
        <ul><li>Home</li>
        <li>About</li>
        <li>Contact</li></ul>
      </div>  
    );
}