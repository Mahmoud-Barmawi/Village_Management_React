import React, { useEffect } from "react";

export default function Popup({ type, title, fields, btn, closeFn,fromBtnFn}) {

  return (
    <>
      {type === "view" ? (
        <div className="stylePopups" id="view-village-div">
          <div className="title">
            <h1>{title}</h1>
            <p className="close-button" onClick={closeFn}>
              &times;
            </p>
          </div>
          <div id="content" >
            {fields.map((ele, index) => {
              return (
                <p key={index}><span className="view-title">{ele}: </span><span id="view-name">hello test</span></p>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="stylePopups">
          <div className="title">
            <h1>{title}</h1>
            <p className="close-button" onClick={closeFn}>
              &times;
            </p>
          </div>
          {fields.map((ele, index) => {
            return (
              <div className="villageDetails" key={index}>
                <label>{ele}:</label>
                {ele === "Upload Image" ? (
                  <input type="file" className="btns" />
                ) : (
                  <input type="text" className="btns" />
                )}
              </div>
            );
          })}
          <input onClick={fromBtnFn} type="button" value={btn} className="btns" />
        </div>
      )}
      <div id="overlay" className="active"></div>
    </>
  );
}
