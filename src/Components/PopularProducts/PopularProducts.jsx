import React, { useState, useEffect, useContext, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import classes from "./PopularProducts.module.css";
import { ProductContext } from "../../Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductBlock from "../ProductsAndFilters/ProductsAndFiltersContent/CategoryContentComponents/ProductBlock/ProductBlock";

const PopularProducts = ({ categoryName, name }) => {
  const { products, loading } = useContext(ProductContext);

  const [screenWidth, setScreenWidth] = useState(0);

  const array = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    setScreenWidth(window.innerWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesPerView = useMemo(() => {
    if (screenWidth <= 450) return 1;
    if (screenWidth <= 601) return 1;
    if (screenWidth <= 768) return 2;
    if (screenWidth <= 992) return 3;
    if (screenWidth <= 1500) return 4;
    return 5;
  }, [screenWidth]);

  return (
    <section className={classes.recomendationWaper}>
      <div className={classes.recomendationName}>
        <span>{name}</span>
      </div>
      <Swiper
        className={classes.recomendationSlider}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {loading
          ? array.map((index) => (
              <SwiperSlide key={index} className={classes.swiperLoading}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="35vh"
                  width="100vw"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </SwiperSlide>
            ))
          : products
              .filter((product) => product.popular === 1)
              .filter((product) => product.category === `${categoryName}`)
              .map((product, index) => (
                <SwiperSlide key={product.id} className={classes.SlideItem}>
                  <ProductBlock item={product} />
                </SwiperSlide>
              ))}
      </Swiper>
    </section>
  );
};

export default PopularProducts;
