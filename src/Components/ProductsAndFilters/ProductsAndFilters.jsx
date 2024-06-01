import React, { useEffect, useState } from "react";
import classes from "./ProductsAndFilters.module.css";
import Api from "../../API/Api";
import { useNavigate } from "react-router";
import CategoryContent from "./ProductsAndFiltersContent/CategoryContent";
import FilterTopSide from "./ProductsAndFiltersContent/CategoryContentComponents/FilterTopSide/FilterTopSide";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CategoryContentLoading from "./ProductsAndFiltersContent/CategoryContentLoading";
import { ReactTyped } from "react-typed";
import PageNavigationComponent from "../PageNavigationComponent/PageNavigationComponent";

const ProductsAndFilters = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Api.getByCategory(category);
        if (response.data.length > 1) {
          setProducts(response.data);
          const responseCategory = await Api.getCategory(category);
          setCategoryInfo(responseCategory.data);
          setLoading(false);
        } else {
          navigate("/error");
        }
      } catch (error) {
        navigate("/error");
      }
    };

    fetchProduct();
  }, [category, navigate]);

  return (
    <main className={classes.categoryWrapper}>
      {loading ? (
        <article className={classes.categoryName}>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            height="2vh"
            width="15vw"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
          <SkeletonTheme
            baseColor="#202020"
            highlightColor="#444"
            height="2vh"
            width="10vw"
          >
            <Skeleton count={1} />
          </SkeletonTheme>
        </article>
      ) : (
        <>
          <PageNavigationComponent categoryName={category} loading={loading} />
          <article className={classes.categoryNameWrapper}>
            <ReactTyped
              strings={[categoryInfo[0].name]}
              typeSpeed={40}
              startWhenVisible
              showCursor={false}
              className={classes.categoryName}
            />
            <FilterTopSide products={products} updateProducts={setProducts} />
          </article>
        </>
      )}
      <article className={classes.categoryBlock}>
        {loading ? (
          <CategoryContentLoading />
        ) : (
          <CategoryContent
            products={products}
            category={categoryInfo[0].link}
          />
        )}
      </article>
    </main>
  );
};

export default ProductsAndFilters;
