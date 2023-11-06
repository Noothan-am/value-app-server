import React from "react";
const loadingGif = require("../assets/gifs/loading.gif");
const styles = require("../styles/loading-screen.module.css").default;

function LoadingScreen() {
  return (
    <>
      <div className={styles["loading"]}>
        <div className={styles["loading-image"]}>
          <img src={loadingGif} alt="" />
        </div>
      </div>
    </>
  );
}

export default LoadingScreen;
