import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import ProfileWithCoin from "../components/ProfileWithCoin";
const styles = require("../styles/profile.module.scss").default;

function Profile() {
  return (
    <>
      <div className={styles["profile"]}>
        <div className={styles["profile__header"]}>
          <div className={styles["profile__header-logo"]}>
            <img src={require("../assets/images/Group 26943.png")} alt="" />
          </div>
          <div className={styles["profile__header-goback"]}>
            <div>
              <IoIosArrowBack
                className={styles["profile__header-goback-sidearrow"]}
              />
            </div>
            <div>
              <a href="/home" className={styles["profile__header-goback-text"]}>
                Profile
              </a>
            </div>
          </div>
        </div>
        <div className={styles["profile__users"]}>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
