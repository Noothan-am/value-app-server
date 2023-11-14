import React from "react";
const style = require("../styles/transaction.module.css").default;

function Transaction({ eachTransaction }: any) {
  return (
    <>
      <div className={style["transaction"]}>
        <div className={style["transaction__image"]}>
          <img
            src={require("../assets/images/" + eachTransaction.image)}
            alt=""
          />
        </div>
        <div className={style["transaction__content"]}>
          <div className={style["transaction__content-date"]}>
            {eachTransaction.date}
          </div>
          <div className={style["transaction__content-header"]}>
            <div className={style["transaction__content-name"]}>
              {eachTransaction.from}
            </div>

            <div className={style["transaction__content-amount"]}>+1 Coin</div>
          </div>
          <div className={style["transaction__content-value"]}>
            {eachTransaction.celebration_moment === "open_minded"
              ? "open-minded"
              : eachTransaction.celebration_moment === "problem_solving"
              ? "problem-solving"
              : eachTransaction.celebration_moment}
          </div>
          <div className={style["transaction__content-description"]}>
            {eachTransaction.celebrating_value}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
