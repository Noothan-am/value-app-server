import React from "react";
const coinImage = require("../assets/svg/coin.svg").default;
const style = require("../styles/values.module.css").default;

function Values({ valuesInfo, userDetails }: any) {
  if (valuesInfo === "Open-Minded") valuesInfo = "Open_Minded";
  if (valuesInfo === "Problem-Solving") valuesInfo = "Problem_Solving";

  return (
    <>
      <div className={style["values"]}>
        <div className={style["values__content"]}>
          {valuesInfo === "Open_Minded"
            ? "Open-Minded"
            : valuesInfo === "Problem_Solving"
            ? "Problem-Solving"
            : valuesInfo}
        </div>
        <div className={style["values__content-right"]}>
          <div className={style["values__content-coin"]}>
            <img src={coinImage} alt="" />
          </div>
          <div className={style["values__content-value"]}>
            {/* {userDetails[valuesInfo.toLocaleLowerCase()] < 10
              ? "0" + userDetails[valuesInfo.toLocaleLowerCase()]
              : userDetails[valuesInfo.toLocaleLowerCase()]} */}
            {userDetails[valuesInfo.toLocaleLowerCase()]}
          </div>
        </div>
      </div>
    </>
  );
}

export default Values;
