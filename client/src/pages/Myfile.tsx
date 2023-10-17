import React from "react";
const coin = require("../assets/svg/coin.svg").default;
const styles = require("../styles/myfile.module.scss").default;

const Myfile = () => {
  return (
    <div className={styles.myfile}>
      <div className={styles.myfile__tophalf}>
        <div className={styles.myfile__tophalf__nav}>
          <img
            className={styles.myfile__tophalf__nav__left_image}
            src={require("../assets/images/Group 26943.png")}
            alt="Become logo"
          />
          <img
            className={styles.myfile__tophalf__nav__right_image}
            src={require("../assets/images/profile-icon.png")}
            alt="profile-icon"
          />
        </div>
        <div className={styles.myfile__tophalf__content}>
          <div className={styles.myfile__tophalf__content__left}>
            <img src={coin} alt="randomimage" />
            <span>4</span>
            <h2>My Coins</h2>
          </div>
          <div className={styles.myfile__tophalf__content__right}>
            <h3>LEADERBOARD</h3>
            <ul>
              <li>1. Sid</li>
              <li>2. Sid</li>
              <li>3. Sid</li>
              <li>4. Sid</li>
            </ul>
          </div>
        </div>
        <div className={styles.myfile__tophalf__main}>
          <img
            src={require("../assets/images/profile-icon.png")}
            alt="profile-icon"
          />
          <h4>32 coins away to encash &gt;</h4>
          <button type="submit" className={styles.myfile__light_button}>
            Encash
          </button>
          <h5>Next Encashment Cycle: Q4 2023</h5>
        </div>
      </div>
      <div className={styles.myfile__downhalf}>
        <div className={styles.myfile__downhalf__heading}>
          <h3>SEP 23</h3>
          <h2>Available coins</h2>
          <span>4</span>
        </div>
        <img
          src={require("../assets/images/coins-group.png")}
          alt="Become logo"
        />
        <button type="submit" className={styles.myfile__dark_button}>
          Celebrate Becoming
        </button>
        <h4>You can gift 1 coin at a time</h4>
      </div>
    </div>
  );
};

export default Myfile;
