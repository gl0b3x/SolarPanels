import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import Footer from "../Components/Footer/Footer";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";
import { useParams } from "react-router";
import ProductsAndFilters from "../Components/ProductsAndFilters/ProductsAndFilters";
import ViewsHistory from "../Components/ViewsHistory/ViewsHistory";

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {category === "solarpanels"
              ? "Сонячні панелі - Energy Solar"
              : category === "batteries"
                ? "Акумулятори - Energy Solar"
                : category === "accessories"
                  ? "Аксесуари - Energy Solar"
                  : ""}
          </title>
        </Helmet>
        <TopHeader />
        <BottomHeader />
        <ProductsAndFilters category={category} />
        <ViewsHistory />
        <Footer />
        <ScrollToTopButton />
      </HelmetProvider>
    </>
  );
};

export default CategoryPage;
