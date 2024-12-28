import React, { useEffect, useState } from "react";
import FormField from "../SharedComponents/FormField";

export default function Popup({
  type,
  title,
  fields,
  btn,
  closeFn,
  formBtnFn,
  villageView
}) {

  const [formData, setFormData] = useState({});

  const map= {
    "Village Name": "villageName",
    "Region/District": "regionDistrict",
    "Land Area (sq km)": "landArea",
    "Latitude": "latitude",
    "Longitude": "longitude",
    "Upload Image": "image",
    "Categories/Tags": "categories",
    "Population Size": "populationSize",
    "Age Distribution": "ageDistribution",
    "Gender Ratios": "genderRatios",
    "Population Growth Rate": "populationGrowthRate"
  };

  function getCorrectText(field) {
    const key = map[field];
    return villageView[key];
  }

  const handleInputChange = (field, value) => {
    if(field==="Gender Ratios" || field==="Age Distribution"){
      value=value.split(',');
    }
    setFormData({ ...formData, [field]: value });
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
                  <span id="view-name">{getCorrectText(ele)}</span>
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
            onClick={()=>formBtnFn(formData)}
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
