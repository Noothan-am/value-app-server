import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import Values from "../components/Values";
import Transaction from "../components/Transaction";
import LeaderBoardWithCoin from "../components/LeaderBoardWithCoin";
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router-dom";
import Greeting from "../components/Greeting";
import LoadingScreen from "./LoadingScreen";

const style = require("../styles/myprofile.module.css").default;

interface eachTransactionValue {
  celebrating_value: string;
  celebration_moment: string;
  date: string;
  image: string;
}

function MyProfile() {
  const [userDetails, setUserDetails] = useState<any>();
  const [allTransaction, setAllTransaction] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const { userId } = useParams();

  const navigation = useNavigate();

  const handleTransactionButtonClick = () => {
    navigation("/transactions");
  };

  const fetchUserDetails = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userId: userId,
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
  }, [userId]);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/get-transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        setAllTransaction(jsonData);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchAllTransactions()
      .then(() => {
        console.log("All transactions fetched successfully");
        fetchUserDetails()
          .then(() => {
            "succesfully fetched user details";
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("error while fetching the", err);
          });
      })
      .catch((err) => {
        console.log("error while fetching all transactions", err);
      });
  }, [fetchAllTransactions, fetchUserDetails]);

  const valueInfo = [
    "Tenacious",
    "Resourceful",
    "Open-Minded",
    "Problem-Solving",
    "Holistic",
    "Inquisitive",
    "Celebrating",
  ];

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <div className={style["profile"]}>
        <div className={style["profile__header"]}>
          <Header navigateTo={"/leaderboard"} content={"Leaderboard"} />
        </div>

        <div className={style["profile__greeting"]}>
          <Greeting
            show={false}
            image={userDetails.image}
            name={userDetails.name}
          />
        </div>

        <div className={style["leaderboard"]}>
          <LeaderBoardWithCoin
            userDetails={userDetails}
            showLeaderBoard={false}
          />
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
              <button
                onClick={handleTransactionButtonClick}
                className={style["leaderboard__light_button"]}
              >
                {"VIEW ALL >"}
              </button>
            </div>
            <div className={style["profile__secondpart-content"]}>
              {allTransaction &&
                allTransaction.map(
                  (eachTransaction: eachTransactionValue, index: number) => {
                    return (
                      <Transaction
                        key={index}
                        eachTransaction={eachTransaction}
                      />
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
