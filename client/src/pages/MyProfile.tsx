import React, { useState } from "react";
import Header from "../components/Header";
import Values from "../components/Values";
import Transaction from "../components/Transaction";
import LeaderBoardWithCoin from "../components/LeaderBoardWithCoin";
const style = require("../styles/myprofile.module.scss").default;

function MyProfile() {
  const valueInfo = [
    "Tenacious",
    "Resourceful",
    "Open-Minded",
    "Problem Solving",
    "Holistic",
    "Inquisitive",
    "Celebrating",
  ];
  return (
    <>
      <div className={style["profile"]}>
        <div className={style["profile__header"]}>
          <Header />
        </div>

        <div className="leaderboard">
          <LeaderBoardWithCoin />
        </div>

        <div className={style["profile__secondpart"]}>
          <div className="profile__secondpart-values">
            <div className="profile__secondpart-title">Values</div>
            <div className="profile__secondpart-content">
              {valueInfo.map((eachValues) => {
                return <Values valuesInfo={eachValues} />;
              })}
            </div>
          </div>
          <div className={style["profile__secondpart-transaction"]}>
            <div className="profile__secondpart-title">TRANSACTION HISTORY</div>
            <div className={style["profile__secondpart-content"]}>
              {/* {valueInfo.map((eachValues) => { */}
              <Transaction />
              <Transaction />
              {/* })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
