import React from "react";

export default function Admins({ admin, openMsgs }) {
  return (
    <div id="admin-container">
      <h3>Available Admins</h3>
      <div id="admin-list">
        {/* {admin.map((ele,index)=>{ */}
        <div className="admin" onClick={openMsgs}>
          <div className="avatar"></div>
          <div className="admin-name">Admin1</div>
        </div>

        {/*}),[]} */}
      </div>
    </div>
  );
}
