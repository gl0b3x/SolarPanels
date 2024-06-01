import React, { useContext, useEffect, useState } from "react";
import classes from "./CheckOutComponent.module.css";
import { ProductContext } from "../../Context";
import NumberWithSpaces from "../Tools/NumberWithSpaces";
import Api from "../../API/Api";
import { Form, message } from "antd";
import ContactsForm from "./ContactsForm/ContactsForm";
import DeliveryForm from "./DeliveryForm/DeliveryForm";
import OrderDoneComponent from "./OrderDoneComponent/OrderDoneComponent";

const CheckOutComponent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { productCart, userToken, setProductCart } = useContext(ProductContext);
  const [user, setUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalUSDTPrice, setTotalUSDTPrice] = useState(0);
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({});
  const [doneOrder, setDoneOrder] = useState(false);
  const [bonusesValue, setBonusesValue] = useState(0);
  const [userBonuses, setUserBonuses] = useState(0);

  useEffect(() => {
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

    const fetchUser = async () => {
      if (userToken?.token && userToken?.email) {
        try {
          const response = await Api.getUserInfo(
            userToken.token,
            userToken.email,
          );
          setUserBonuses(
            +response.data[0]?.bonusesPromotion + +response.data[0]?.bonusesBuy,
          );
          setUser(response.data[0]);
          form.setFieldsValue({
            name: response.data[0]?.user?.userName || "",
            phone: response.data[0]?.user?.phone || "",
            surname: response.data[0]?.user?.userSurname || "",
          });
          if (response.ok) {
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      } else {
        console.warn("No valid userToken found");
      }
    };

    fetchUser();
  }, [productCart, userToken, form]);

  function SendDataUser(values) {
    setUserData({ ...values });
    setStep(2);
  }

  const finishBuy = async (values) => {
    const filteredArray = productCart.map(
      ({
        id,
        includeService,
        includeWarranty,
        price,
        priceWithServices,
        images,
        name,
        link,
        category,
        services,
      }) => ({
        id,
        includeService,
        includeWarranty,
        price,
        priceWithServices,
        images,
        name,
        link,
        category,
        services,
      }),
    );

    try {
      const response = await fetch(
        `https://1912e4188940f0c9.mokky.dev/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
            ...values,
            status: "Прийнято",
            items: filteredArray,
            user_id: user?.user_id || "no user Id",
            userEmail: user?.email || "no email",
            time: new Date().toLocaleDateString(),
            expectedTime: new Date(
              new Date().setDate(new Date().getDate() + 1),
            ).toLocaleDateString(),
            totalPrice: totalPrice,
            usedBonuses: bonusesValue || "0",
          }),
        },
      );

      if (response.ok) {
        setDoneOrder(true);
        setProductCart([]);
        localStorage.removeItem("productCart");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    let bonusesUser = user?.bonusesBuy;
    let bonusesUserPromotion = user?.bonusesPromotion;

    let leftBonuses = bonusesValue - user?.bonusesPromotion;
    let bonusesPromotion = user?.bonusesPromotion - bonusesValue;

    if (bonusesPromotion > 0) {
      bonusesUserPromotion = bonusesPromotion;
    } else {
      bonusesUserPromotion = 0;
    }
    if (leftBonuses > 0) {
      bonusesUser = user?.bonusesBuy - leftBonuses;
      bonusesUserPromotion = 0;
    }

    if (bonusesValue > 0) {
      bonusesUser = +bonusesUser + +(totalPrice / 100).toFixed(0);
    } else {
      bonusesUser = +bonusesUser + +((totalPrice / 100) * 5).toFixed(0);
    }

    if (user?.user_id) {
      await fetch(
        `https://1912e4188940f0c9.mokky.dev/dataUsers/${user.user_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userToken.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bonusesBuy: bonusesUser,
            bonusesPromotion: bonusesUserPromotion,
          }),
        },
      );
    }
  };

  function changeStep() {
    setStep(1);
  }

  function applyBonusesForTotalPrice() {
    if (userBonuses < bonusesValue || userBonuses === 0) {
      messageApi.open({
        type: "error",
        content: `Недостатньо бонусів на рахунку`,
      });
    } else {
      setUserBonuses((prev) => prev - bonusesValue);
      setTotalPrice((prev) => prev - bonusesValue / 5);
      messageApi.open({
        type: "success",
        content: `${bonusesValue} бонусів успішно використано`,
      });
    }
  }

  if (doneOrder) {
    return <OrderDoneComponent />;
  }

  return (
    <main className={classes.checkOutWrapper}>
      {contextHolder}
      <section className={classes.title}>Оформлення замовлення</section>
      <section className={classes.contentWrapper}>
        <div className={classes.leftBlock}>
          {step === 1 ? (
            <ContactsForm
              SendDataUser={SendDataUser}
              form={form}
              user={user}
              applyBonusesForTotalPrice={applyBonusesForTotalPrice}
              bonusesValue={bonusesValue}
              setBonusesValue={setBonusesValue}
              userBonuses={userBonuses}
            />
          ) : (
            <DeliveryForm
              finishBuy={finishBuy}
              changeStep={changeStep}
              user={user}
            />
          )}
        </div>
        <div className={classes.rightBlock}>
          <div className={classes.article}>Ваше замовлення</div>
          <div className={classes.productsBlock}>
            {productCart.map((item, index) => (
              <div key={index} className={classes.productBlock}>
                <div className={classes.product}>
                  <img
                    className={classes.productImage}
                    src={item.images[0].photo}
                    alt="photoProduct"
                  />
                  <span>{item.name}</span>
                  <div className={classes.productPrice}>
                    <p className={classes.productUah}>
                      <NumberWithSpaces number={item.priceWithServices} />
                      <span> ₴</span>
                    </p>
                    <p className={classes.productUSDT}>
                      <NumberWithSpaces
                        number={(item.priceWithServices / 40).toFixed(1)}
                      />
                      <span> USDT</span>
                    </p>
                  </div>
                </div>
                {item.includeWarranty === "true" ||
                item.includeService === "true" ? (
                  <div className={classes.servicesBlock}>
                    {item.includeWarranty === "true" ? (
                      <div className={classes.service}>
                        <span>{item.services[0].name}</span>
                        <span>{item.services[0].price} ₴</span>
                      </div>
                    ) : (
                      <></>
                    )}
                    {item.includeService === "true" ? (
                      <div className={classes.service}>
                        <span>{item.services[1].name}</span>
                        <span>{item.services[1].price} ₴</span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
          <div className={classes.totalPrice}>
            <span className={classes.totalTitle}>Разом до оплати</span>
            <div>
              <p className={classes.totalUah}>
                <NumberWithSpaces number={totalPrice} />
                <span> ₴</span>
              </p>
              <p className={classes.totalUsdt}>
                <NumberWithSpaces number={totalUSDTPrice} />
                <span> USDT</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckOutComponent;
