import React, { useEffect, useState } from "react";
import FormField from "../SharedComponents/FormField";

export default function Popup({
  type,
  title,
  fields,
  btn,
  closeFn,
  fromBtnFn,
}) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    if (fromBtnFn) {
      fromBtnFn(formData);
    }
  };
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
          <div id="content">
            {fields.map((ele, index) => {
              return (
                <p key={index}>
                  <span className="view-title">{ele}: </span>
                  <span id="view-name">hello test</span>
                </p>
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
          {fields.map((field, index) => (
            <FormField
              key={index}
              parentClass={"villageDetails"}
              label={field}
              placeholder={`Enter your ${field.toLowerCase()}`}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={"btns"}
            />
          ))}

          <input
            onClick={handleSubmit}
            type="button"
            value={btn}
            className="btns"
          />
        </div>
      )}
      <div id="overlay" className="active"></div>
    </>
  );
}
