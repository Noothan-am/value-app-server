import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import { UserId } from "../context/UserIdContext";

const styles = require("../styles/header.module.css").default;

function Header({ content, navigateTo }: any) {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate(navigateTo);
  };

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header__container"]}>
          <div className={styles["header__container-logo"]}>
            <img src={require("../assets/images/Group 26943.png")} alt="" />
          </div>
          <div
            className={styles["header__container-goback"]}
            onClick={handleHeaderClick}
          >
            <div>
              <IoIosArrowBack
                onClick={handleHeaderClick}
                className={styles["header__container-goback-sidearrow"]}
              />
            </div>
            <div>
              <div
                onClick={handleHeaderClick}
                className={styles["header__container-goback-text"]}
              >
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
