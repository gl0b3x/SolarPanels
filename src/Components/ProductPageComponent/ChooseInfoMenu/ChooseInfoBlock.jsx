import React from "react";
import classes from "../ProductPageComponent.module.css";

const ChooseInfoMenu = ({ currentInfo, setCurrentInfo, loading, review }) => {
  return (
    <section className={classes.chooseInfo}>
      <ul className={classes.chooseInfoUl}>
        <li
          onClick={() => setCurrentInfo("Product")}
          className={`${classes.chooseInfoItem} ${currentInfo === "Product" ? classes.activeInfoBlock : ""} `}
        >
          Товар
        </li>
        <li
          onClick={() => setCurrentInfo("Characteristics")}
          className={`${classes.chooseInfoItem} ${currentInfo === "Characteristics" ? classes.activeInfoBlock : ""} `}
        >
          Характеристики
        </li>
        <li
          onClick={() => setCurrentInfo("Reviews")}
          className={`${classes.chooseInfoItem} ${currentInfo === "Reviews" ? classes.activeInfoBlock : ""} `}
        >
          {loading
            ? "Відгуки"
            : review
              ? "Відгуки " + review.length
              : "Відгуки "}
        </li>
      </ul>
    </section>
  );
};

export default ChooseInfoMenu;
