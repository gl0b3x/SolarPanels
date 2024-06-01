import React from "react";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import Footer from "../Components/Footer/Footer";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ProductPageComponent from "../Components/ProductPageComponent/ProductPageComponent";
import ViewsHistory from "../Components/ViewsHistory/ViewsHistory";
import UserRecomendation from "../Components/UserRecommendation/UserRecomendation";

const ProductPage = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title> Товар - Energy Solar </title>
        </Helmet>
        <TopHeader />
        <BottomHeader />
        <ProductPageComponent />
        <UserRecomendation />
        <ViewsHistory />
        <Footer />
        <ScrollToTopButton />
      </HelmetProvider>
    </>
  );
};

export default ProductPage;
