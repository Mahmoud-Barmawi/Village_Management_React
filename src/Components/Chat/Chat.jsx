import React, { useEffect, useState } from "react";
import "./Chat.css";
import Admins from "./Admins";
import Message from "./Message";
const Chat = () => {
  let isAdmin;
  const [showMsgs, setShowMsgs] = useState(false);
  //   useEffect(() => {
  //     async function fetchAdmins() {
  //       try {
  //         // let response = await request(
  //         //   "https://village-demo.onrender.com/graphql",
  //         //   gql.userGQL(userId),
  //         //   null,
  //         //   { token: token }
  //         // );
  //         response.map((ele, index) => {
  //           if (ele == "ADMIN") {
  //             isAdmin.push(ele);
  //           }
  //         });
  //       } catch (error) {
  //         console.log("error::", error);
  //       }
  //     }
  //     fetchAdmins();
  //   }, []);

  const [message, setMessage] = useState("");

  function handleSend () {
      console.log(message); 
      setMessage(""); 
  };
  function openMsgs() {
    setShowMsgs(true);
  }
  return (
    <main>
      <h1>Chat with Admins</h1>
      <div className="container">
        <input
          className="input-chat"
          type="text"
          placeholder="Search for an admin..."
          name=""
          id="search-input"
        />

        <Admins admin={isAdmin} openMsgs={openMsgs} />

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
    </main>
  );
};

export default Chat;
