import React from "react";
import classes from "./FilterLeftSide.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const FilterLeftSideLoading = () => {
  const array = [1, 2, 3, 4, 5];

  return (
    <>
      <div className={classes.filterWrapper}>
        <span className={classes.filterName}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            height="2vh"
            width="15vw"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </span>
      </div>
      {array.map((item, index) => (
        <div key={index} className={classes.filterWrapper}>
          <span className={classes.filterName}>
            <SkeletonTheme
              baseColor="#202020"
              highlightColor="#444"
              height="2vh"
              width="15vw"
            >
              <Skeleton count={1} />
            </SkeletonTheme>
            <div className={classes.filterBrand}>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                height="1vh"
                width="14vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </div>
            <div className={classes.filterBrand}>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                height="1vh"
                width="14vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </div>
            <div className={classes.filterBrand}>
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                height="1vh"
                width="14vw"
              >
                <Skeleton count={1} />
              </SkeletonTheme>
            </div>
          </span>
        </div>
      ))}
    </>
  );
};

export default FilterLeftSideLoading;
