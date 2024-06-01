import React, { useRef, useState, useEffect } from "react";
import classes from "./Slider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const onAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <main className={classes.swiperWrapper}>
      <Swiper
        className={`${classes.swiperWrapper} ${animate ? classes.animated : ""}`}
        onAnimationEnd={onAnimationEnd}
        loop={true}
        spaceBetween={0}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        <SwiperSlide>
          {" "}
          <img
            className={classes.sliderPhoto}
            src="/SliderSlides/Slide4.webp"
            loading="lazy"
            alt="SliderPhoto"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            className={classes.sliderPhoto}
            src="/SliderSlides/Slide1.webp"
            loading="lazy"
            alt="SliderPhoto"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            className={classes.sliderPhoto}
            src="/SliderSlides/Slide3.webp"
            loading="lazy"
            alt="SliderPhoto"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            className={classes.sliderPhoto}
            src="/SliderSlides/Slide2.webp"
            loading="lazy"
            alt="SliderPhoto"
          />
        </SwiperSlide>
        <div className={classes.autoplayProgress} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </main>
  );
};

export default Slider;
