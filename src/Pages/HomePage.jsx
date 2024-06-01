import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Slider from "../Components/Slider/Slider";
import Footer from "../Components/Footer/Footer";
import CategoryPreviewsComponent from "../Components/CategoryPreviewsComponent/CategoryPreviewsComponent";
import FaqComponent from "../Components/FAQComponent/FAQComponent";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";
import PopularProducts from "../Components/PopularProducts/PopularProducts";
import UserRecomendation from "../Components/UserRecommendation/UserRecomendation";

const HomePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Домашня сторінка - Energy Solar</title>
      </Helmet>
      <TopHeader />
      <BottomHeader />
      <Slider />
      <CategoryPreviewsComponent />
      <UserRecomendation />
      <PopularProducts
        categoryName="solarpanels"
        name="Популярні Сонячні Панелі"
      />
      <PopularProducts categoryName="batteries" name="Популярні Акумулятори" />
      <PopularProducts categoryName="accessories" name="Популярні Акссесуари" />
      <FaqComponent />
      <Footer />
      <ScrollToTopButton />
    </HelmetProvider>
  );
};

export default HomePage;
