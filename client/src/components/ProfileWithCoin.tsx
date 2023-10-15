import React from "react";
const coin = require("../assets/svg/coin.svg").default;
const profile = require("../assets/svg/profile.svg").default;
const styles = require("../styles/profile-coin.module.scss").default;
function ProfileWithCoin() {
  return (
    <>
      <div className={styles["profile"]}>
        <div className={styles["profile__picture"]}>
          <img src={profile} alt="" />
        </div>

        <div className={styles["profile__content"]}>
          <div className={styles["profile__content-name"]}>Ananya</div>

          <div className={styles["profile__content-coins"]}>
            <div className={styles["profile__content-coins-image"]}>
              <img src={coin} alt="" />
            </div>
            <div className={styles["profile__content-coins-count"]}>23</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileWithCoin;