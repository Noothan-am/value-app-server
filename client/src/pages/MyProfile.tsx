import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Values from "../components/Values";
import Transaction from "../components/Transaction";
import LeaderBoardWithCoin from "../components/LeaderBoardWithCoin";
import ProfileWithName from "../components/ProfileWithName";
const style = require("../styles/myprofile.module.css").default;
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
  const [allTransaction, setAllTransaction] = useState<any>();
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

  const fetchAllTransactions = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/get-transactions`,
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
        console.log(jsonData);

        setAllTransaction(jsonData);
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
    // fetchAllTransactions()
    //   .then(() => {
    //     console.log("transaction details fetched");
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log("Error in fetching transaction details details", error);
    //   });
  }, []);

  if (!loading) {
    return (
      <>
        <div className={style["profile"]}>
          <div className={style["profile__header"]}>
            <Header content={"Profile"} />
          </div>
          <div className={style["profile__name"]}>
            <ProfileWithName />
          </div>
          <div className={style["leaderboard"]}>
            <LeaderBoardWithCoin userDetails={userDetails} />
          </div>
          <div className={style["profile__secondpart"]}>
            <div className={style["profile__secondpart-values"]}>
              <div className={style["profile__secondpart-title"]}>VALUES</div>
              <div className={style["profile__secondpart-content"]}>
                {valueInfo.map((eachValue: string) => (
                  <Values valuesInfo={eachValue} userDetails={userDetails} />
                ))}
              </div>
            </div>
            <div className={style["profile__secondpart-transaction"]}>
              <div className={style["profile__secondpart-title"]}>
                TRANSACTION HISTORY
              </div>
              <div className={style["profile__secondpart-transaction-details"]}>
                <Transaction />
                <Transaction />
                <Transaction />
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
