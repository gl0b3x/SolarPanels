import React from "react";
import classes from "./PreviewCategory.module.css";
import { Link } from "react-router-dom";

const PreviewCategory = ({ image, name, link }) => {
  return (
    <Link className={classes.prevCategory} to={`/${link}`}>
      <div className={classes.imageCategoryBlock}>
        <img
          className={classes.imageCategory}
          src={`./${image}`}
          alt="solar panel"
        />
      </div>
      <span className={classes.nameCategory}>{name}</span>
    </Link>
  );
};

export default PreviewCategory;
