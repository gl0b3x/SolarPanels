import React from "react";

function StarRating({ rating, children }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <span key={i} className="star highlightedStar">
          &#9733;
        </span>,
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <span key={i} className="star halfStar">
          &#9734;
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className="star">
          &#9734;
        </span>,
      );
    }
  }
  return (
    <>
      {stars} {children}
    </>
  );
}

export default StarRating;
