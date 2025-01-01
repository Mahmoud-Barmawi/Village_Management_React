import React from "react";
export default function Users({ user, openMsgs}) {
  return (
    <div id="admin-container">
    <h3>Available Users</h3>
    <div id="admin-list">
      {user && user.map((ele, index) => {
        return (
          <div key={index} className="admin" onClick={openMsgs(ele.username)}>
            <div className="avatar"></div>
            <div className="admin-name">{ele.username}</div>
          </div>
        )
      })}
    </div>
  </div>
  )
}
