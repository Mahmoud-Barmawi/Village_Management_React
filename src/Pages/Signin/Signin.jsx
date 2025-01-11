import React, { useState } from "react";
// import MyButton from "../../Components/MyButton";
import MyButton from "../../Components/MyButton.jsx";
import DynamicText from "../../Components/DynamicText";
import FormField from "../../Components/FormField";
import "../../styles/Signin.css";
import * as gql from "../../graphql";
import { request } from "graphql-request";
import { useNavigate } from "react-router-dom";

export default function Signin({setDashShow}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fields = [
    { label: "Username", value: username, setter: setUsername },
    { label: "Password", value: password, setter: setPassword },
  ];

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      username,
      password,
    };

    let token;
    let userId;
    let usernameX;
    let role;

    async function fetchSignIn() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.loginUserGQL(data)
      );

      console.log(response);

      console.log(response.loginUser);

      token = response.loginUser.token;
      userId = response.loginUser.userId;
      usernameX = response.loginUser.userName;
      role=response.loginUser.role

      setUsername("");
      setPassword("");

      if (token != "") {
        localStorage.setItem("Token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", usernameX);
        localStorage.setItem("role", role);
        setDashShow(true)
        navigate("/overView");
      }
    }

    fetchSignIn();
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
