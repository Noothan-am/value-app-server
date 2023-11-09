import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeaderBoardWithCoin from "../components/LeaderBoardWithCoin";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../components/Modal";
import LoadingScreen from "./LoadingScreen";

const styles = require("../styles/myfile.module.css").default;
const logoImage = require("../assets/images/Group 26943.png");
const becomeCoins = require("../assets/svg/coin.svg").default;

interface coinsInfo {
  index: number;
  size: number;
}

const Coins = ({ index, size }: coinsInfo) => {
  const styleforcoin = size - index;
  return (
    <>
      <div className={styles.coin} style={{ zIndex: styleforcoin }}>
        <img src={becomeCoins} alt="" />
      </div>
    </>
  );
};

const Home = () => {
  const [userDetails, setUserDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);
  const [open, setOpen] = useState(false);

  let { userId } = useParams();

  const navigator = useNavigate();

  const handleCelebrateClick = () => {
    if (userDetails.current_coins <= 0) {
      toast.warn("you don't have enough coins", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    navigator("/profile");
  };

  const handleProflileClick = (e: any) => {
    e.preventDefault();
    navigator(`/my-page/${userDetails.user_id}`);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const resetDate = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reset-coins`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response) {
        return true;
      } else {
        return false;
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
        const reset_date = jsonData.reset_date;
        let b = moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY");
        let a = moment(reset_date, "DD-MM-YYYY");
        const difference = b.diff(a, "months");
        if (difference >= 1) {
          const data = await resetDate();
          if (data) setUserDetails({ ...jsonData, current_coins: 5 });
        } else {
          setUserDetails(jsonData);
        }
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  }, [resetDate, userId]);

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

  if (isLoading) return <LoadingScreen />;

  const coinsArray = Array.from(
    { length: userDetails.current_coins },
    (_, index) => index + 1
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <ModalComponent handleClose={handleClose} open={open} />
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
              <img
                src={require("../assets/images/" + userDetails.image)}
                alt="profile-icon"
              />
            </div>
          </div>

          <div className={styles["leaderboard"]}>
            <LeaderBoardWithCoin
              userDetails={userDetails}
              showLeaderBoard={true}
            />
          </div>

          <div className={styles.myfile__tophalf__main}>
            <div className={styles.myfile__tophalf__main__user}>
              <div className={styles.myfile__tophalf__main__user__img}>
                <img
                  src={require("../assets/images/" + userDetails.image)}
                  alt="profile-icon"
                />
              </div>
              <button onClick={handleOpen} className={styles["modal-button"]}>
                <h4>25 coins away to encash &gt;</h4>
              </button>
            </div>
            <div className={styles.myfile__light_button}>
              <button type="submit">Encash</button>
            </div>
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
          <div className={styles.overlapping__coins}>
            {coinsArray.map((coin, index) => {
              return (
                <Coins
                  key={index}
                  index={index}
                  size={userDetails.current_coins}
                />
              );
            })}
          </div>
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
    </>
  );
};

export default Home;
