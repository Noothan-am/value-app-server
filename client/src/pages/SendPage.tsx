import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import ProfileWithCoin from "../components/ProfileWithCoin";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { UserId } from "../context/UserIdContext";

const styles = require("../styles/sendPage.module.css").default;
const coin = require("../assets/svg/big-coin.svg").default;

interface User {
  user_id: string;
  name: string;
  coins: number;
}

export default function SendPage() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [celebrationMoment, setCelebrationMoment] = useState<string>("");
  const [user, setUser] = useState({} as any);

  const { id } = useParams();
  const { userInfo, userDetials } = useContext(UserId) as any;

  const sendCoins = async () => {
    if (userInfo.current_coins < 0) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/make-transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: userInfo.userName,
            from_user_id: userInfo.userId,
            to: user.name,
            to_user_id: id,
            celebration_moment: selectedOption.toLocaleLowerCase(),
            celebrating_value: celebrationMoment,
            image: "ram",
          }),
        }
      );
      if (response) {
        console.log("send coins succesfully");
        alert("Coins sent successfully");
      }
    } catch (err) {
      console.log("Error while sending coins");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/all-user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response) {
          const jsonData = await response.json();
          const user = jsonData.find(
            (eachUser: User) => eachUser.user_id === id
          );
          if (user) {
            setUser(user);
          } else {
            console.log("User not found");
          }
        }
      } catch (err) {
        console.log("Error while fetching users");
        console.error(err);
      }
    };

    fetchAllUsers()
      .then(() => {
        console.log("Fetched all users successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles["sendPage"]}>
      <div className={styles["sendPage__header"]}>
        <Header content={"Who do you want to Celebrate?"} />
      </div>
      <div className={styles["sendPage__content"]}>
        <div className={styles["sendPage__content-user-info"]}>
          <div className={styles["sendpage__content-profile"]}>
            <ProfileWithCoin userDetails={user} />
          </div>
          <div className={styles["sendpage__content-coin"]}>
            <img src={coin} alt="" />
            <div className={styles["sendpage__content-coin-amount"]}>
              +1 Coin
            </div>
          </div>
        </div>

        <div className={styles["sendPage__content-input"]}>
          <div className={styles["sendPage__content-radio"]}>
            <label>Select the value you’re celebrating:</label>
            <select
              id="cars"
              onChange={(e) => {
                setSelectedOption(e.target.value);
                console.log(e.target.value);
              }}
              value={selectedOption}
            >
              <option className="options" value="Tenacious">
                Tenacious
              </option>
              <option className="options" value="Resourceful">
                Resourceful
              </option>
              <option className="options" value="Open_Minded">
                Open Minded
              </option>
              <option className="options" value="Problem_Solving">
                Problem Solving
              </option>
              <option className="options" value="Holistic">
                Holistic
              </option>
              <option className="options" value="Inquisitive">
                Inquisitive
              </option>
              <option className="options" value="Celebrating">
                Celebrating
              </option>
            </select>
          </div>
          <div className={styles["sendPage__content-text"]}>
            <label htmlFor="">Share the moment of Celebration:</label>
            <textarea
              name="Text1"
              cols={60}
              onChange={(e) => setCelebrationMoment(e.target.value)}
              value={celebrationMoment}
              placeholder="Type the reason..."
              rows={8}
            ></textarea>
          </div>
          <div className={styles["sendPage__content-button"]}>
            <Button handleClick={sendCoins} content={"Celebrate Becoming"} />
          </div>
        </div>
      </div>
    </div>
  );
}
