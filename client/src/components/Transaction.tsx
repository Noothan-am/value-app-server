import React from "react";
const style = require("../styles/transaction.module.scss").default;
const profileImage = require("../assets/images/profile-icon.png");
function Transaction() {
  return (
    <>
      <div className={style["transaction"]}>
        <div className={style["transaction__image"]}>
          <img src={profileImage} alt="" />
        </div>
        <div className={style["transaction__content"]}>
          <div className={style["transaction__content-date"]}>14 Aug 2023</div>
          <div className={style["transaction__content-name"]}>
            Harish Venkatesh
          </div>
          <div className={style["transaction__content-description"]}>
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur. Lorem ipsum dolor sit amet consectetur
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
