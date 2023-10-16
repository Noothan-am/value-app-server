import React, { useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
const styles = require("../styles/login.module.css").default;
const bgimage = require("../assets/images/Loading-background.png");

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputEmail = email.trim();
    const inputPassword = password.trim();

    if (!inputEmail || !inputPassword) {
      window.alert("Please fill all the fields");
      console.log("empty fields found");
      return;
    }

    try {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: inputEmail, password: inputPassword }),
      });
      console.log(result.status);
      if (result.ok) {
        window.alert("successfull login");
        navigate("/my-profile");
      } else {
        window.alert("Please add valid credentials");
        console.log("User not found. Please add valid credentials.");
      }
    } catch (error) {
      window.alert("Please try again");
      console.log("error while login: ", error);
    }
  };

  return (
    <>
      <div className={styles["login__background-image"]}>
        <img src={bgimage} alt="" />
      </div>

      <div className={styles["login"]}>
        <h1 className={styles["login__title"]}>Welcome Back!</h1>
        <form className={styles["login__form"]} method="POST">
          <div className={styles["login__form-email"]}>
            <input
              type="email"
              className={styles["login__form-email-input"]}
              placeholder="Email address"
              value={email}
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles["login__form-password"]}>
            <input
              type="password"
              className={styles["login__form-password-input"]}
              placeholder="Password"
              value={password}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <BiLockAlt className={styles["login__form-password-lock"]} />
          </div>
          <Button
            content={"Login"}
            type="submit"
            handleClick={handleLoginSubmit}
          />
          <a href="/forgot-password" className={styles["login__form-link"]}>
            Forgot Password?
          </a>
        </form>
      </div>
    </>
  );
};

export default Login;
