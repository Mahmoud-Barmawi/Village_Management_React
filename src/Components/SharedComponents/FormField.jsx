import React from "react";
import MyTextInput from "./MyTextInput";

export default function FormField({
  parentClass,
  label,
  placeholder,
  value,
  onChange,
  className,
}) {
  return (
    <>
      <div
        className={
          parentClass ? "villageDetails" : label.toLowerCase().replace(" ", "")
        }
      >
        <label>{label}</label>
        <MyTextInput
          type={
            label === "Upload Image"
              ? "file"
              : label === "Password"
                ? "password"
                : "text"
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
        />
      </div>
    </>
  );
}
