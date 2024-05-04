import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import LoadingScreen from "./LoadingScreen";
import { TbArrowsLeftRight } from "react-icons/tb";
import FooterNavbar from "../components/FooterNavbar";
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
          <img
            src={
              eachTransaction.image.data
                ? `data:image/jpeg;base64,${eachTransaction.image.data}`
                : require("../assets/images/" + eachTransaction.image)
            }
            alt=""
          />
        </div>
        <div className={style["transaction__content"]}>
          <div className={style["transaction__content-date"]}>
            {eachTransaction.date}
          </div>
          <div className={style["transaction__details"]}>
            <div className={style["transaction__content-header"]}>
              <div className={style["transaction__content-name"]}>
                {eachTransaction.from}
              </div>
              <div className={style["transaction__amount-count-red"]}>
                -1 Coin
              </div>
            </div>
            <div className={style["transaction__content-header"]}>
              <div className={style["transaction__content-arrow"]}>
                <TbArrowsLeftRight />
              </div>
              <div className={style["transaction__content-value"]}>
                {eachTransaction.celebration_moment === "open_minded"
                  ? "open-minded"
                  : eachTransaction.celebration_moment === "problem_solving"
                  ? "problem-solving"
                  : eachTransaction.celebration_moment}
              </div>
            </div>
            <div className={style["transaction__content-header"]}>
              <div className={style["transaction__content-name"]}>
                {eachTransaction.to}
              </div>
              <div className={style["transaction__amount-count-green"]}>
                +1 Coin
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AllUserTransaction() {
  const [allTransaction, setAllTransaction] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const userData: any = localStorage.getItem("userInfo");
  const data = JSON.parse(userData);
  let userId = data?.userId;

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/all-transactions`,
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

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <div className={style["all-transaction"]}>
        <Header navigateTo={`/my-profile/${userId}`} content={"Back to Home"} />
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
          <div className={style["navbar"]}>
            <FooterNavbar userid={userId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUserTransaction;
