import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiSolidMedal } from "react-icons/bi";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { FaMedal } from "react-icons/fa6";
import { RiMedalFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const styles = require("../styles/footer-navbar.module.css").default;

function FooterNavbar({ userid }: any) {
  useEffect(() => {
    console.warn(userid);
  });
  return (
    <>
      <div className={styles["footer-navbar"]}>
        <div className={styles["home-button"]}>
          <Link to={`/my-profile/${userid}`}>
            <AiFillHome className={styles["footer-navbar-buttons"]} />
          </Link>
        </div>
        <div className={styles["transaction-button"]}>
          <Link to="/leaderboard">
            <RiMedalFill className={styles["footer-navbar-buttons"]} />
          </Link>
        </div>
        <div className={styles["profile-button"]}>
          <Link to="/transactions">
            <TbArrowsLeftRight className={styles["footer-navbar-buttons"]} />
          </Link>
        </div>
        <div className={styles["leaderboard-button"]}>
          <Link to={`/my-page/${userid}`}>
            <FaUser className={styles["footer-navbar-buttons"]} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default FooterNavbar;
