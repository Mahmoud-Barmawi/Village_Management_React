import React from 'react';
import './Dashboard.css'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <aside>
            <div id="upper-div">
                <h1>Dashboard</h1>
                <nav>
                    <Link to="/" class="nav-link" >Overview</Link>
                    <Link to="/villageManagment" class="nav-link" >Village Managment</Link>
                    <Link to="/chat" class="nav-link" >Chat</Link>
                    <Link to="/gallery" class="nav-link" >Gallery</Link>

                </nav>
            </div>

            <div id="lower-div">
                <div class="avatar"></div>
                <h4>Admin Name</h4>
                <a href="pages/login.html">Logout</a>
            </div>

        </aside >
    );
}

export default Dashboard;
