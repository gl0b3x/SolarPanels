import React from "react";
import Rating from "./Rating";

const AvgRating = ({ reviews, children }) => {
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <>{<Rating rating={calculateAverageRating(reviews)}>{children}</Rating>}</>
  );
};
export default AvgRating;
