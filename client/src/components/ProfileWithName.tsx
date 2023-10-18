import React from "react";
const style = require("../styles/profile-with-name.module.css").default;
const profileImage = require("../assets/images/profile-icon.png");
function ProfileWithName() {
  return (
    <>
      <div className={style["profile__name"]}>
        <div className={style["profile-image"]}>
          <img src={profileImage} alt="" />
        </div>
        <div className={style["profile-greeting"]}>Hello,</div>
        <div className={style["profile-name"]}>Preksha</div>
      </div>
    </>
  );
}

export default ProfileWithName;
