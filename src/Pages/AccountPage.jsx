import React, { useContext, useEffect } from "react";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import Footer from "../Components/Footer/Footer";
import AccountComponents from "../Components/AccountComponent/AccountComponents/AccountComponents";
import { ProductContext } from "../Context";
import { useNavigate } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UserRecomendation from "../Components/UserRecommendation/UserRecomendation";

const AccountPage = () => {
  const { userToken, userTokenLoaded } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userTokenLoaded === true) {
      if (userToken === "false") {
        navigate("/");
      }
    }
  }, [userToken, navigate, userTokenLoaded]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title> Особистий кабінет - Energy Solar </title>
        </Helmet>
        <TopHeader />
        <BottomHeader />
        <AccountComponents />
        <UserRecomendation />
        <Footer />
      </HelmetProvider>
    </>
  );
};

export default AccountPage;
