import React from "react";
import classes from "./ProductSpecificationsComponent.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductSpecificationsComponentLoading = () => {
  const array = [1, 2, 3, 4, 5];

  return (
    <section className={classes.productInfoWrapper}>
      <div className={classes.ratingInfo}>
        <SkeletonTheme
          baseColor="#202020"
          highlightColor="#444"
          height="100%"
          width="10vw"
        >
          <Skeleton count={1} />
        </SkeletonTheme>
      </div>
      <div className={classes.productInfo}>
        <div className={classes.productText}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            height="100%"
            width="40vw"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>
        <div className={classes.singleInfoTech}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            height="100%"
            width="25vw"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            height="100%"
            width="25vw"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>
        {array.map((item, index) => (
          <div key={index} className={classes.singleInfoTech}>
            <SkeletonTheme
              baseColor="#202020"
              highlightColor="#444"
              height="100%"
              width="25vw"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
            <SkeletonTheme
              baseColor="#202020"
              highlightColor="#444"
              height="100%"
              width="25vw"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSpecificationsComponentLoading;
