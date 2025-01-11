import React from "react";

export default function Message({color,msgAuthor,msgContent}) {
  console.log(color);
  const colorClass=(color)?"content-admin":"content-user"
  return (
    <>
      <div className="message">
        <span className="writer">{ msgAuthor +": " } </span>
        <span className={colorClass}>
             { msgContent }
        </span>
      </div>
    </>
  );
}
