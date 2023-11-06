import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const logo = require("../assets/svg/loading-logo.svg").default;
const bgimg = require("../assets/images/Loading-background.png");
const styles = require("../styles/loading.module.css").default;

function Loading() {
  const navigation = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation("/login");
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

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
