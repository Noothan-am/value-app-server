import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const styles = require("../styles/header.module.scss").default;

function Header({ content }: any) {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["header__container"]}>
          <div className={styles["header__container-logo"]}>
            <img src={require("../assets/images/Group 26943.png")} alt="" />
          </div>
          <div className={styles["header__container-goback"]}>
            <div>
              <IoIosArrowBack
                onClick={() => navigate("/home")}
                className={styles["header__container-goback-sidearrow"]}
              />
            </div>
            <div>
              <a
                href="/home"
                className={styles["header__container-goback-text"]}
              >
                {content}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
