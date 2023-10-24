import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import LeaderBoardWithCoin from "../components/LeaderBoardWithCoin";
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router-dom";
const styles = require("../styles/myfile.module.css").default;
const logoImage = require("../assets/images/Group 26943.png");
const profileImage = require("../assets/images/profile-icon.png");
const coinsGroup = require("../assets/images/coins-group.png");

const Myfile = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);
  const { userId } = useParams();
  const navigator = useNavigate();

  const handleCelebrateClick = () => {
    navigator("/profile");
  };

  const handleProflileClick = (e: any) => {
    e.preventDefault();
    navigator(`/my-page/${userId}`);
  };

  const resetDate = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reset-coins`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        console.log("Successfully reset the date");
      }
    } catch (err) {
      console.log("Error while resetting the date");
      console.error(err);
    }
  }, []);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();

        const reset_date = jsonData.reset_date;
        let b = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY");
        let a = moment(reset_date, "DD-MM-YYYY");
        const difference = b.diff(a, "months");
        if (difference >= 1) {
          await resetDate();
        }
        setUserDetails(jsonData);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserDetails()
      .then(() => {
        console.log("User details fetched");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error while fetching the", err);
      });
  }, [fetchUserDetails]);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.myfile}>
      <div className={styles.myfile__tophalf}>
        <div className={styles.myfile__tophalf__nav}>
          <img
            className={styles.myfile__tophalf__nav__left_image}
            src={logoImage}
            alt="Become logo"
          />
          <div
            className={styles.myfile__tophalf__nav__right_image}
            onClick={(e) => handleProflileClick(e)}
          >
            <img src={profileImage} alt="profile-icon" />
          </div>
        </div>

        <div className={styles["leaderboard"]}>
          <LeaderBoardWithCoin userDetails={userDetails} />
        </div>

        <div className={styles.myfile__tophalf__main}>
          <img
            src={require("../assets/images/profile-icon.png")}
            alt="profile-icon"
          />
          <h4>32 coins away to encash &gt;</h4>
          <button type="submit" className={styles.myfile__light_button}>
            Encash
          </button>
          <h5>Next Encashment Cycle: Q4 2023</h5>
        </div>
      </div>
      <div className={styles.myfile__downhalf}>
        <div className={styles.myfile__downhalf__heading}>
          <div className={styles.myfile__downhalf__heading__date}>
            <h3>{moment().format("DD MMM")}</h3>
          </div>
          <div className={styles.myfile__downhalf__heading__rigthpart}>
            <h2>Available coins</h2>
            <span>{userDetails.current_coins}</span>
          </div>
        </div>
        <img src={coinsGroup} alt="Become logo" />
        <button
          type="submit"
          onClick={handleCelebrateClick}
          className={styles.myfile__dark_button}
        >
          Celebrate Becoming
        </button>
        <h4>You can gift 1 coin at a time</h4>
      </div>
    </div>
  );
};

export default Myfile;
