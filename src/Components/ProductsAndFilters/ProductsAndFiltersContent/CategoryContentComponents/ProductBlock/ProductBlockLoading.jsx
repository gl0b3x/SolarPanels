import React from "react";
import classes from "./ProductBlock.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductBlockLoading = () => {
  const arrayProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      {arrayProducts.map((item, index) => (
        <div key={index} className={classes.productBlock}>
          <div className={classes.topBlock}>
            <div className={classes.imageProductBlock}>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                height="25vh"
                width="11vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </div>
          </div>
          <div className={classes.bottomBlock}>
            <span className={classes.nameProduct}>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                height="2vh"
                width="11vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </span>
            <span className={classes.ratingProduct}>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                height="2vh"
                width="11vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </span>
            <div className={classes.buyAndPriceProduct}>
              <div className={classes.priceProduct}>
                <span>
                  <SkeletonTheme
                    baseColor="#202020"
                    highlightColor="#444"
                    height="1.5vh"
                    width="7vw"
                  >
                    <Skeleton count={1} />
                  </SkeletonTheme>
                </span>
                <p>
                  <SkeletonTheme
                    baseColor="#202020"
                    highlightColor="#444"
                    height="1.5vh"
                    width="7vw"
                  >
                    <Skeleton count={1} />
                  </SkeletonTheme>
                </p>
              </div>
              <button className={classes.buyButtonProduct}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="32px"
                  width="32px"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductBlockLoading;
