// import React, { useState } from "react";
// import "../styles/login.css";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(`Email: ${email}, Password: ${password}`);
//   };

//   return (
//     <div className="login">
//       <h1 className="login__heading">Welocme Back!</h1>
//       <form onSubmit={handleLoginSubmit} className="login__form">
//         <div className="login__email">
//           Email:
//           <input
//             type="email"
//             value={email}
//             className="login__input-field"
//             onChange={(event) => setEmail(event.target.value)}
//           />
//         </div>
//         <div className="login__input">
//           Password:
//           <input
//             type="password"
//             value={password}
//             className="login__input-field"
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <button type="submit" className="login__button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import "../styles/login.scss";

const Login = () => {
  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back!</h1>
      <div className="login-form">
        <input
          type="email"
          className="login-input"
          placeholder="Email address"
        />
        <input type="password" className="login-input" placeholder="Password" />
        <button className="login-button">Login</button>
        <a href="/forgot-password" className="login-link">
          Forgot Password?
        </a>
      </div>
    </div>
  );
};

export default Login;
