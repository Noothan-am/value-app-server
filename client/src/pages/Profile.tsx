import React from "react";
import ProfileWithCoin from "../components/ProfileWithCoin";
import Header from "../components/Header";
const styles = require("../styles/profile.module.scss").default;

function Profile() {
  return (
    <>
      <div className={styles["profile"]}>
        <Header content={"Profile"} />
        <div className={styles["profile__users"]}>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["profile__users-singleuser"]}>
            <ProfileWithCoin />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
