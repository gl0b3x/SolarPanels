import React from "react";
import classes from "./DeliveryInfoComponent.module.css";

const DeliveryInfoComponent = () => {
  return (
    <main className={classes.deliveryWrapper}>
      <h1>Доставка і оплата</h1>
      <img
        className={classes.deliveryPhoto}
        loading="lazy"
        src="/delivery.webp"
        alt="deliveryPhoto"
      />

      <div className={classes.deliveryText}>
        <p>Оперативна доставка від магазину:</p>
        <ul>
          <li>
            Вам не треба чекати по пару днів на доставку Вашого очікуванного
            товару. Якщо Ви оформили замовлення до 16:00 - Ви отримаєте його в
            той же день
          </li>
        </ul>
        <p>Доставка товару від NovaPost або УкрПошта:</p>
        <ul>
          <li>
            Наші кур'єри швидко відправлять Вам доставку поштою в той же день,
            якщо Ви оформите замовлення до 15:00.
          </li>
        </ul>
        <p>Проста та швидка оплата:</p>
        <ul>
          <li>
            Оплачуйте карткою будь якого банку або криптовалютою USDT всього за
            декілька кліків
          </li>
        </ul>
      </div>
    </main>
  );
};

export default DeliveryInfoComponent;
