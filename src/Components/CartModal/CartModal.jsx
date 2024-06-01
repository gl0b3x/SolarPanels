import React, { useContext, useEffect, useState } from "react";
import classes from "./CartModal.module.css";
import { ProductContext } from "../../Context";
import NumberWithSpaces from "../Tools/NumberWithSpaces";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message } from "antd";

const CartModal = ({ visible, setVisible }) => {
  const { productCart, setProductCart } = useContext(ProductContext);

  const rootClasses = [classes.BasketModal];
  const [empty, setEmpty] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [totalPrice, setTotalPrice] = useState();
  const [totalUSDTPrice, setTotalUSDTPrice] = useState();

  useEffect(() => {
    productCart.length > 0 ? setEmpty(false) : setEmpty(true);
    setTotalPrice(
      productCart.reduce(
        (accumulator, currentItem) =>
          parseFloat(accumulator) + parseFloat(currentItem.priceWithServices),
        0,
      ),
    );
    setTotalUSDTPrice(
      productCart.reduce(
        (accumulator, currentItem) =>
          parseFloat(accumulator) + parseFloat(currentItem.priceWithServices),
        0,
      ) / 40,
    );
  }, [productCart]);

  if (visible) {
    rootClasses.push(classes.active);
  }

  function closeModal() {
    setVisible(false);
  }

  const removeFromCart = (index) => {
    messageApi.open({
      type: "error",
      content: `Товар успішно видалено з корзини`,
    });
    const updatedCart = [...productCart];
    updatedCart.splice(index, 1);
    setProductCart(updatedCart);
    localStorage.setItem("productCart", JSON.stringify(updatedCart));
  };

  const removeServiceOrWarranty = (index, type) => {
    const updatedProductCart = [...productCart];
    const selectedItem = updatedProductCart[index];

    if (type === "warranty") {
      selectedItem.includeWarranty = "false";
      selectedItem.priceWithServices =
        selectedItem.priceWithServices - selectedItem.services[0].price;
    } else if (type === "service") {
      selectedItem.includeService = "false";
      selectedItem.priceWithServices =
        selectedItem.priceWithServices - selectedItem.services[1].price;
    }

    updatedProductCart[index] = selectedItem;
    setProductCart(updatedProductCart);
    localStorage.setItem("productCart", JSON.stringify(updatedProductCart));
  };

  const addServiceOrWarranty = (index, type) => {
    const updatedProductCart = [...productCart];
    const selectedItem = updatedProductCart[index];

    if (type === "warranty") {
      selectedItem.includeWarranty = "true";
      selectedItem.priceWithServices =
        parseFloat(selectedItem.priceWithServices) +
        parseFloat(selectedItem.services[0].price);
    } else if (type === "service") {
      selectedItem.includeService = "true";
      selectedItem.priceWithServices =
        parseFloat(selectedItem.priceWithServices) +
        parseFloat(selectedItem.services[1].price);
    }

    updatedProductCart[index] = selectedItem;
    setProductCart(updatedProductCart);
    localStorage.setItem("productCart", JSON.stringify(updatedProductCart));
  };

  return (
    <>
      {contextHolder}
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
        <div
          className={classes.BasketModalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={classes.BasketText}>
            <h1>Корзина</h1>
            <button onClick={closeModal}>
              <CloseOutlined />
            </button>
          </div>
          <div className={classes.Product}>
            {empty ? (
              <div style={{ fontSize: "20px" }}> У корзині немає товарів.</div>
            ) : (
              productCart.map((item, index) => (
                <div key={index} className={classes.productWrapper}>
                  <div className={classes.productInfoWraper}>
                    <div className={classes.leftBlock}>
                      <div>
                        <img
                          className={classes.productImage}
                          src={item.images[0].photo}
                          alt="photoProduct"
                        />
                      </div>
                      <Link
                        to={`/${item.category}/${item.link}`}
                        className={classes.productName}
                        onClick={closeModal}
                      >
                        {" "}
                        {item.name}
                      </Link>
                    </div>
                    <div className={classes.rightBlock}>
                      <div className={classes.productPrice}>
                        <span className={classes.productPriceUah}>
                          <NumberWithSpaces number={item.priceWithServices} />
                          <span> ₴</span>
                        </span>
                        <span className={classes.productPriceUsdt}>
                          <NumberWithSpaces
                            number={item.priceWithServices / 40}
                          />
                          <span> USDT</span>
                        </span>
                      </div>
                      <span
                        className={classes.buttonDeleteItem}
                        onClick={() => removeFromCart(index)}
                      >
                        <CloseOutlined />
                      </span>
                    </div>
                  </div>
                  <div className={classes.productServicesWrapper}>
                    <span className={classes.ServiceTitle}>
                      Ваш товар потребує підтримки
                    </span>
                    {item.includeWarranty === "true" ? (
                      <div className={classes.activeService}>
                        <span>{item.services[0].name}</span>
                        <span>
                          <NumberWithSpaces number={item.services[0].price} />{" "}
                          <span> ₴</span>
                          <span
                            className={classes.buttonDeleteItem}
                            onClick={() =>
                              removeServiceOrWarranty(index, "warranty")
                            }
                          >
                            <DeleteOutlined />
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className={classes.notActiveService}>
                        <span>{item.services[0].name}</span>
                        <span>
                          <NumberWithSpaces number={item.services[0].price} />{" "}
                          <span> ₴</span>
                          <span
                            className={classes.buttonDeleteItem}
                            onClick={() =>
                              addServiceOrWarranty(index, "warranty")
                            }
                          >
                            <PlusOutlined />
                          </span>
                        </span>
                      </div>
                    )}
                    {item.includeService === "true" ? (
                      <div className={classes.activeService}>
                        <span>{item.services[1].name}</span>
                        <span>
                          <NumberWithSpaces number={item.services[1].price} />
                          <span> ₴</span>
                          <span
                            className={classes.buttonDeleteItem}
                            onClick={() =>
                              removeServiceOrWarranty(index, "service")
                            }
                          >
                            <DeleteOutlined />
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className={classes.notActiveService}>
                        <span>{item.services[1].name}</span>
                        <span>
                          <NumberWithSpaces number={item.services[1].price} />
                          <span> ₴</span>
                          <span
                            className={classes.buttonDeleteItem}
                            onClick={() =>
                              addServiceOrWarranty(index, "service")
                            }
                          >
                            <PlusOutlined />
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <hr
            width="100%"
            size="2"
            color="#ccfbf1"
            style={{ opacity: "0.2", marginTop: "2vh" }}
          />
          {empty ? (
            <div onClick={closeModal} className={classes.Back}>
              <Link to={"/solarpanels"}>Перейти до каталогу</Link>
            </div>
          ) : (
            <>
              <div className={classes.count}>
                <span className={classes.titleCount}>Всього у кошику:</span>

                <div className={classes.countPrice}>
                  <span className={classes.AllPrice}>
                    <NumberWithSpaces number={totalPrice} />
                    <span>₴</span>
                  </span>
                  <span className={classes.AllPriceUsdt}>
                    <NumberWithSpaces number={totalUSDTPrice} />
                    <span> USDT</span>
                  </span>
                </div>
              </div>
              <hr
                width="100%"
                size="2"
                color="#ccfbf1"
                style={{ opacity: "0.2" }}
              />
              <div className={classes.makePurchase}>
                <Link to={"/checkout"}>Оформити покупку</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
