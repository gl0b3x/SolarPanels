import React, { useContext } from "react";
import classes from "./CategoryPreviewsComponent.module.css";
import PrevCategoryBlock from "./PreviewCategory/PreviewCategory";
import { ProductContext } from "../../Context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ReactTyped } from "react-typed";

const CategoryPreviewsComponent = () => {
  const { categories, loading } = useContext(ProductContext);

  return (
    <>
      <section className={classes.previewCategoriesWrapper}>
        <div className={classes.previewText}>
          <ReactTyped
            strings={[
              " Міняємо правила гри: Альтернативна енергетика визначає майбутнє",
            ]}
            typeSpeed={40}
            startWhenVisible
            showCursor={false}
          />
        </div>
        <div className={classes.previewCategories}>
          {loading ? (
            <>
              <div className={classes.prevCategory}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="20vh"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
              <div className={classes.prevCategory}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="20vh"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
              <div className={classes.prevCategory}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="20vh"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
              <div className={classes.prevCategory}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="20vh"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
              <div className={classes.prevCategory}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="20vh"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
            </>
          ) : (
            categories.map((category) => (
              <PrevCategoryBlock
                key={category.id}
                image={category.image}
                name={category.name}
                link={category.link}
              ></PrevCategoryBlock>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryPreviewsComponent;
