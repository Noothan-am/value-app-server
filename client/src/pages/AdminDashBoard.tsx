import moment from "moment";
import React, { useEffect, useState } from "react";
const styles = require("../styles/admin-dashboard.module.css").default;

function AdminDashBoard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState<any>("");
  const [allUserDetails, setAllUserDetails] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

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

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("username", username);
    formData.append("name", name);
    formData.append("password", password);
    console.log("formdata", formData);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const responseData = await response.json();
      console.log("done", responseData);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  // const makeSlackMessageBlock = () => {
  //   const blockElements = allUserDetails.map(({ name, total_coins }) => {
  //     return {
  //       type: "section",
  //       text: {
  //         type: "mrkdwn",
  //         text: `*${name} - ${total_coins} coins*`,
  //       },
  //     };
  //   });

  //   const slackMessageBlock = [
  //     {
  //       type: "section",
  //       text: {
  //         type: "mrkdwn",
  //         text: `Week ${week} Summary 🎉`,
  //       },
  //     },
  //   ];

  //   slackMessageBlock.push(...blockElements);
  //   return slackMessageBlock;
  // };

  // const handleSlackMessageTrigger = async () => {
  //   const block = makeSlackMessageBlock();
  //   try {
  //     await fetch(`${process.env.REACT_APP_API_URL}/admin-login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify(block),
  //     })
  //       .then((response) => {
  //         setMessage("sent Message successfully!");
  //       })
  //       .catch((error) => {
  //         setMessage("please send again!");
  //       });
  //   } catch (error) {}
  // };

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Add New User</h2>
        <div className={styles.inputContainer}>
          <label>name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Email:</label>
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
        {/* <div className={styles.inputContainer}>
          <label>Week No:</label>
          <input
            type="number"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          />
        </div> */}
        <input type="file" onChange={handleFileChange} />

        <button className={styles.loginButton} onClick={handleLogin}>
          Add User
        </button>
        {/* <div>
          {imageData && (
            <img src={`data:image/jpeg;base64,${imageData}`} alt="User Image" />
          )}
        </div> */}
        {/* {message && <div className={styles.message}>{message}</div>} */}
      </div>
    </>
  );
}

export default AdminDashBoard;
