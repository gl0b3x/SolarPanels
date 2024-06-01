import React, { useContext } from "react";
import classes from "./Footer.module.css";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../../Context";

const EMAIL = "mailto:site@gmail.com";
const TELEPHONE = "tel:+380000000000";
const SOCIAL_MEDIA_LINKS = [
  {
    url: "https://www.facebook.com",
    icon: "https://img.icons8.com/ios/100/d2f4f5/facebook--v1.png",
    alt: "Facebook",
  },
  {
    url: "https://www.instagram.com",
    icon: "https://img.icons8.com/ios/100/d2f4f5/instagram-new--v1.png",
    alt: "Instagram",
  },
  {
    url: "https://www.tiktok.com",
    icon: "https://img.icons8.com/ios/100/d2f4f5/tiktok--v1.png",
    alt: "TikTok",
  },
  {
    url: "https://web.telegram.org/",
    icon: "https://img.icons8.com/ios/100/d2f4f5/telegram.png",
    alt: "Telegram",
  },
];
const PAYMENT_METHODS_ICONS = [
  "https://img.icons8.com/ios/100/d2f4f5/visa.png",
  "https://img.icons8.com/ios-filled/96/d2f4f5/mastercard.png",
  "https://img.icons8.com/ios/100/d2f4f5/tether.png",
];

const Footer = () => {
  const location = useLocation();
  const { categories } = useContext(ProductContext);

  return (
    <>
      <footer className={classes.footer}>
        <Link className={classes.footerLogo} to={"/"}>
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/external-others-phat-plus/64/008080/external-green-smart-farm-outline-others-phat-plus.png"
            alt="external-green-smart-farm-outline-others-phat-plus"
          />
          <div className={classes.footerLogoText}>
            <span>ENERGY SOLAR</span>
            <p>МАГАЗИН ЗЕЛЕНОЇ ЕНЕРГІЇ</p>
          </div>
        </Link>
        <div className={classes.leftColumn}>
          <h1>Товари</h1>
          {categories.map((category) => (
            <Link
              className={
                location.pathname === `/${category.link}`
                  ? "activePageFooter"
                  : classes.footerMarginBottom
              }
              key={category.id}
              to={`/${category.link}`}
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
        <nav className={classes.centerColumn}>
          <h1>Інформація</h1>
          <Link
            style={{ marginTop: "2vh", marginBottom: "20px" }}
            className={location.pathname === "/about" ? "activePageFooter" : ""}
            to="/about"
          >
            <span> Про компанію </span>
          </Link>
          <Link
            to="/delivery"
            className={`${classes.footerMarginBottom} ${location.pathname === "/delivery" ? "activePageFooter" : ""}`}
          >
            <span> Доставка і оплата </span>
          </Link>
          <Link
            to="/warranty"
            className={`${classes.footerMarginBottom} ${location.pathname === "/warranty" ? "activePageFooter" : ""}`}
          >
            <span>Гарантія</span>
          </Link>
        </nav>
        <nav className={classes.rightColumn}>
          <h1>Контакти</h1>
          <Link className={classes.footerMail} to={EMAIL}>
            site@gmail.com
          </Link>
          <span style={{ opacity: "0.7", marginTop: "2px" }}>Напишіть нам</span>
          <Link className={classes.footerTelephone} to={TELEPHONE}>
            +38 000 000 00 00
          </Link>
          <span style={{ opacity: "0.7", marginTop: "2px" }}>Гаряча лінія</span>

          <div className={classes.footerInfoText}>
            <span>Працюємо щодня</span>
            <span>З 9:00 до 22:00</span>
          </div>
          <div className={classes.footerSocialMedia}>
            {SOCIAL_MEDIA_LINKS.map((link, index) => (
              <Link key={index} to={link.url}>
                <img
                  width="32"
                  height="32"
                  loading="lazy"
                  src={link.icon}
                  alt={link.alt}
                />
              </Link>
            ))}
          </div>
          <div className={classes.footerPaymentMethods}>
            {PAYMENT_METHODS_ICONS.map((icon, index) => (
              <img
                key={index}
                width="40"
                height="40"
                loading="lazy"
                src={icon}
                alt={`Payment Method ${index + 1}`}
              />
            ))}
          </div>
        </nav>
      </footer>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "var(--background)",
          fontSize: "24px",
          color: "var(--text)",
        }}
      >
        Copyright © 2024 Ivan Nikitin (github.com/gl0b3x)
      </div>
    </>
  );
};

export default Footer;
