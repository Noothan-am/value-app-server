import React from "react";
const styles = require("../styles/button.module.scss").default;

function Button({ content }: any) {
  return (
    <div>
      <button type="submit" className={styles["button"]}>
        {content}
      </button>
    </div>
  );
}

export default Button;
