import React from "react";
const logo = require("../assets/svg/loading-logo.svg").default;
const bgimg = require("../assets/images/Loading-background.png");
// const coins = require("../assets/images/coins.png");
const styles = require("../styles/loading.module.css").default;

function Loading() {
  return (
    <>
      <div className={styles["loading__background-image"]}>
        <img src={bgimg} alt="" />
      </div>
      <div className={styles["loading"]}>
        <img src={logo} alt="" />
      </div>
    </>
  );
}

export default Loading;
