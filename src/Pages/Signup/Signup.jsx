import React, { useEffect, useState } from "react";
import MyButton from "../../Components/MyButton.jsx";
import DynamicText from "../../Components/DynamicText.jsx";
import FormField from "../../Components/FormField.jsx";
// import "./Signup.css";
import "../../styles/Signup.css";
import { request } from "graphql-request";
import * as gql from "../../graphql.js";
import { useNavigate } from "react-router-dom";

export default function Signup({setDashShow}) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fields = [
    { label: "Full Name", value: fullName, setter: setFullName },
    { label: "Username", value: username, setter: setUsername },
    { label: "Password", value: password, setter: setPassword },
  ];

  useEffect(()=>{
    setDashShow(false);
  },[])

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
    let data = {
      fullName,
      username,
      password,
    };
    async function fetchSignup() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.addUserGQL(data)
      );
    }
    fetchSignup();
    setFullName("");
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <main className="main">
      <div className="content">
        <h2>Sign Up</h2>
        {fields.map((field, index) => (
          <FormField
            key={index}
            label={field.label}
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            value={field.value}
            onChange={(e) => handleChange(e, field.setter)}
          />
        ))}
        <MyButton value="Sign Up" btnFn={handleSubmit} />
        <DynamicText
          text="Already have an account?"
          linkText="Login"
          linkHref="/"
        />
      </div>
    </main>
  );
}
