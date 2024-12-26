import React from 'react';
import './Dashboard.css'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
  <aside>
  <div id="upper-div">
    <h1>Dashboard</h1>
    <nav>
      <Link  to="/" className="nav-link">Overview</Link>
      <Link   to="/villageManagment" className="nav-link" >Village Management</Link>
      <Link  to="/chat" className="nav-link">Chat</Link>
      <Link  to="/gallery" className="nav-link">Gallery</Link>
    </nav>
  </div>
  <div id="lower-div">
    <div className="avatar" />
    <h4>Admin Name</h4>
    <a href="pages/login.html">Logout</a>
  </div>
</aside>

    );
}

export default Dashboard;
