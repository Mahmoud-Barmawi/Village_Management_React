import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Admins from "./Admins";
import Message from "./Message";
import * as gql from "../VillageManagment/graphql";
import request from "graphql-request";
import Users from "./Users";

const Chat = () => {
  let isAdmin = [];
  const [showMsgs, setShowMsgs] = useState(false);

  const socketRef = useRef(null);

  const [message, setMessage] = useState("");
  const [admins, setAdmins] = useState();

  useEffect(() => {
    let token = localStorage.getItem("Token");
    async function fetchAdmins() {
      try {
        let response = await request(
          "http://localhost:3000/graphql",
          gql.getUsersGQL(),
          null,
          { token: token }
        );
        console.log(response);

        response.Users.map((ele, index) => {
          console.log(ele);

          if (ele.role == "ADMIN") {
            isAdmin.push(ele);
          }
        });
        setAdmins(isAdmin);
      } catch (error) {
        console.log("error::", error);
      }
    }
    fetchAdmins();
  }, []);

  useEffect(() => {
    console.log("admins---");
    console.log(admins);
    console.log("admins---");
  }, [admins]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000");
  }, []);

  function handleSend() {
    console.log(message);
    setMessage("");
  }

  let role = localStorage.getItem("role");
  function openMsgs(admin) {
    //user
    setShowMsgs(true);
    const username = localStorage.getItem("username");

    socketRef.current.onopen = () => {
      socketRef.current.send(
        JSON.stringify({
          msg: "",
          roomId: username,
          type: "join",
          author: username,
          isAdmin: role,
        })
      );
    };
  }

  function acceptMsg(user) {
    //admin
    setShowMsgs(true);
    socketRef.current = new WebSocket("ws://localhost:3000");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    socketRef.current.onopen = () => {
      socketRef.current.send(
        JSON.stringify({
          msg: "",
          roomId: user,
          type: "accept",
          author: username,
          isAdmin: role,
        })
      );
    };
  }

  return (
    <main>
      {role == "ADMIN" ? (
               <>
               <h1>Chat with Users</h1>
               <div className="container">
                 <input
                   className="input-chat"
                   type="text"
                   placeholder="Search for an admin..."
                   name=""
                   id="search-input"
                 />

                 <Users openMsgs={openMsgs} />
     
                 {showMsgs && (
                   <div id="chat-container" style={{ display: "flex" }}>
                     <h3>
                       Chat with: <span id="admin-chat-name"></span>
                     </h3>
                     <div id="chat-window">
                       <Message />
                     </div>
                     <textarea
                       placeholder="Type your message..."
                       className="input-chat"
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                     ></textarea>
                     <button id="send-btn" onClick={handleSend}>
                       Send
                     </button>
                   </div>
                 )}
               </div>
             </>
      ) : (
        <>
          <h1>Chat with Admins</h1>
          <div className="container">
            <input
              className="input-chat"
              type="text"
              placeholder="Search for an admin..."
              name=""
              id="search-input"
            />

            <Admins admin={admins} openMsgs={openMsgs} />

            {showMsgs && (
              <div id="chat-container" style={{ display: "flex" }}>
                <h3>
                  Chat with: <span id="admin-chat-name"></span>
                </h3>
                <div id="chat-window">
                  <Message />
                </div>
                <textarea
                  placeholder="Type your message..."
                  className="input-chat"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button id="send-btn" onClick={handleSend}>
                  Send
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Chat;
