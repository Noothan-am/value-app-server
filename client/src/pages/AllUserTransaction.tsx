import React, { useCallback, useContext, useEffect, useState } from "react";
// import Transaction from "../components/Transaction";
import Loading from "./Loading";
import Header from "../components/Header";
import { UserId } from "../context/UserIdContext";
const profileImage = require("../assets/images/profile-icon.png");
const style = require("../styles/all-transactions.module.css").default;

interface eachTransactionValue {
  celebrating_value: string;
  celebration_moment: string;
  date: string;
  image: string;
  userId: string;
}

function Transaction({ eachTransaction }: any) {
  return (
    <>
      <div className={style["transaction"]}>
        <div className={style["transaction__image"]}>
          <img src={profileImage} alt="" />
        </div>
        <div className={style["transaction__content"]}>
          <div className={style["transaction__content-date"]}>
            {eachTransaction.date}
          </div>
          <div className={style["transaction__content-header"]}>
            <div className={style["transaction__content-name"]}>
              {eachTransaction.celebration_moment === "open_minded"
                ? "open-minded"
                : eachTransaction.celebration_moment === "problem_solving"
                ? "problem-solving"
                : eachTransaction.celebration_moment}
            </div>
            <div className={style["transaction__content-amount"]}>+1 Coin</div>
          </div>
          <div className={style["transaction__content-description"]}>
            {eachTransaction.celebrating_value}
          </div>
        </div>
      </div>
    </>
  );
}

function AllUserTransaction() {
  const [allTransaction, setAllTransaction] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const { userInfo } = useContext(UserId) as any;

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/all-transactions`,
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
        setAllTransaction(jsonData.slice(0, 21));
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchAllTransactions()
      .then(() => {
        console.log("All transactions fetched successfully");
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log("error while fetching all transactions", err);
      });
  }, [fetchAllTransactions]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={style["all-transaction"]}>
        <Header
          navigateTo={`/my-profile/${userInfo.userId}`}
          content={"Back to Profile"}
        />
        <div className={style["profile__secondpart-transaction"]}>
          <div className={style["profile__secondpart-title"]}>
            TRANSACTION HISTORY
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
    </>
  );
}

export default AllUserTransaction;
