import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Admins from "./Admins";
import Message from "./Message";
import * as gql from '../VillageManagment/graphql'
import request from "graphql-request";
import Users from "./Users"

const Chat = () => {
    let isAdmin=[];
    const [showMsgs, setShowMsgs] = useState(false);

    const socketRef=useRef(null);

    const [message, setMessage] = useState("");
    const [admins,setAdmins]=useState();
    const [users,setUsers]=useState();
    const [msgs,setMsgs]=useState([]);
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const roomIdRef=useRef(username);

    useEffect(() => {
        let token=localStorage.getItem("Token")
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
        socketRef.current = new WebSocket('ws://localhost:3000');

        socketRef.current.onopen=()=>{
            socketRef.current.send(JSON.stringify({ msg: "", roomId: username, type: "start", author: username, isAdmin: (role=="ADMIN") }));
        }

        socketRef.current.onmessage = function (event) {
            const data = JSON.parse(event.data);

            if (data.type == 'notify') {
                if(users){
                    setUsers([...users, data.author])
                }else{
                    setUsers([data.author])
                }
            }else if(data.type=='msg'){
                console.log(data.msg);
                
                setMsgs((prevMsgs) => [...prevMsgs, data]);
                // if(msgs.length!=0){
                //     console.log("testIF",data);
                //     setMsgs([...msgs, data])
                // }else{
                //     console.log("testELSE",data);
                //     setMsgs([data])
                // }
            }
        };
    }, [])


    function handleSend() {
        socketRef.current.send(JSON.stringify({ msg:message , roomId: roomIdRef.current, type: "msg", author: username, isAdmin: (role=="ADMIN") }));
        setMessage("");
    };

    function openMsgs(admin) {
        //user
        console.log("hello");
        
        setShowMsgs(true);
        const username=localStorage.getItem("username");
        const role =localStorage.getItem("role");

        // socketRef.current.onopen=()=>{
        socketRef.current.send(JSON.stringify({ msg: admin, roomId: username, type: "join", author: username, isAdmin: (role=="ADMIN") }));
        console.log("testetestset");
            
        // }
    }

    function acceptMsg(user){
        //admin
        console.log(user);
        setShowMsgs(true);
        roomIdRef.current=user;
        socketRef.current.send(JSON.stringify({ msg: "", roomId: user, type: "accept", author: username,isAdmin:(role=="ADMIN")}));
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

                 <Users user={users} openMsgs={acceptMsg} />
     
                 {showMsgs && (
                   <div id="chat-container" style={{ display: "flex" }}>
                     <h3>
                       Chat with: <span id="admin-chat-name"></span>
                     </h3>
                     <div id="chat-window">
                         {
                            (msgs.length!=0)&& msgs.map((e,index)=>{
                                return (
                                    <Message key={index} msgAuthor={e.author} msgContent={e.msg} color="content-admin" />
                                )
                        })
                    }
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
                    {
                        (msgs.length!=0)&& msgs.map((e,index)=>{
                            return (
                                <Message key={index} msgAuthor={e.author} msgContent={e.msg} color="content-user" />
                            )
                        })
                    }
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
