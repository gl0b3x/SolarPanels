import React from "react";
import classes from "./ProductComponent.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductComponentLoading = () => {
  return (
    <div className={classes.productInfoWrapper}>
      <div className={classes.leftBlock}>
        <div className={classes.productImage} style={{ padding: "2vh 2vw" }}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            height="100%"
            width="100%"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>
        <div className={classes.productPreviewImages}>
          {[1, 2, 3].map((index) => (
            <SkeletonTheme
              key={index}
              baseColor="#202020"
              highlightColor="#444"
              height="100%"
            >
              <Skeleton className={classes.productSmallImage} count={1} />
            </SkeletonTheme>
          ))}
        </div>
      </div>
      <div className={classes.rightBlock}>
        <span className={classes.productName}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="37vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </span>
        <div className={classes.techInfoProduct}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="37vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>
        <div className={classes.InStock}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="10vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>

        <div className={classes.productPriceWrapper}>
          <div className={classes.productPriceBlock}>
            <SkeletonTheme
              baseColor="#202020"
              highlightColor="#444"
              width="10vw"
              height="2vh"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
          </div>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="10vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>

        <div className={classes.recommendBlockWrapper}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="37vw"
            height="8vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>

        <div className={classes.ServicesWrapper}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="37vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="37vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>

        <div className={classes.ButtonsBuyWrapper}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="10vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            width="10vw"
            height="2vh"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
};

export default ProductComponentLoading;
