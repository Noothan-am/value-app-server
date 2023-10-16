import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Values from "../components/Values";
import Transaction from "../components/Transaction";
import LeaderBoardWithCoin from "../components/LeaderBoardWithCoin";
const style = require("../styles/myprofile.module.scss").default;
// interface user {
//   coins: number;
//   name;
//   coins;
//   tenacious;
//   resourceful;
//   open_minded;
//   problem_solving;
//   holistic;
//   inquisitive;
//   celebrating;
// }
function MyProfile() {
  const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  const valueInfo = [
    "Tenacious",
    "Resourceful",
    "Open-Minded",
    "Problem Solving",
    "Holistic",
    "Inquisitive",
    "Celebrating",
  ];

  const fetchUserDetails = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "679a3ddc98a44c2f96a972ce98916b87",
          }),
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        setUserDetails(jsonData);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserDetails()
      .then(() => {
        console.log("User details fetched");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error in fetching user details", error);
      });
  }, []);

  if (!loading) {
    return (
      <>
        <div className={style["profile"]}>
          <div className={style["profile__header"]}>
            <Header />
          </div>

          <div className="leaderboard">
            <LeaderBoardWithCoin totalCoins={userDetails.coins} />
          </div>

          <div className={style["profile__secondpart"]}>
            <div className="profile__secondpart-values">
              <div className="profile__secondpart-title">Values</div>
              <div className="profile__secondpart-content">
                {valueInfo.map((eachValue: string) => (
                  <Values valuesInfo={eachValue} userDetails={userDetails} />
                ))}
              </div>
            </div>
            <div className={style["profile__secondpart-transaction"]}>
              <div className="profile__secondpart-title">
                TRANSACTION HISTORY
              </div>
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
  } else {
    return <>loading</>;
  }
}

export default MyProfile;
