import React from "react";
import { useState } from "react";
import "./Navbar.css";
import swal from 'sweetalert';
import { useLocation , useNavigate } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location=useLocation();
  const isBuyerOrSeller= location.pathname.includes('buyer')||location.pathname.includes('seller');
  function navigateTo(path) {
    navigate(`${path}`)
  }
  const handleClick = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebarOpen state
  };
  const handleLogout=()=>{
    swal({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "success",
      buttons: true,
      dangerMode: true,
    })
    .then((willLogout) => {
      if (willLogout) {
        localStorage.setItem('jwtToken', "");
        navigateTo('/');
      }
    });
  }
  return (
    <>
      <div className="nav-container">
        <div className="logo-title">
          <img className="logo" src="/logo.png" alt="logo"></img>
          <h1>Rentify</h1>
        </div>
        <ul className="top">
        <li onClick={()=>navigateTo('/')}>Home</li>
          <li>About</li>
          <li>Contact</li>
          {isBuyerOrSeller &&<li onClick={handleLogout}>Logout</li>}
        </ul>
        <button className="icon" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
      </div>
      <ul className={`sidebar ${sidebarOpen ? "Open" : ""}`}>
        <li onClick={()=>navigateTo('/')}>Home</li>
        <li>About</li>
        <li>Contact</li>
        {isBuyerOrSeller &&<li onClick={handleLogout}>Logout</li>}
      </ul>
    </>
  );
}
