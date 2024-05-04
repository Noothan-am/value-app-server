import React from "react";
const style = require("../styles/greeting.module.css").default;
// const profileImage = require("../assets/images/profile-icon.png");

export default function Greeting({ userDetails }: any) {
  const { image, name, show } = userDetails;
  return (
    <>
      <div className={style["profile__greeting-details"]}>
        <div className={style["profile__greeting-image"]}>
          <img
            src={
              userDetails.image.data
                ? `data:image/jpeg;base64,${userDetails.image.data}`
                : require("../assets/images/" + image)
            }
            alt=""
          />
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
