import React from "react";
import classes from "./OrderDoneComponent.module.css";
import { Link } from "react-router-dom";

const OrderDoneComponent = () => {
  return (
    <main className={classes.wrapperDone}>
      <p className={classes.title}>Ваше замовлення майже готово!</p>
      <p className={classes.thanks}>
        Дякуємо за вибір нашої компанії!
        <p>
          Ваше замовлення було успішно оформлено, очікуйте дзвінка від нашого
          менеджера!
        </p>
      </p>
      <div className={classes.warning}>
        <h3 className={classes.warningTitle}>Важливі примітки:</h3>
        <ul>
          <li>
            <strong>Статус замовлення:</strong> Ви можете дізнатись у своєму
            кабінеті або по номеру телефона гарячої лінії
          </li>
          <li>
            <strong>Перевірка замовлення:</strong> Будь ласка, перевірте ваше
            замовлення перед підписанням документів про отримання.
          </li>
          <li>
            <strong>Повернення та обмін:</strong> Якщо ви хочете повернути або
            обміняти товар, зверніться до нашого відділу підтримки клієнтів
            протягом 14 днів після отримання.
          </li>
          <li>
            <strong>Послуги та гарантія:</strong> Протягом робочого дня наш
            менеджер зв'яжеться з вами, щоб уточнити всі деталі щодо наданих
            послуг. Якщо ви оформили додаткову гарантію, ви отримаєте
            гарантійний талон вже з урахуванням цієї додаткової гарантії.
          </li>
          <li>
            <strong>Підтримка:</strong> Якщо у вас виникли будь-які питання або
            потрібна допомога, звертайтесь до нашої служби підтримки за номером
            <Link className={classes.link} to={"tel:+380000000000"}>
              {" "}
              +38 000 000 00 00
            </Link>{" "}
            або пишіть на{" "}
            <Link className={classes.link} to={"mailto:site@gmail.com"}>
              {" "}
              site@gmail.com
            </Link>
          </li>
        </ul>
      </div>
      <span className={classes.thanksCompany}>
        Щиро дякуємо за вашу довіру!
        <p>З найкращими побажаннями, Команда Energy Solar</p>
      </span>
    </main>
  );
};

export default OrderDoneComponent;
