import React from "react";
import classes from "./ProductReviewsComponent.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductReviewsComponentLoading = () => {
  return (
    <div className={classes.reviewsWrapper}>
      <div className={classes.reviewsBlockUpper}>
        <div className={classes.reviewBlockQuantity}>
          <SkeletonTheme baseColor="#202020" highlightColor="#444" width="10vw">
            <Skeleton count={1} />
          </SkeletonTheme>
        </div>
        <SkeletonTheme baseColor="#202020" highlightColor="#444" width="15vw">
          <Skeleton count={1} />
        </SkeletonTheme>
      </div>
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className={classes.reviewBlock}>
          <div className={classes.reviewUpperBlock}>
            <span className={classes.reviewBlockName}>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                width="10vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </span>
            <span>
              <span className={classes.reviewDate}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  width="10vw"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </span>
            </span>
          </div>
          <div className={classes.reviewText}>
            <span>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                width="15vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </span>
            <p>
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton count={1} />
              </SkeletonTheme>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewsComponentLoading;
