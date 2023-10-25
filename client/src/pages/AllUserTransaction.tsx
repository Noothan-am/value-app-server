import React, { useCallback, useEffect, useState } from "react";
import Transaction from "../components/Transaction";
import Loading from "./Loading";
const style = require("../styles/all-transactions.module.css").default;

interface eachTransactionValue {
  celebrating_value: string;
  celebration_moment: string;
  date: string;
  image: string;
  userId: string;
}

function AllUserTransaction() {
  const [allTransaction, setAllTransaction] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response: any = await fetch(`${process.env.REACT_APP_API_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        setAllTransaction(jsonData);
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
      <div className={style["transaction"]}>
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
