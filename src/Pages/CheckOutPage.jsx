import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import Footer from "../Components/Footer/Footer";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";
import CheckOutComponent from "../Components/CheckOutComponent/CheckOutComponent";

const CheckOutPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Оформлення замовлення - Energy Solar</title>
        </Helmet>
        <TopHeader />
        <CheckOutComponent />
        <Footer />
        <ScrollToTopButton />
      </HelmetProvider>
    </>
  );
};

export default CheckOutPage;
