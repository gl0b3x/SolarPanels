import React from "react";
import Footer from "../Components/Footer/Footer";
import InfoAboutUs from "../Components/AboutComponent/AboutComponent";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";

const AboutPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Про Компанію - Energy Solar</title>
      </Helmet>
      <TopHeader />
      <BottomHeader />
      <InfoAboutUs />
      <Footer />
      <ScrollToTopButton />
    </HelmetProvider>
  );
};

export default AboutPage;
