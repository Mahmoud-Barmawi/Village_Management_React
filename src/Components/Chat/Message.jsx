import React from "react";

export default function Message({color,msgAuthor,msgContent}) {
  return (
    <>
      <div className="message">
        <span className="writer">{ msgAuthor +": " } </span>
        <span className={color}>
             { msgContent }
        </span>
      </div>
    </>
  );
}
