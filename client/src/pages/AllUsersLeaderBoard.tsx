import React, { useEffect, useState } from "react";
const style = require("../styles/all-leaderboard.module.css").default;
const coinImage = require("../assets/svg/coin.svg").default;

function AllUsersLeaderBoard() {
  const [topLeaderboardUsers, setTopLeaderboardUsers] = useState<any>([]);

  const fetchAllUserDetails = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/all-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
        setTopLeaderboardUsers(data);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  };

  const Leaderboard = ({ eachLeaderBoardUser, count }: any) => {
    return (
      <>
        <div className={style["leaderboard"]}>
          <div className={style["values"]}>
            <div className={style["leaderboard-number"]}>{count}</div>
            <div className={style["values__content"]}>
              {eachLeaderBoardUser.name}
            </div>
            <div className={style["values__content-right"]}>
              <div className={style["values__content-coin"]}>
                <img src={coinImage} alt="" />
              </div>
              <div className={style["values__content-value"]}>
                {eachLeaderBoardUser.total_coins}
              </div>
            </div>
          </div>
        </div>
      </>
    );
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
      <div className={style["allUsers__leaderboard"]}>
        <div className={style["leaderboard__heading"]}>LEADERBOARD</div>
        <div className={style["leaderboard__Users"]}>
          {topLeaderboardUsers &&
            topLeaderboardUsers.map((eachLeaderBoardUser: any, index: any) => {
              return (
                <Leaderboard
                  key={index}
                  count={index + 1}
                  eachLeaderBoardUser={eachLeaderBoardUser}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default AllUsersLeaderBoard;
