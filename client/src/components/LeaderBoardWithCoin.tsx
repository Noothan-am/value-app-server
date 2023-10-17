import React from "react";
const coinImage = require("../assets/svg/big-coin.svg").default;
const style = require("../styles/leaderboard.module.scss").default;

function LeaderBoardWithCoin() {
  return (
    <>
      <div className={style["profile__firstpart"]}>
        <div className={style["profile__firstpart-coins"]}>
          <div className={style["coins__content"]}>
            <img src={coinImage} alt="" />
            <div className={style["total__coins"]}>45</div>
          </div>
          <div className={style["coins_tex"]}>My Coins</div>
        </div>
        <div className={style["profile__firstpart-leaderboard"]}>
          <div className={style["leaderboard-heading"]}>Leaderboard</div>
          <div className={style["leaderboard-members"]}>
            <div className={style["leaderboard-single-person"]}>
              <div className={style["leaderboard-number"]}>1</div>
              <div className={style["leaderboard-name"]}>Aninya</div>
            </div>
            <div className={style["leaderboard-single-person"]}>
              <div className={style["leaderboard-number"]}>2</div>
              <div className={style["leaderboard-name"]}>Harish</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderBoardWithCoin;
