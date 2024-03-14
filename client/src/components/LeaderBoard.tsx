import { useNavigate } from "react-router-dom";
const style = require("../styles/leaderboard.module.css").default;
const coinImage = require("../assets/images/coin.png");

export default function Leaderboard({ user, count }: any) {
  const navigator = useNavigate();

  const handleOnclickLeaderboard = () => {
    navigator(`/user/${user.user_id}`);
  };

  return (
    <>
      <button
        onClick={handleOnclickLeaderboard}
        className={style["leaderboard-single-person"]}
      >
        <div className={style["leaderboard-number"]}>
          {count}.<span> </span>
        </div>
        <div className={style["leaderboard-name"]}>{user.name}</div>
        <div className={style["leaderboard-coin"]}>
          <img src={coinImage} alt="" />
        </div>
        <div className={style["leaderboard-number"]}>{user.total_coins}</div>
      </button>
    </>
  );
}
