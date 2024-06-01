import React from "react";
import classes from "./ErrorComponent.module.css";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <main className={classes.wrapErrorBlock}>
      <div className={classes.leftErrorBlock}>
        <h1>404</h1>
        <span>
          ОХ! Здається у нас проблема! <br />
          Схоже, що Ви заблукали у космосі...
          <br />
        </span>
        <Link to={"/"} className={classes.returnButton}>
          <span>Повернутись назад</span>
        </Link>
      </div>
      <div className={classes.rightErrorBlock}>
        <img src="/error404.webp" alt="error" loading="lazy" />
      </div>
    </main>
  );
};

export default ErrorComponent;
