import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
const styles = require("../styles/admin-dashboard.module.css").default;

function AdminDashBoard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState<any>("");
  const [companyName, setCompanyName] = useState<any>("");
  const [allUserDetails, setAllUserDetails] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [addData, setAddData] = useState<any>("addUser");
  const [selectedOption, setSelectedOption] = useState<string>("");

  var company_id_map = new Map();
  company_id_map.set("Become", "62fafe5c-851b-4a06-a906-d60b1833cc9b");
  company_id_map.set("MentorCloud", "8d1d7a91-c48f-44e9-90fd-e7512006397e");

  const fetchusers = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/all-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ company_id: company_id_map.get(companyName) }),
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        const data = jsonData.map(({ name, user_id }: any) => {
          return { name, user_id };
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

  const handleTabChange = (tab: string) => {
    setAddData(tab);
  };

  const addNewUser = async () => {
    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.append("username", username);
    formData.append("name", name);
    formData.append("password", password);
    formData.append(
      "company",
      JSON.stringify({
        id: company_id_map.get(companyName),
        company_name: companyName,
      })
    );
    let response: any;
    try {
      response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Sorry! Could'nt add new User please try later", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        throw new Error("Failed to submit");
      }

      const responseData = await response.json();
      console.log("done", responseData);
      toast.success("New User Added Successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // window.location.reload();
    } catch (error: any) {
      if (!response.ok) {
        toast.error("Sorry! Could'nt add new User please try later", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        throw new Error("Failed to submit");
      } else {
        toast.success("New User Added Successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
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

  // change according to company

  const deleteUser = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/delete-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ selectedOption }),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="dark"
        />
        <ul className={styles["tab-group"]}>
          <li
            className={`${styles["tab"]} ${
              addData === "addUser" ? styles["active"] : ""
            }`}
          >
            <button
              onClick={() => {
                handleTabChange("addUser");
              }}
            >
              Add User
            </button>
          </li>
          <li
            className={`${styles["tab"]} ${
              addData === "removeUser" ? styles["active"] : ""
            }`}
          >
            <button
              onClick={() => {
                handleTabChange("removeUser");
              }}
            >
              Remove User
            </button>
          </li>
        </ul>

        <div className={styles["tab-content"]}>
          {addData === "addUser" ? (
            <>
              <h2>Add New User</h2>
              <div className={styles["select-input"]}>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                >
                  <option value="Become">Become</option>
                  <option value="MentorCloud">MentorCloud</option>
                </select>
              </div>
              <div className={styles["coolinput"]}>
                <label className={styles["text"]}>name:</label>
                <input
                  className={styles["input"]}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles["coolinput"]}>
                <label className={styles["text"]}>Email:</label>
                <input
                  className={styles["input"]}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles["coolinput"]}>
                <label className={styles["text"]}>Password:</label>
                <input
                  className={styles["input"]}
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles["input_container"]}>
                <input
                  className={styles["input"]}
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <button className={styles.loginButton} onClick={addNewUser}>
                Add User
              </button>
            </>
          ) : (
            <>
              <h2>Delete User</h2>
              <div className={styles["page"]}>
                <div className={styles["select-dropdown"]}>
                  <select
                    id="cars"
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                    }}
                    value={selectedOption}
                  >
                    {allUserDetails.map(({ user_id, name }) => {
                      return (
                        <option key={user_id} value={user_id}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <button className={styles.loginButton} onClick={deleteUser}>
                Delete User
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashBoard;
