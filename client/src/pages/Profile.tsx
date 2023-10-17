import React, { useEffect, useState } from "react";
import ProfileWithCoin from "../components/ProfileWithCoin";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const styles = require("../styles/profile.module.scss").default;

function Profile() {
  const [allUsers, setAllUsers] = useState([]);

  const navigation = useNavigate();

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
        setAllUsers(jsonData);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles["profile"]}>
        <Header content={"Profile"} />
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
