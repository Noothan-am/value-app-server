import React from "react";
const style = require("../styles/greeting.module.css").default;
// const profileImage = require("../assets/images/profile-icon.png");

export default function Greeting({ show, name, image }: any) {
  return (
    <>
      <div className={style["profile__greeting-details"]}>
        <div className={style["profile__greeting-image"]}>
          <img src={require("../assets/images/" + image)} alt="" />
        </div>
        {show && <div className={style["profile__greeting-greet"]}>Hello,</div>}
      </div>
      <div
        className={
          show
            ? style["profile__greeting-name"]
            : style["profile__greeting-name-2"]
        }
      >
        {name}
      </div>
    </>
  );
}
