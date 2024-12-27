import React, { useState } from "react";
import MyButton from "../SharedComponents/MyButton";
import DynamicText from "../SharedComponents/DynamicText";
import FormField from "../SharedComponents/FormField";
import "./Signin.css";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const fields = [
    { label: "Username", value: username, setter: setUsername },
    { label: "Password", value: password, setter: setPassword },
  ];

  const handleChange = (e, setter) => {
    console.log("ssss");
    setter(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    setUsername("");
    setPassword("");
  };

  return (
    <main className="main">
      <div className="contentSignin">
        <h2>Login</h2>
        {fields.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            value={field.value}
            onChange={(e) => handleChange(e, field.setter)}
          />
        ))}
        <MyButton value="Login" btnFn={handleSubmit} />
        <DynamicText
          text="Don't have an account?"
          linkText="Sign up"
          linkHref="/Signup"
        />
      </div>
    </main>
  );
}
