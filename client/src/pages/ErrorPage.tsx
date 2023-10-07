import React from "react";
import "../styles/error.scss";
function ErrorPage() {
  return (
    <>
      <div className="App">
        <div className="container">
          <h1>404 Page Not Found</h1>
          <p>It seems that page you are looking for no longer exists.</p>
          <button>Back Homepage</button>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
