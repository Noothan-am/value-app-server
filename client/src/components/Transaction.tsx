import React from "react";
const style = require("../styles/transaction.module.scss").default;
const profileImage = require("../assets/images/profile-icon.png");

function Transaction({ eachTransaction }: any) {
  return (
    <>
      <div className={style["transaction"]}>
        <div className={style["transaction__image"]}>
          <img src={profileImage} alt="" />
        </div>
        <div className={style["transaction__content"]}>
          <div className={style["transaction__content-date"]}>
            {eachTransaction.date}
          </div>
          <div className={style["transaction__content-name"]}>
            {eachTransaction.celebrating_value}
          </div>
          <div className={style["transaction__content-description"]}>
            {eachTransaction.celebration_moment}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
