import React, { useContext, useEffect, useState } from "react";
import ProfileWithCoin from "../components/ProfileWithCoin";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { UserId } from "../context/UserIdContext";
import Loading from "./Loading";
const styles = require("../styles/profile.module.css").default;

function Profile() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState<any>(true);

  const navigation = useNavigate();
  const { userInfo } = useContext(UserId) as any;

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
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        console.log("id", userInfo.userId);
        const result = await jsonData.filter((eachUser: any) => {
          return eachUser.user_id !== userInfo.userId;
        });
        console.log(JSON.stringify(result));
        setAllUsers(result);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  };

  const handleUserClick = (user_id: string) => {
    navigation(`/send/${user_id}`);
  };

  useEffect(() => {
    fetchAllUsers()
      .then(() => {
        console.log("Fetched all users successfully");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={styles["profile"]}>
        <Header content={"Who do you want to Celebrate?"} />
        <div className={styles["profile__users"]}>
          {allUsers.map((eachUser: any) => {
            return (
              <div
                key={eachUser.user_id}
                onClick={() => handleUserClick(eachUser.user_id)}
                className={styles["profile__users-singleuser"]}
              >
                <ProfileWithCoin userDetails={eachUser} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Profile;
