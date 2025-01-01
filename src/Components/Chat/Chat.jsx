import React from 'react';
import './Chat.css'
const Chat = () => {
    return (
        <main>
            <h1>Chat with Admins</h1>
            <div className="container">
                <input className="input-chat" type="text" placeholder="Search for an admin..." name="" id="search-input"/>
                    <div id="admin-container">
                        <h3>Available Admins</h3>
                        <div id="admin-list">
                        </div>
                    </div>
                    <div id="chat-container" style={{display:'none'}}>
                        <h3>Chat with: <span id="admin-chat-name"></span></h3>
                        <div id="chat-window">
                            <div className="message">
                                <span className="writer">Admin: </span>
                                <span className="content-admin">Hello! How can i assist you today?</span>
                            </div>
                            <div className="message">
                                <span className="writer">You: </span>
                                <span className="content-user">Hello! How can i assist you today?</span>
                            </div>
                        </div>
                        <textarea placeholder="Type your message..." className="input-chat"></textarea>
                        <button id="send-btn">Send</button>
                    </div>
            </div>
        </main>
    );
}

export default Chat;
