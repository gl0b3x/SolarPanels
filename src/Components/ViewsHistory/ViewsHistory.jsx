import React, { useContext, useEffect, useState } from "react";
import classes from "./ViewsHistory.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import AvgRating from "../Tools/AvgRating";
import NumberWithSpaces from "../Tools/NumberWithSpaces";
import { ProductContext } from "../../Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ViewsHistory = () => {
  const { loading, viewsHistory } = useContext(ProductContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const array = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let variable;
  if (screenWidth <= 450) {
    variable = 2;
  } else if (screenWidth <= 601) {
    variable = 3;
  } else if (screenWidth <= 768) {
    variable = 3;
  } else if (screenWidth <= 992) {
    variable = 4;
  } else if (screenWidth <= 1199) {
    variable = 4;
  } else if (screenWidth >= 1199) {
    variable = 5;
  }

  const uniqueViewsHistory = viewsHistory.reduce(
    (accumulator, currentValue) => {
      const isExist = accumulator.some((item) => item.id === currentValue.id);
      if (!isExist) {
        accumulator.push(currentValue);
      }
      return accumulator;
    },
    [],
  );

  return viewsHistory.length > 0 ? (
    <section className={classes.historyWraper}>
      <div className={classes.historyName}>
        <span>Історія перегляду</span>
      </div>
      <Swiper
        className={classes.historySlider}
        spaceBetween={30}
        slidesPerView={variable}
        navigation={true}
        loop={uniqueViewsHistory.length > 5}
        modules={[Pagination, Navigation]}
      >
        {loading
          ? array.map((index) => (
              <SwiperSlide key={index} className={classes.historyLoading}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="25vh"
                  width="100vw"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </SwiperSlide>
            ))
          : uniqueViewsHistory.map((product, index) => (
              <SwiperSlide key={product.id}>
                <Link
                  to={{ pathname: `/${product.category}/${product.link}` }}
                  className={classes.historySlide}
                >
                  <div className={classes.photoHistoryWrapper}>
                    <img
                      className={classes.photoHistory}
                      src={product.images[0].photo}
                      alt="solarpanel"
                    />
                  </div>
                  <div className={classes.nameHistory}>{product.name}</div>
                  <div className={classes.PriceAndRateHistory}>
                    <span className={classes.rateHistory}>
                      {product.reviews ? (
                        <AvgRating reviews={product.reviews} />
                      ) : (
                        <AvgRating reviews={[0]} />
                      )}
                    </span>
                    <span className={classes.priceHistory}>
                      <NumberWithSpaces number={product.price} />
                      <span>₴</span>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  ) : (
    ""
  );
};

export default ViewsHistory;
