import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./ProductBlock.module.css";
import AvgRating from "../../../../Tools/AvgRating";
import NumberWithSpaces from "../../../../Tools/NumberWithSpaces";
import { ProductContext } from "../../../../../Context";
import { MessageFilled, ShoppingFilled } from "@ant-design/icons";
import { message } from "antd";

const ProductBlock = ({ item }) => {
  const { setProductCart } = useContext(ProductContext);
  const [messageApi, contextHolder] = message.useMessage();

  const addToCartButton = (item) => {
    messageApi.open({
      type: "success",
      content: `${item.name} успішно додано в корзину`,
    });
    setProductCart((prevProductCart) => {
      const updatedProductCart = [
        ...prevProductCart,
        {
          ...item,
          includeWarranty: "false",
          includeService: "false",
          priceWithServices: `${item.price}`,
        },
      ];
      localStorage.setItem("productCart", JSON.stringify(updatedProductCart));
      return updatedProductCart;
    });
  };

  return (
    <>
      {contextHolder}
      {item.quantity === 0 ? (
        <Link
          key={item.id}
          to={{ pathname: `/${item.category}/${item.link}` }}
          className={classes.productBlock}
          style={{ opacity: "0.7" }}
        >
          <div className={classes.topBlock}>
            <div className={classes.imageProductBlock}>
              <span className={classes.disabledProduct}>Немає в наявності</span>
              <img
                className={classes.imageProduct}
                src={`${item.images[0].photo}`}
                alt="solar panel"
              />
            </div>
          </div>
          <div className={classes.bottomBlock}>
            <div className={classes.nameProduct}>{item.name}</div>
            <span className={classes.ratingProduct}>
              <AvgRating reviews={item.reviews} />
              <p style={{ color: "gray" }}>
                <MessageFilled />
                {item.reviews.length}
              </p>
            </span>
            <div className={classes.buyAndPriceProduct}>
              <div className={classes.priceProduct}>
                <span style={{ color: "gray" }}>
                  <NumberWithSpaces number={item.price} />
                  <span style={{ color: "gray" }}>₴</span>
                </span>
                <p style={{ color: "gray" }}>
                  <NumberWithSpaces number={item.price / 40} />{" "}
                  <span>USDT</span>
                </p>
              </div>

              <button
                className={classes.buyButtonProduct}
                disabled
                onClick={(event) => {
                  event.preventDefault();
                  addToCartButton(item);
                }}
              >
                <ShoppingFilled />
              </button>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          key={item.id}
          to={{ pathname: `/${item.category}/${item.link}` }}
          className={classes.productBlock}
        >
          <div className={classes.topBlock}>
            <div className={classes.imageProductBlock}>
              {item.popular === 1 ? (
                <span className={classes.popularProduct}>Топ продажів</span>
              ) : (
                ""
              )}
              <img
                className={classes.imageProduct}
                src={`${item.images[0].photo}`}
                alt="solar panel"
              />
            </div>
          </div>
          <div className={classes.bottomBlock}>
            <div className={classes.nameProduct}>{item.name}</div>
            <span className={classes.ratingProduct}>
              {item.reviews ? (
                <>
                  <AvgRating reviews={item.reviews} />
                  <p>
                    <MessageFilled />
                    {item.reviews.length}
                  </p>
                </>
              ) : (
                <>
                  <>
                    <AvgRating reviews={[0]} />
                    <p>
                      <MessageFilled />
                      {0}
                    </p>
                  </>
                </>
              )}
            </span>
            <div className={classes.buyAndPriceProduct}>
              <div className={classes.priceProduct}>
                <span>
                  <NumberWithSpaces number={item.price} />
                  <span>₴</span>
                </span>
                <p>
                  <NumberWithSpaces number={item.price / 40} />{" "}
                  <span>USDT</span>
                </p>
              </div>

              <button
                className={classes.buyButtonProduct}
                onClick={(event) => {
                  event.preventDefault();
                  addToCartButton(item);
                }}
              >
                <ShoppingFilled />
              </button>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ProductBlock;
