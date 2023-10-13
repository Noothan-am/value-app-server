const styles = require("../styles/myfile.module.scss").default;

const Myfile = () => {
  return (
    <div className="myfile">
      <div className="myfile__tophalf">
        <div className="myfile__tophalf__nav ">
          <img
            src={require("../assets/images/Group 26943.png")}
            alt="Become logo"
          />
          <img
            src={require("../assets/images/profile-icon.png")}
            alt="profile-icon"
          />
        </div>
        <div className="myfile__tophalf__content">
          <div className="myfile__tophalf__content__left">
            <img src={require("../assets/svg/coin.svg").default} />
            <span>4</span>
            <h2>My Coins</h2>
          </div>
          <div className="myfile__tophalf__content__right">
            <h3>LEADERBOARD</h3>
            <li>Sid</li>
            <li>Sid</li>
            <li>Sid</li>
            <li>Sid</li>
          </div>
        </div>
        <div className="myfile__tophalf__main">
          <img
            src={require("../assets/images/profile-icon.png")}
            alt="profile-icon"
          />
          <h4>32 coints away to encash &gt;</h4>

          <button type="submit" className={styles["login__form-button"]}>
            Encash
          </button>

          <h5>Next Encashment Cycle: Q4 2023</h5>
        </div>
      </div>

      <div className="myfile__downhalf"></div>
    </div>
  );
};

export default Myfile;
