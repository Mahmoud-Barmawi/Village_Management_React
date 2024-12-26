import React from "react";
export default function InfoCard({ content, number }) {
  return (
  
      <div className="card info" id={number}>
        <h2>
          {content}
        </h2>
      </div>
  
  );
}
