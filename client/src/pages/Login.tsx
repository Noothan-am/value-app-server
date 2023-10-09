import React, { useState } from "react";
import { BiLockAlt } from "react-icons/bi";
const styles = require("../styles/login.module.scss").default;
const bgimage = require("../assets/images/Loading-background.png");

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <>
      <div className={styles["login__background-image"]}>
        <img src={bgimage} alt="" />
      </div>

      <div className={styles["login"]}>
        <h1 className={styles["login__title"]}>Welcome Back!</h1>
        <form className={styles["login__form"]} onSubmit={handleLoginSubmit}>
          <div className={styles["login__form-email"]}>
            <input
              type="email"
              className={styles["login__form-email-input"]}
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles["login__form-password"]}>
            <input
              type="password"
              className={styles["login__form-password-input"]}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <BiLockAlt className={styles["login__form-password-lock"]} />
          </div>
          <button type="submit" className={styles["login__form-button"]}>
            Login
          </button>
          <a href="/forgot-password" className={styles["login__form-link"]}>
            Forgot Password?
          </a>
        </form>
      </div>
    </>
  );
};

export default Login;
