import React from "react";
import Header from "../components/Header";
import ProfileWithCoin from "../components/ProfileWithCoin";
import Button from "../components/Button";
const styles = require("../styles/sendPage.module.scss").default;
const coin = require("../assets/svg/big-coin.svg").default;

export default function SendPage() {
  return (
    <div className={styles["sendPage"]}>
      <div className="sendPage__header">
        <Header content={"Who do you want to Celebrate?"} />
      </div>
      <div className={styles["sendPage__content"]}>
        <div className={styles["sendPage__content-user-info"]}>
          <div className={styles["sendpage__content-profile"]}>
            <ProfileWithCoin />
          </div>
          <div className={styles["sendpage__content-coin"]}>
            <img src={coin} alt="" />
            <div className={styles["sendpage__content-coin-amount"]}>
              +1 Coin
            </div>
          </div>
        </div>

        <div className={styles["sendPage__content-input"]}>
          <div className={styles["sendPage__content-radio"]}>
            <label>Select the value you’re celebrating:</label>
            <select id="cars">
              <option className="options" value="Tenacious">
                Tenacious
              </option>
              <option className="options" value="Resourceful">
                Resourceful
              </option>
              <option className="options" value="Open-Minded">
                Open-Minded
              </option>
              <option className="options" value="Problem Solving">
                Problem Solving
              </option>
              <option className="options" value="Holistic">
                Holistic
              </option>
              <option className="options" value="Inquisitive">
                Inquisitive
              </option>
              <option className="options" value="Celebrating">
                Celebrating
              </option>
            </select>
          </div>
          <div className={styles["sendPage__content-text"]}>
            <label htmlFor="">Share the moment of Celebration:</label>
            <input type="text" name="" id="" />
          </div>
          <div className={styles["sendPage__content-button"]}>
            <Button content={"Celebrate Becoming"} />
          </div>
        </div>
      </div>
    </div>
  );
}
