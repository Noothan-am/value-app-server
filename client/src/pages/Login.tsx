import React, { useContext, useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { UserId } from "../context/UserIdContext";
import { ToastContainer, toast } from "react-toastify";
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
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("empty fields found");
      return;
    }

    try {
      console.log("login", process.env.REACT_APP_API_URL);
      const result = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email: inputEmail, password: inputPassword }),
      });
      if (result.ok) {
        toast.success("Login Succesfull", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const data = await result.json();
        setUserInfo({
          userId: data.userId,
          userName: data.userName,
          coins: data.coins,
        });
        // setTimeout(() => {
        navigate(`/my-profile/${data.userId}`);
        // }, 1000);
      } else {
        toast.error("please enter valid credentials", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Internal server error!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("error while login: ", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
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
            disabled={true}
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
