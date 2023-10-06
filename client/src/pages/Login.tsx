import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login">
      <h1 className="login__heading">Login</h1>
      <form onSubmit={handleLoginSubmit} className="login__form">
        <div className="login__email">
          Email:
          <input
            type="email"
            value={email}
            className="login__input-field"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login__input">
          Password:
          <input
            type="password"
            value={password}
            className="login__input-field"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="login__button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
