import React from "react";
import classes from "./ProductSpecificationsComponent.module.css";
import AvgRating from "../../Tools/AvgRating";

const ProductSpecificationsComponent = ({ product, review }) => {
  return (
    <section className={classes.productInfoWrapper}>
      {review ? (
        <div className={classes.ratingInfo}>
          <AvgRating reviews={review} />
          відгуків {review.length}
        </div>
      ) : (
        <div className={classes.ratingInfo}>
          <AvgRating reviews={[0]} />
          відгуків 0
        </div>
      )}
      <div className={classes.productInfo}>
        <div className={classes.productText}>
          Опис та Характеристики
          <span> {product[0].name}</span>
        </div>
        <div className={classes.singleInfoTech}>
          <span>Опис</span>
          <span>{product[0].description}</span>
        </div>
        {product[0].characteristics ? (
          product[0].characteristics.map((item, index) => (
            <div key={index} className={classes.singleInfoTech}>
              <span>{item.name}</span>
              <span>{item.value}</span>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default ProductSpecificationsComponent;
