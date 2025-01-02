import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'

const Dashboard = ({setDashShow}) => {
  const navigate=useNavigate();
  const [username,setUsername]=useState()
  function logOut(){
    localStorage.removeItem("Token")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    setDashShow(false);
    navigate("/")
  }
  useEffect(()=>{
    setUsername(localStorage.getItem("username"));
  },[])

    return (
  <aside>
  <div id="upper-div">
    <h1>Dashboard</h1>
    <nav>
      <Link  to="/overView" className="nav-link">Overview</Link>
      <Link   to="/villageManagment" className="nav-link" >Village Management</Link>
      <Link  to="/chat" className="nav-link">Chat</Link>
      <Link  to="/gallery" className="nav-link">Gallery</Link>
    </nav>
  </div>
  <div id="lower-div">
    <div className="avatar" />
    <h4>{username}</h4>
    <a onClick={()=>logOut()}>Logout</a>

  </div>
</aside>

    );
}

export default Dashboard;
