import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./Tools/ScrollToTop";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import Error from "../Pages/ErrorPage";
import DeliveryPage from "../Pages/DeliveryPage";
import WarrantyPage from "../Pages/WarrantyPage";
import ProductPage from "../Pages/ProductPage";
import CategoryPage from "../Pages/CategoryPage";
import CheckOutPage from "../Pages/CheckOutPage";
import AccountPage from "../Pages/AccountPage";
import OrderPage from "../Pages/OrderPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/delivery"} element={<DeliveryPage />} />
        <Route path={"/warranty"} element={<WarrantyPage />} />
        <Route path={"/:category/:link"} element={<ProductPage />} />
        <Route path={"/:category/"} element={<CategoryPage />} />
        <Route path={"/error"} element={<Error />} />
        <Route path={"/checkout"} element={<CheckOutPage />} />
        <Route path={"/account"} element={<AccountPage />} />
        <Route path={"/order/:orderId"} element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
