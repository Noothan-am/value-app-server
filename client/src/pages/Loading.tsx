import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const logo = require("../assets/svg/loading-logo.svg").default;
const bgimg = require("../assets/images/Loading-background.png");
const styles = require("../styles/loading.module.css").default;

function Loading() {
  const navigation = useNavigate();

  const checkIsExpired = async () => {
    try {
      const lastLoginDate = localStorage.getItem("lastLoginDate");
      let todaysDate = moment(moment().format("MM"), "MM");
      let date_to_check = moment(lastLoginDate, "MM");
      const difference = todaysDate.diff(date_to_check, "months");
      if (difference <= 0) return false;
      localStorage.clear();
      return true;
    } catch (e) {
      localStorage.clear();
      console.log("error while checking session expiration", e);
      return true;
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      const isExpired = await checkIsExpired();
      if (isExpired) {
        navigation("/login");
      } else {
        const userData: any = localStorage.getItem("userInfo");
        const data = await JSON.parse(userData);
        let userId = data?.userId;
        navigation(`/my-profile/${userId}`);
      }
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
