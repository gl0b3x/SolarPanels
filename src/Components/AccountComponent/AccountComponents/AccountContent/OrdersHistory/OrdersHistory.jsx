import React, { useEffect, useState } from "react";
import classes from "./OrdersHistory.module.css";
import NumberWithSpaces from "../../../../Tools/NumberWithSpaces";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const OrdersHistory = ({ user }) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://1912e4188940f0c9.mokky.dev/orders?user_id=${user.user_id}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrders(data.reverse());
      } catch (error) {
        console.log("Fetch error:", error.message);
      }
    };

    if (user?.user_id) {
      fetchUser();
    }
  }, [user]);

  return (
    <section className={classes.ordersWrapper}>
      {orders ? (
        orders.length > 0 ? (
          <>
            {orders?.map((order, index) => (
              <div key={index} className={classes.order}>
                <Link to={{ pathname: `/order/${order.id}` }}>
                  <div className={classes.headerOrder}>
                    <span className={classes.numberOrder}>
                      Ваше замовлення:
                      <span> № {order.id}</span>
                    </span>
                    <span className={classes.statusOrder}>
                      Статус замовлення:
                      <span> {order.status}</span>
                    </span>
                  </div>
                  {order.items.map((item, index) => (
                    <div key={index} className={classes.productInOrder}>
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
                    </div>
                  ))}
                  <div className={classes.footerOrder}>
                    <div className={classes.time}>
                      Дата замовлення: <span>{order.time}</span>
                    </div>
                    <div className={classes.orderTotalPrice}>
                      Сума замовлення:{" "}
                      <span>
                        <NumberWithSpaces number={order.totalPrice} /> ₴
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <p className={classes.title}>У вас ще немає замовлень</p>
        )
      ) : (
        <SkeletonTheme
          baseColor="#202020"
          highlightColor="#444"
          height="90%"
          width="100%"
        >
          <Skeleton count={1} />
        </SkeletonTheme>
      )}
    </section>
  );
};

export default OrdersHistory;
