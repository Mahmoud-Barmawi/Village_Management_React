import React from "react";
import MyTextInput from "./MyTextInput";

export default function FormField({ label, placeholder, value, onChange }) {
  return (
    <div>
      <div className={label.toLowerCase().replace(" ", "")}>
        <label>{label}</label>
        <MyTextInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
