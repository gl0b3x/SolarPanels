import React from "react";
import ErrorComponent from "../Components/ErrorComponent/ErrorComponent";
import Footer from "../Components/Footer/Footer";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";

const ErrorPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Помилка - Energy Solar</title>
      </Helmet>
      <TopHeader />
      <BottomHeader />
      <ErrorComponent />
      <Footer />
      <ScrollToTopButton />
    </HelmetProvider>
  );
};

export default ErrorPage;
