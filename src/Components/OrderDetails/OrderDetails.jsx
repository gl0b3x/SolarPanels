import React, { useContext, useEffect, useState } from "react";
import Api from "../../API/Api";
import classes from "./OrderDetails.module.css";
import PageNavigationComponent from "../PageNavigationComponent/PageNavigationComponent";
import NumberWithSpaces from "../Tools/NumberWithSpaces";
import { Link } from "react-router-dom";
import { Steps, ConfigProvider } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ProductContext } from "../../Context";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const OrderDetails = ({ orderId }) => {
  const { userToken } = useContext(ProductContext);
  const [orderInfo, setOrderInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusWayOrder, setStatusWayOrder] = useState({});
  const navigate = useNavigate();

  const STATUSES = {
    Почта: [
      "Прийнято",
      "В обробці",
      "Відправлено",
      "В дорозі",
      "Прибув на пошту",
      "Отримано",
    ],
    Самовивіз: ["Прийнято", "В обробці", "Готово до видачі", "Отримано"],
    Доставка: [
      "Прийнято",
      "В обробці",
      "Передано кур'єру",
      "В дорозі",
      "Отримано",
    ],
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await Api.getOrderById(orderId);
        const order = response?.data[0];

        if (order && order.userEmail === userToken?.email) {
          setOrderInfo(order);
          setLoading(false);

          if (order.deliveryWay && STATUSES[order.deliveryWay]) {
            const items = STATUSES[order.deliveryWay].map((title) => ({
              title,
            }));
            setStatusWayOrder({ items });
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, navigate, userToken]);

  const getStatusIndex = (status) => {
    const { deliveryWay } = orderInfo;
    return deliveryWay && STATUSES[deliveryWay]
      ? STATUSES[deliveryWay].indexOf(status)
      : 0;
  };

  return (
    <main className={classes.OrderDetailedWrapper}>
      <PageNavigationComponent
        account={true}
        orderId={orderId}
        loading={loading}
      />
      <section className={classes.orderBlock}>
        <div className={classes.leftBlock}>
          <span className={classes.title}>Товари у замовленні №{orderId} </span>
          {loading ? (
            <>
              <div className={classes.orderFilling}>
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className={classes.productInOrder}>
                    <SkeletonTheme
                      baseColor="#202020"
                      highlightColor="#444"
                      height="70px"
                      width="37vw"
                    >
                      <Skeleton count={1} />
                    </SkeletonTheme>
                  </div>
                ))}
              </div>
              <div className={classes.totalPriceOrder}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="20px"
                  width="40vw"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
            </>
          ) : (
            <>
              <motion.div
                className={classes.orderFilling}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {orderInfo.items.map((item, index) => (
                  <Link
                    key={index}
                    className={classes.productInOrder}
                    to={`/${item.category}/${item.link}`}
                  >
                    <img
                      className={classes.photoProduct}
                      src={item.images[0].photo}
                      alt={item.name}
                    />
                    <div className={classes.nameProduct}>{item.name}</div>
                    {item.includeWarranty === "true" ||
                    item.includeService === "true" ? (
                      <div className={classes.servicesBlock}>
                        {item.includeWarranty === "true" ? (
                          <span>
                            + {item.services[0].name}
                            <span className={classes.servicePrice}>
                              {item.services[0].price}
                              <span> ₴</span>
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                        {item.includeService === "true" ? (
                          <span>
                            + {item.services[1].name}
                            <span className={classes.servicePrice}>
                              {item.services[1].price}
                              <span> ₴</span>
                            </span>
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    <span className={classes.productPrice}>
                      <NumberWithSpaces number={item.priceWithServices} />
                      <span> ₴</span>
                    </span>
                  </Link>
                ))}
              </motion.div>
              <div className={classes.totalPriceOrder}>
                <motion.span
                  className={classes.totalPriceText}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  Використано бонусів:{" "}
                  <span>
                    {" "}
                    <NumberWithSpaces number={orderInfo.usedBonuses} />{" "}
                    <GiftOutlined />
                  </span>
                </motion.span>
                <motion.span
                  className={classes.totalPriceText}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  Сума замовлення:{" "}
                  <span>
                    <NumberWithSpaces number={orderInfo.totalPrice} /> ₴
                  </span>
                </motion.span>
              </div>
            </>
          )}
        </div>
        <div className={classes.rightBlock}>
          <span className={classes.title}>
            Детальна інформація про замовлення
          </span>
          {loading ? (
            <div className={classes.statusFilling}>
              <div className={classes.timeDelivery}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="50px"
                  width="24vw"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
              <div className={classes.statusOrder}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="200px"
                  width="24vw"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
              <div className={classes.deliveryDetails}>
                <SkeletonTheme
                  baseColor="#202020"
                  highlightColor="#444"
                  height="200px"
                  width="24vw"
                >
                  <Skeleton count={1} />
                </SkeletonTheme>
              </div>
            </div>
          ) : (
            <>
              <div className={classes.statusFilling}>
                <motion.div
                  className={classes.timeDelivery}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <p>
                    Дата замовлення: <span>{orderInfo.time} </span>
                  </p>
                  <p>
                    Очікувана дата доставки:{" "}
                    <span>{orderInfo.expectedTime}</span>
                  </p>
                </motion.div>
                <motion.div
                  className={classes.statusOrder}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <span className={classes.title}>Статус замовлення</span>
                  <ConfigProvider
                    theme={{
                      components: {
                        Steps: {
                          colorText: "rgb(132, 206, 235)",
                          colorPrimary: "rgb(210, 244, 245)",
                          colorTextDescription: "rgba(132, 206, 235, 0.7)",
                          colorSplit: "rgba(45, 45, 45, 0.6)",
                          fontSizeLG: 18,
                        },
                      },
                    }}
                  >
                    <Steps
                      progressDot
                      direction="vertical"
                      current={getStatusIndex(orderInfo.status)}
                      items={statusWayOrder.items}
                    />
                  </ConfigProvider>
                </motion.div>
                <motion.div
                  className={classes.deliveryDetails}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <p>
                    Метод доставки: <span> {orderInfo.deliveryWay} </span>
                  </p>
                  {orderInfo.deliveryWay === "Самовивіз" ? (
                    <>
                      <p>
                        Магазин: <span> {orderInfo.shopToPickUp} </span>
                      </p>
                      <p>
                        Спосіб оплати: <span> {orderInfo.wayToPayPickUp} </span>
                      </p>
                    </>
                  ) : orderInfo.deliveryWay === "Доставка" ? (
                    <>
                      <p>
                        Місто доставки: <span>{orderInfo.cityToDelivery} </span>
                      </p>
                      <p>
                        Адреса доставки:{" "}
                        <span>
                          {" "}
                          {orderInfo.AdressToDelivery}{" "}
                          {orderInfo.NumberToDelivery}{" "}
                        </span>
                      </p>
                      <p>
                        Номер під'їзду або інша інформація:{" "}
                        <span> {orderInfo.frontDoor} </span>
                      </p>
                      <p>
                        Спосіб оплати:{" "}
                        <span> {orderInfo.wayToPayDelivery} </span>
                      </p>
                    </>
                  ) : orderInfo.deliveryWay === "Почта" ? (
                    <>
                      <p>
                        Місто доставки: <span> {orderInfo.cityPost}</span>
                      </p>
                      <p>
                        Номер відділення: <span>{orderInfo.numberPost}</span>
                      </p>
                      <p>
                        Спосіб оплати: <span>{orderInfo.wayToPayPost}</span>
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  <p>
                    Кількість отриманих бонусів:{" "}
                    <span>
                      {orderInfo.usedBonuses === 0 ? (
                        <NumberWithSpaces
                          number={((orderInfo.totalPrice / 100) * 5).toFixed(0)}
                        />
                      ) : (
                        <NumberWithSpaces
                          number={(orderInfo.totalPrice / 100).toFixed(0)}
                        />
                      )}
                    </span>{" "}
                    <GiftOutlined />
                  </p>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
