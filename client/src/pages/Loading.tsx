import React from "react";
import "../styles/loading.module.scss";
const logo = require("../assets/images/Become-logo.png");
const bgimg = require("../assets/images/Loading-background.png");
const coins = require("../assets/images/coins.png");
const styles = require("../styles/loading.module.scss").default;

function Loading() {
  return (
    <>
      <div className={styles["loading__background-image"]}>
        <img src={bgimg} alt="" />
      </div>
      <div className={styles["loading"]}>
        <div className={styles["loading__logo"]}>
          <img src={logo} alt="" className={styles["loading__logo-image"]} />
        </div>
        <div className={styles["loading__coins"]}>
          <img src={coins} alt="" className={styles["loading__coins-image"]} />
        </div>
      </div>
    </>
  );
}

export default Loading;
