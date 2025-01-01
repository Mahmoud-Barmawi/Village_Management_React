import React from "react";

export default function Message({msgAuthor,msgContent}) {
  return (
    <>
      <div className="message">
        <span className="writer">{ msgAuthor } </span>
        <span className="content-admin">
             { msgContent }
        </span>
      </div>
    </>
  );
}
