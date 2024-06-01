import React, { useContext, useEffect, useState } from "react";
import classes from "./ProductComponent.module.css";
import AvgRating from "../../Tools/AvgRating";
import { message, Switch } from "antd";
import { ProductContext } from "../../../Context";
import NumberWithSpaces from "../../Tools/NumberWithSpaces";
import { Link } from "react-router-dom";
import Api from "../../../API/Api";
import {
  CheckCircleFilled,
  CheckOutlined,
  CloseCircleFilled,
  ExclamationCircleFilled,
  PlusOutlined,
  ShoppingFilled,
} from "@ant-design/icons";

const ProductComponent = ({ review, product, setCurrentInfo }) => {
  const { productCart, setProductCart, setViewsHistory } =
    useContext(ProductContext);

  const [messageApi, contextHolder] = message.useMessage();
  const [photo, setPhoto] = useState();
  const [includeWarranty, setIncludeWarranty] = useState(false);
  const [includeService, setIncludeService] = useState(false);
  const [productPrice, setProductPrice] = useState();
  const [itemProduct, setItemProduct] = useState();
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addedRecommendation, setAddedRecommendation] = useState(false);

  let oldPrice = (product[0].price * 1.15).toFixed(0);

  useEffect(() => {
    const fetchProductRecommendation = async () => {
      try {
        const responseId = await Api.getById(product[0].recommendation);
        setRecommendation({
          ...responseId.data[0],
          includeWarranty: "false",
          includeService: "false",
          priceWithServices: `${responseId.data[0].price}`,
        });
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };

    if (product.length > 0) {
      fetchProductRecommendation();

      setViewsHistory((prev) => {
        const productExists = prev.some((item) => item.id === product[0].id);
        if (!productExists) {
          const updatedProductCart = [product[0], ...prev.slice(0, 50 - 1)];
          localStorage.setItem(
            "viewsHistory",
            JSON.stringify(updatedProductCart),
          );
          return updatedProductCart;
        }
        return prev;
      });

      setProductPrice(product[0].price);
      setPhoto(product[0].images[0].photo);
      setItemProduct({
        ...product[0],
        includeWarranty: "false",
        includeService: "false",
        priceWithServices: `${product[0].price}`,
      });
    }
  }, [product, setViewsHistory]);

  const addWarranty = (value) => {
    if (value === true) {
      const totalPrice = function () {
        let price = (
          parseFloat(productPrice) + product[0].services[0].price
        ).toFixed(0);
        if (price < product[0].price) {
          price = product[0].price;
        }
        return price;
      };
      setProductPrice(totalPrice);
      setItemProduct({
        ...itemProduct,
        priceWithServices: totalPrice(),
        includeWarranty: "true",
      });
      setIncludeWarranty(true);
    } else {
      const totalPrice = function () {
        let price = (
          parseFloat(productPrice) - product[0].services[0].price
        ).toFixed(0);
        if (price < product[0].price) {
          price = product[0].price;
        }
        return price;
      };
      setProductPrice(totalPrice);
      setItemProduct({
        ...itemProduct,
        priceWithServices: totalPrice(),
        includeWarranty: "false",
      });
      setIncludeWarranty(false);
    }
  };

  const addService = (value) => {
    if (value === true) {
      const totalPrice = function () {
        let price = (
          parseFloat(productPrice) + product[0].services[1].price
        ).toFixed(0);
        if (price < product[0].price) {
          price = product[0].price;
        }
        return price;
      };
      setProductPrice(totalPrice);
      setItemProduct({
        ...itemProduct,
        priceWithServices: totalPrice(),
        includeService: "true",
      });
      setIncludeService(true);
    } else {
      const totalPrice = function () {
        let price = (
          parseFloat(productPrice) - product[0].services[1].price
        ).toFixed(0);
        if (price < product[0].price) {
          price = product[0].price;
        }
        return price;
      };
      setProductPrice(totalPrice);
      setItemProduct({
        ...itemProduct,
        priceWithServices: totalPrice(),
        includeService: "false",
      });
      setIncludeService(false);
    }
  };

  const addToBasket = () => {
    messageApi.open({
      type: "success",
      content: `${itemProduct.name} успішно додано в корзину`,
    });
    setProductCart((prevProductCart) => {
      const updatedProductCart = [...prevProductCart, itemProduct];
      localStorage.setItem("productCart", JSON.stringify(updatedProductCart));
      return updatedProductCart;
    });
  };

  const addRecommendation = () => {
    const productIndex = productCart.findIndex(
      (item) => item.id === recommendation.id,
    );

    if (addedRecommendation === true) {
      setAddedRecommendation(false);
      messageApi.open({
        type: "error",
        content: `${recommendation.name} успішно видалено з корзини`,
      });
      setProductCart((prevProductCart) => {
        const updatedProductCart = [...prevProductCart];
        updatedProductCart.splice(productIndex, 1);
        localStorage.setItem("productCart", JSON.stringify(updatedProductCart));
        return updatedProductCart;
      });
    } else if (addedRecommendation === false) {
      messageApi.open({
        type: "success",
        content: `${recommendation.name} успішно додано в корзину`,
      });
      setAddedRecommendation(true);
      setProductCart((prevProductCart) => {
        const updatedProductCart = [...prevProductCart, recommendation];
        localStorage.setItem("productCart", JSON.stringify(updatedProductCart));
        return updatedProductCart;
      });
    }
  };

  return (
    <>
      {contextHolder}
      <section className={classes.productInfoWrapper}>
        <div className={classes.leftBlock}>
          <img
            className={classes.productImage}
            src={photo}
            alt="ProductImage"
          />
          <div className={classes.productPreviewImages}>
            {product[0].images.map((item, index) => (
              <img
                key={index}
                className={`${classes.productSmallImage} ${photo === item.photo ? classes.activeSmallImage : ""}`}
                onClick={() => setPhoto(item.photo)}
                src={item.photo}
                alt="photoProduct"
              />
            ))}
          </div>
        </div>
        <div className={classes.rightBlock}>
          <span className={classes.productName}> {product[0].name}</span>
          <div className={classes.techInfoProduct}>
            <span>
              {review ? (
                <AvgRating reviews={review}>
                  <span
                    className={classes.reviewsLength}
                    onClick={() => setCurrentInfo("Reviews")}
                  >
                    відгуки: {review.length}
                  </span>
                </AvgRating>
              ) : (
                <AvgRating reviews={[0]}>
                  <span
                    className={classes.reviewsLength}
                    onClick={() => setCurrentInfo("Reviews")}
                  >
                    відгуки: {[0]}
                  </span>
                </AvgRating>
              )}
            </span>
            <span className={classes.productCode}>
              Артикул товару: {product[0].code}
            </span>
          </div>
          {product[0].quantity > 0 ? (
            product[0].quantity > 5 ? (
              <div className={classes.InStock}>
                <CheckCircleFilled />
                <span>Товар в наявності!</span>
              </div>
            ) : (
              <div className={classes.InStockSmall}>
                <ExclamationCircleFilled />
                <span>Товар скоро закінчится.</span>
              </div>
            )
          ) : (
            <div className={classes.NotAvailableInStore}>
              <CloseCircleFilled />
              <span>Немає в наявності.</span>
            </div>
          )}

          <div className={classes.productPriceWrapper}>
            <div className={classes.productPriceBlock}>
              <span className={classes.productPrice}>
                <NumberWithSpaces number={productPrice} /> ₴
              </span>
              <span className={classes.productOldPrice}>
                {" "}
                <del>
                  {" "}
                  <NumberWithSpaces number={oldPrice} /> ₴
                </del>
              </span>
            </div>
            <span className={classes.productPriceUsdt}>
              {" "}
              <NumberWithSpaces number={productPrice / 40} /> <span>USDT</span>
            </span>
          </div>

          {loading ? (
            ""
          ) : recommendation.quantity > 0 ? (
            <div className={classes.recommendBlockWrapper}>
              <Link
                className={classes.leftBlockRecommend}
                to={{
                  pathname: `/${recommendation.category}/${recommendation.link}`,
                }}
              >
                <img src={recommendation.images[0].photo} alt="photoProduct" />
              </Link>
              <Link
                className={classes.centerBlockRecommend}
                to={{
                  pathname: `/${recommendation.category}/${recommendation.link}`,
                }}
              >
                <span>Рекомендуємо</span>
                <p>{recommendation.name}</p>
              </Link>
              <div className={classes.rightBlockRecommend}>
                <span>
                  <NumberWithSpaces number={recommendation.price} /> ₴
                </span>
                <p
                  className={
                    addedRecommendation
                      ? classes.ActiveImage
                      : classes.ActiveImageSecondTime
                  }
                  onClick={() => addRecommendation()}
                >
                  {addedRecommendation ? <CheckOutlined /> : <PlusOutlined />}
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className={classes.ServicesWrapper}>
            <div
              className={`${classes.ServicesBlock} ${includeWarranty ? classes.activeService : ""}`}
            >
              <div className={classes.ServicesLeftBlock}>
                <Switch
                  disabled={product[0].quantity <= 0}
                  onChange={addWarranty}
                />
                <span className={classes.ServicesName}>
                  {product[0].services[0].name}
                </span>
              </div>
              <div className={classes.ServicesRightBlock}>
                <span className={classes.ServicesPrice}>
                  <NumberWithSpaces number={product[0].services[0].price} /> ₴
                </span>
              </div>
            </div>
            <div
              className={`${classes.ServicesBlock} ${includeService ? classes.activeService : ""}`}
            >
              <div className={classes.ServicesLeftBlock}>
                <Switch
                  disabled={product[0].quantity <= 0}
                  onChange={addService}
                />
                <span className={classes.ServicesName}>
                  {product[0].services[1].name}
                </span>
              </div>
              <div className={classes.ServicesRightBlock}>
                <span className={classes.ServicesPrice}>
                  <NumberWithSpaces number={product[0].services[1].price} /> ₴
                </span>
              </div>
            </div>
          </div>

          <button
            disabled={product[0].quantity <= 0}
            className={classes.BuyButton}
            onClick={addToBasket}
          >
            Купити
            <ShoppingFilled />
          </button>
        </div>
      </section>
    </>
  );
};

export default ProductComponent;
