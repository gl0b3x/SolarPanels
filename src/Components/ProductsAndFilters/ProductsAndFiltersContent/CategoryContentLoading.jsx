import React from "react";
import classes from "../ProductsAndFilters.module.css";
import ProductBlockLoading from "./CategoryContentComponents/ProductBlock/ProductBlockLoading";
import FilterLeftSideLoading from "./CategoryContentComponents/FilterLeftSide/FilterLeftSideLoading";

const CategoryContentLoading = () => {
  return (
    <>
      <section className={classes.categoryContent}>
        <section className={classes.filtersBlock}>
          <FilterLeftSideLoading />
        </section>

        <section className={classes.productsBlock}>
          <ProductBlockLoading />
        </section>
      </section>
    </>
  );
};

export default CategoryContentLoading;
