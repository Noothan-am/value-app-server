import React, { useContext, useEffect, useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { UserId } from "../context/UserIdContext";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const styles = require("../styles/login.module.css").default;
const bgimage = require("../assets/images/Loading-background.png");

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserId) as any;

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputEmail = email.trim();
    const inputPassword = password.trim();

    if (!inputEmail || !inputPassword) {
      toast.warn("please fill all details", {
        position: toast.POSITION.TOP_CENTER,
      });
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
      if (result.ok) {
        toast.error("login succesfull", {
          position: toast.POSITION.TOP_CENTER,
        });
        const data = await result.json();
        setUserInfo({
          userId: data.userId,
          userName: data.userName,
        });
        navigate(`/my-profile/${data.userId}`);
      } else {
        toast.error("please enter valid credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error("Internal server error!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("error while login: ", error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} transition={Zoom} />
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
