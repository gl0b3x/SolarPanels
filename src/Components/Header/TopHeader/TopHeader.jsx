import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./TopHeader.module.css";

const TopHeader = () => {
  const location = useLocation();

  return (
    <header className={classes.headerUp}>
      <Link className={classes.headerLogo} to="/">
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/external-others-phat-plus/64/008080/external-green-smart-farm-outline-others-phat-plus.png"
          alt="external-green-smart-farm-outline-others-phat-plus"
        />
        <div className={classes.headerLogoText}>
          <span>ENERGY SOLAR</span>
          <p>МАГАЗИН ЗЕЛЕНОЇ ЕНЕРГІЇ</p>
        </div>
      </Link>
      <nav className={classes.headerButtons}>
        <Link
          className={
            location.pathname === "/about"
              ? "activePageHeader"
              : "notActivePageHeader"
          }
          to="/about"
        >
          <span>ПРО КОМПАНІЮ</span>
        </Link>
        <Link
          className={
            location.pathname === "/delivery"
              ? "activePageHeader"
              : "notActivePageHeader"
          }
          to="/delivery"
        >
          <span>ДОСТАВКА І ОПЛАТА</span>
        </Link>
        <Link
          className={
            location.pathname === "/warranty"
              ? "activePageHeader"
              : "notActivePageHeader"
          }
          to="/warranty"
        >
          <span>ГАРАНТІЯ</span>
        </Link>
      </nav>
    </header>
  );
};

export default TopHeader;
