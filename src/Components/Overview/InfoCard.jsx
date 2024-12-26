import React from "react";
export default function InfoCard({ content, value,id }) {
  return (
  
      <div className="card info" id={id}>
        <h2>
          {content + value}
        </h2>
      </div>
  
  );
}
