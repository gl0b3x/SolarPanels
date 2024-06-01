import React, { useEffect, useState } from "react";
import { Select } from "antd";

function ReviewsFilter({ reviews, updateFilteredReviews }) {
  const [selectedOption, setSelectedOption] = useState("Фільтр");

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    setScreenWidth(window.innerWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let variable;
  if (screenWidth <= 450) {
    variable = 125;
  } else if (screenWidth <= 601) {
    variable = 150;
  } else if (screenWidth <= 768) {
    variable = 150;
  } else if (screenWidth <= 992) {
    variable = 200;
  } else if (screenWidth <= 1199) {
    variable = 200;
  } else if (screenWidth >= 1199) {
    variable = 200;
  }

  const handleOptionChange = (value) => {
    const selectedOption = value;
    setSelectedOption(selectedOption);
    filterAndSortReviews(selectedOption);
  };

  const filterAndSortReviews = (selectedOption) => {
    let filteredReviews = [...reviews];

    switch (selectedOption) {
      case "oldest":
        filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "newest":
        filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "ratingGood":
        filteredReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "ratingBad":
        filteredReviews.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    updateFilteredReviews(filteredReviews);
  };

  return (
    <Select
      defaultValue={selectedOption}
      style={{
        height: 30,
        width: variable,
        textAlign: "center",
      }}
      dropdownStyle={{
        textAlign: "center",
        backgroundColor: "var(--background2)",
      }}
      onChange={handleOptionChange}
      options={[
        {
          value: "newest",
          label: "Спочатку новіші",
        },
        {
          value: "oldest",
          label: "Спочатку старіші",
        },
        {
          value: "ratingGood",
          label: "Від кращої оцінки",
        },
        {
          value: "ratingBad",
          label: "Від гіршої оцінки",
        },
      ]}
    />
  );
}

export default ReviewsFilter;
