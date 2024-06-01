import React, { useState } from "react";
import classes from "./ProductReviewsComponent.module.css";
import AvgRating from "../../Tools/AvgRating";
import ReviewsFilter from "../../Tools/ReviewsFiltr";
import Rating from "../../Tools/Rating";
import "react-loading-skeleton/dist/skeleton.css";
import ReviewWriteModal from "./ReviewWriteModal/ReviewWriteModal";

const ProductReviewsComponent = ({ review, setReview, product }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <ReviewWriteModal
        visible={visible}
        setVisible={setVisible}
        product={product}
      />
      <section className={classes.reviewsWrapper}>
        <div className={classes.reviewsBlockUpper}>
          {review ? (
            <>
              <div className={classes.reviewBlockQuantity}>
                <AvgRating reviews={review} />
                відгуків {review.length}
              </div>
              <ReviewsFilter
                reviews={review}
                updateFilteredReviews={setReview}
              />
            </>
          ) : (
            <>
              <div className={classes.reviewBlockQuantity}>
                <AvgRating reviews={[0]} />
                відгуків {[0]}
              </div>
            </>
          )}
        </div>

        <div className={classes.commentsWrapper}>
          {review ? (
            review.map((item, index) => (
              <div key={index} className={classes.reviewBlock}>
                <div className={classes.reviewUpperBlock}>
                  <span className={classes.reviewBlockName}>{item.name}</span>
                  <span className={classes.reviewDateAndRating}>
                    <span className={classes.reviewRating}>
                      <Rating rating={item.rating} />
                    </span>
                    <span className={classes.reviewDate}>{item.date}</span>
                  </span>
                </div>
                <div className={classes.reviewText}>
                  <span>{item.product}</span>
                  <p>{item.review}</p>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className={classes.reviewsBlockDown}>
          <button
            onClick={() => setVisible(true)}
            className={classes.addReview}
          >
            Додати відгук
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductReviewsComponent;
