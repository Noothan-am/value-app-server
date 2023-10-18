import React from "react";
const coinImage = require("../assets/svg/coin.svg").default;
const style = require("../styles/values.module.css").default;

function Values({ valuesInfo, userDetails }: any) {
  return (
    <>
      <div className={style["values"]}>
        <div className={style["values__content"]}>{valuesInfo}</div>
        <div className={style["values__content-right"]}>
          <div className={style["values__content-coin"]}>
            <img src={coinImage} alt="" />
          </div>
          <div className={style["values__content-value"]}>
            {/* {userDetails[valuesInfo.toLocaleLowerCase()]} */}
            04
          </div>
        </div>
      </div>
    </>
  );
}

export default Values;
