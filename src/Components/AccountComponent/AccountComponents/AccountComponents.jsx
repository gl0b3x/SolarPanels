import React, { useContext, useEffect, useState } from "react";
import classes from "./AccountComponents.module.css";
import AccountChoseInfo from "./AccountContent/AccountChoseInfo/AccountChoseInfo";
import { ProductContext } from "../../../Context";
import AccountProfile from "./AccountContent/AccountProfile/AccountProfile";
import Api from "../../../API/Api";
import OrdersHistory from "./AccountContent/OrdersHistory/OrdersHistory";

const AccountComponents = () => {
  const { userToken } = useContext(ProductContext);
  const [user, setUser] = useState([]);
  const [currentInfo, setCurrentInfo] = useState("Profile");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Api.getUserInfo(
          userToken.token,
          userToken.email,
        );
        setUser(response.data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, [userToken]);

  return (
    <main className={classes.accountWrapper}>
      <article className={classes.accountBlock}>
        <AccountChoseInfo
          currentInfo={currentInfo}
          setCurrentInfo={setCurrentInfo}
        />
        {currentInfo === "Profile" ? (
          <AccountProfile user={user} token={userToken} />
        ) : (
          <OrdersHistory user={user} />
        )}
      </article>
    </main>
  );
};

export default AccountComponents;
