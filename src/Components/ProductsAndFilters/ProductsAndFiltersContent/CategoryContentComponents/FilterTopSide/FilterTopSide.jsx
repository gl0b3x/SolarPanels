import React, { useState } from "react";
import { Select } from "antd";

function FilterTopSide({ products, updateProducts }) {
  const [selectedOption, setSelectedOption] = useState("Фільтр");

  const handleOptionChange = (value) => {
    const selectedOption = value;
    setSelectedOption(selectedOption);
    filterAndSortReviews(selectedOption);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  const filterAndSortReviews = (selectedOption) => {
    let filteredReviews = [...products];

    switch (selectedOption) {
      case "expensive":
        filteredReviews.sort((a, b) => b.price - a.price);
        break;
      case "cheaper":
        filteredReviews.sort((a, b) => a.price - b.price);
        break;
      case "ratingGood":
        filteredReviews.sort(
          (a, b) =>
            calculateAverageRating(b.reviews) -
            calculateAverageRating(a.reviews),
        );
        break;
      case "ratingBad":
        filteredReviews.sort(
          (a, b) =>
            calculateAverageRating(a.reviews) -
            calculateAverageRating(b.reviews),
        );
        break;
      case "popular":
        filteredReviews.sort((a, b) => b.popular - a.popular);
        break;
      default:
        break;
    }
    updateProducts(filteredReviews);
  };

  return (
    <Select
      defaultValue={selectedOption}
      style={{
        height: 30,
        width: 175,
        textAlign: "center",
      }}
      dropdownStyle={{
        textAlign: "center",
        backgroundColor: "var(--background2)",
      }}
      onChange={handleOptionChange}
      options={[
        {
          value: "expensive",
          label: "Спочатку дорожчі",
        },
        {
          value: "cheaper",
          label: "Спочатку дешевші",
        },
        {
          value: "ratingGood",
          label: "Від кращої оцінки",
        },
        {
          value: "ratingBad",
          label: "Від гіршої оцінки",
        },
        {
          value: "popular",
          label: "За популярністью",
        },
      ]}
    />
  );
}

export default FilterTopSide;
