import React, { useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import "../styles/login.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login">
      <h1 className="login__title">Welcome Back!</h1>
      <form className="login__form" onSubmit={handleLoginSubmit}>
        <div className="login__form-email">
          <input
            type="email"
            className="login__form-email-input"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login__form-password">
          <input
            type="password"
            className="login__form-password-input"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <BiLockAlt className="login__form-password-lock" />
        </div>
        <button type="submit" className="login__form-button">
          Login
        </button>
        <a href="/forgot-password" className="login__form-link">
          Forgot Password?
        </a>
      </form>
    </div>
  );
};

export default Login;
