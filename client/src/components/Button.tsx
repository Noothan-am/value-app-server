import React from "react";
const styles = require("../styles/button.module.scss").default;

function Button({ content, handleClick }: any) {
  return (
    <div>
      <button type="submit" onClick={handleClick} className={styles["button"]}>
        {content}
      </button>
    </div>
  );
}

export default Button;
