import React from "react";
import TopHeader from "../Components/Header/TopHeader/TopHeader";
import BottomHeader from "../Components/Header/BottomHeader/BottomHeader";
import Footer from "../Components/Footer/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ScrollToTopButton from "../Components/Tools/ScrollToTopButton";
import OrderDetails from "../Components/OrderDetails/OrderDetails";
import { useParams } from "react-router";

const OrderPage = () => {
  const { orderId } = useParams();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Замовлення №{orderId} - Energy Solar</title>
        </Helmet>
        <TopHeader />
        <BottomHeader />
        <OrderDetails orderId={orderId} />
        <Footer />
        <ScrollToTopButton />
      </HelmetProvider>
    </>
  );
};

export default OrderPage;
