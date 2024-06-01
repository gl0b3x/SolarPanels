import React, { useContext } from "react";
import classes from "./AccountChoseInfo.module.css";
import { ProductContext } from "../../../../../Context";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const AccountChoseInfo = ({ currentInfo, setCurrentInfo }) => {
  const { setUserToken } = useContext(ProductContext);
  const navigate = useNavigate();

  const exitFunction = () => {
    localStorage.removeItem("userToken");
    setUserToken("false");
    navigate("/");
  };

  return (
    <section className={classes.choseInfo}>
      <ul className={classes.choseInfoUl}>
        <li
          onClick={() => setCurrentInfo("Profile")}
          className={`${classes.choseInfoItem} ${currentInfo === "Profile" ? classes.activeInfo : ""} `}
        >
          Профіль
        </li>
        <li
          onClick={() => setCurrentInfo("Orders")}
          className={`${classes.choseInfoItem} ${currentInfo === "Orders" ? classes.activeInfo : ""} `}
        >
          Замовлення
        </li>
        <li onClick={exitFunction} className={classes.exitClick}>
          Вийти <LoginOutlined />
        </li>
      </ul>
    </section>
  );
};

export default AccountChoseInfo;
