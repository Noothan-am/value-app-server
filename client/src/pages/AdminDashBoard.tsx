import React, { useEffect, useState } from "react";
const styles = require("../styles/admin-dashboard.module.css").default;

function AdminDashBoard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [allUserDetails, setAllUserDetails] = useState([]);

  const fetchusers = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/all-user`,
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
        const data = jsonData.map(({ name, total_coins }: any) => {
          return { name, total_coins };
        });
        setAllUserDetails(data);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchusers()
      .then(() => {
        console.log("User details fetched");
      })
      .catch((error: any) => {
        console.log("Error in fetching user details", error);
      });
  }, []);

  const handleLogin = async () => {
    if (
      username === process.env.REACT_APP_USER_NAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      await handleSlackMessageTrigger();
    } else {
      setMessage("Invalid username or password");
    }
  };

  const makeSlackMessageBlock = () => {
    const blockElements = allUserDetails.map(({ name, total_coins }) => {
      return {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${name} - ${total_coins} coins*`,
        },
      };
    });

    const slackMessageBlock = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Week 1 Summary 🎉",
        },
      },
    ];

    slackMessageBlock.push(...blockElements);
    return slackMessageBlock;
  };

  const handleSlackMessageTrigger = async () => {
    const block = makeSlackMessageBlock();
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(block),
      })
        .then((response) => {
          setMessage("Login successful!");
        })
        .catch((error) => {
          setMessage("please send again!");
        });
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <div className={styles.inputContainer}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>
          Send Summary
        </button>
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </>
  );
}

export default AdminDashBoard;
