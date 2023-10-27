import React, { useContext } from "react";
import "../styles/error.css";
import { useNavigate } from "react-router-dom";
import { UserId } from "../context/UserIdContext";
function ErrorPage() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserId) as any;
  const handleClickBackToHome = () => {
    navigate(`/my-profile/${userInfo.userId}`);
  };
  return (
    <>
      <div className="App">
        <div className="container">
          <h1>404 Page Not Found !!</h1>
          <p>It seems that page you are looking for no longer exists.!!</p>
          <button onClick={handleClickBackToHome}>Back Homepage</button>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
