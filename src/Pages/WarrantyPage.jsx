import React from "react";
import Footer from "../Components/Footer/Footer";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import WarrantyBlock from "../Components/WarrantlyComponent/WarrantlyComponent";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";

const WarrantyPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Гарантія - Energy Solar</title>
      </Helmet>
      <TopHeader />
      <BottomHeader />
      <WarrantyBlock />
      <Footer />
      <ScrollToTopButton />
    </HelmetProvider>
  );
};

export default WarrantyPage;
