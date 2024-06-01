import React, { useContext, useEffect, useState, useMemo } from "react";
import classes from "./UserRecomendation.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductBlock from "../ProductsAndFilters/ProductsAndFiltersContent/CategoryContentComponents/ProductBlock/ProductBlock";
import { ProductContext } from "../../Context";
import Api from "../../API/Api";

const UserRecommendation = () => {
  const { loading, viewsHistory } = useContext(ProductContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [popularCategories, setPopularCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const array = [1, 2, 3, 4, 5, 6];

  const getSortedCategoriesByPopularity = (products) => {
    if (!products || products.length === 0) return [];

    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    const sortedCategories = Object.keys(categoryCounts)
      .map((category) => ({
        name: category,
        quantity: categoryCounts[category],
      }))
      .sort((a, b) => b.quantity - a.quantity);

    return sortedCategories;
  };

  useEffect(() => {
    if (!viewsHistory) return;
    const sortedCategories = getSortedCategoriesByPopularity(viewsHistory);
    setPopularCategories(sortedCategories);
  }, [viewsHistory]);

  useEffect(() => {
    const generateRecommendations = async (categories) => {
      const totalViewed = categories.reduce(
        (sum, category) => sum + category.quantity,
        0,
      );
      const maxRecommendations = 10;

      const categoriesWithRecommendations = categories.map((category) => ({
        ...category,
        recommendationCount: Math.floor(
          (category.quantity / totalViewed) * maxRecommendations,
        ),
      }));

      let totalRecommendations = categoriesWithRecommendations.reduce(
        (sum, category) => sum + category.recommendationCount,
        0,
      );

      let remainingRecommendations = maxRecommendations - totalRecommendations;
      while (remainingRecommendations > 0) {
        for (
          let i = 0;
          i < categoriesWithRecommendations.length &&
          remainingRecommendations > 0;
          i++
        ) {
          categoriesWithRecommendations[i].recommendationCount += 1;
          remainingRecommendations -= 1;
        }
      }

      const recommendationsArray = await Promise.all(
        categoriesWithRecommendations.map(async (category) => {
          const { name, recommendationCount } = category;
          try {
            const res = await Api.getItemsForRec(name, recommendationCount);
            return res.data;
          } catch (error) {
            console.error(`Error fetching items for category ${name}:`, error);
            return [];
          }
        }),
      );

      setProducts(recommendationsArray.flat());
    };

    if (popularCategories.length > 0) {
      generateRecommendations(popularCategories);
    }
  }, [popularCategories]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
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
    <>
      {viewsHistory && viewsHistory.length > 0 ? (
        <section className={classes.recommendationWrapper}>
          <div className={classes.recommendationName}>
            <span>Рекомендації для Вас</span>
          </div>
          <Swiper
            className={classes.recommendationSlider}
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
            {loading ? (
              array.map((index) => (
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
            ) : (
              <>
                {products.map((product, index) =>
                  product.items.map((product, index) => (
                    <SwiperSlide key={index} className={classes.SlideItem}>
                      <ProductBlock item={product} />
                    </SwiperSlide>
                  )),
                )}
              </>
            )}
          </Swiper>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserRecommendation;
