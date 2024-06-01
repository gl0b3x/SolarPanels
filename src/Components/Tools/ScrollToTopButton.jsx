import React, { useState, useEffect } from "react";
import classes from "./Tools.module.css";
import { Link } from "react-router-dom";
import { PhoneFilled, VerticalAlignTopOutlined } from "@ant-design/icons";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible && window.pageYOffset > 300) {
        setIsVisible(true);
      } else if (isVisible && window.pageYOffset <= 300) {
        setIsVisible(false);
      }
    };

    let timeoutId;
    const handleScrollThrottled = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScrollThrottled);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <>
      <VerticalAlignTopOutlined
        onClick={scrollToTop}
        className={`${classes.scrollTopButton} ${isVisible ? classes.visible : classes.hidden}`}
      />
      <Link
        className={`${classes.telephoneButton} ${classes.telephoneButtonAnimation}`}
        to="tel:380000000"
      >
        <PhoneFilled />
      </Link>
    </>
  );
};

export default ScrollToTopButton;
