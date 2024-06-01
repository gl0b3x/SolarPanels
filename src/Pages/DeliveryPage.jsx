import React from "react";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import Footer from "../Components/Footer/Footer";
import DeliveryInfo from "../Components/DeliveryInfoComponent/DeliveryInfoComponent";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";

const DeliveryPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Доставка і Оплата - Energy Solar</title>
      </Helmet>
      <TopHeader />
      <BottomHeader />
      <DeliveryInfo />
      <Footer />
      <ScrollToTopButton />
    </HelmetProvider>
  );
};

export default DeliveryPage;
