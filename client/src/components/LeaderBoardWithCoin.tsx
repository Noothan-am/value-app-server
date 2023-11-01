import React, { useEffect, useState } from "react";
import Leaderboard from "./LeaderBoard";
import { useNavigate } from "react-router-dom";
const coinImage = require("../assets/svg/big-coin.svg").default;
const style = require("../styles/leaderboard.module.css").default;

function LeaderBoardWithCoin({ userDetails, showLeaderBoard }: any) {
  const [topLeaderboardUsers, setTopLeaderboardUsers] = useState<any>([]);

  const navigation = useNavigate();

  const handleLeaderButtonClick = () => {
    navigation("/leaderboard");
  };

  const fetchAllUserDetails = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/all-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        const data = jsonData
          .map((eachData: any) => {
            return eachData;
          })
          .sort((a: any, b: any) => b.total_coins - a.total_coins);
        setTopLeaderboardUsers([data[0], data[1], data[2]]);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllUserDetails()
      .then(() => {
        console.log("User details fetched");
      })
      .catch((error) => {
        console.log("Error in fetching user details", error);
      });
  }, []);

  return (
    <>
      <div
        className={
          showLeaderBoard
            ? style["profile__firstpart"]
            : style["profile__firstpart-2"]
        }
      >
        <div
          className={
            showLeaderBoard
              ? style["profile__firstpart-coins"]
              : style["profile__firstpart-coins-2"]
          }
        >
          <div className={style["coins__content"]}>
            <img src={coinImage} alt="" />
            <div className={style["total__coins"]}>
              {userDetails.total_coins}
            </div>
          </div>
          <div className={style["coins_text"]}>
            {showLeaderBoard && "My "}Coins
          </div>
        </div>
        {showLeaderBoard && (
          <div className={style["profile__firstpart-leaderboard"]}>
            <div className={style["leaderboard-heading"]}>LEADERBOARD</div>
            <div className={style["leaderboard-members"]}>
              {topLeaderboardUsers &&
                topLeaderboardUsers.map((eachUser: any, index: number) => {
                  return (
                    <Leaderboard
                      user={eachUser}
                      key={index}
                      count={index + 1}
                    />
                  );
                })}
            </div>
            <button
              onClick={handleLeaderButtonClick}
              className={style["leaderboard__light_button"]}
            >
              {"VIEW MORE>>"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default LeaderBoardWithCoin;
