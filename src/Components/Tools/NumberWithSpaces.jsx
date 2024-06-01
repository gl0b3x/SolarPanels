import React from "react";

const NumberWithSpaces = ({ number }) => {
  const addThousandSeparator = (input) => {
    if (typeof input === "number") {
      input = input.toString();
    } else if (typeof input === "undefined") {
      return "";
    }

    return input.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return <>{addThousandSeparator(number)}</>;
};

export default NumberWithSpaces;
