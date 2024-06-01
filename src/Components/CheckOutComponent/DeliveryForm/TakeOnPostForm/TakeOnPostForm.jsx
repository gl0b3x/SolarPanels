import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import classes from "../DeliveryForm.module.css";

const TakeOnPostForm = () => {
  const [wayToPay, setwayToPay] = useState("CashOnDelivery");

  return (
    <>
      <Form.Item
        name="cityPost"
        rules={[
          {
            required: true,
            message: "Будь ласка, напишіть місто доставки",
          },
        ]}
      >
        <Input placeholder="Місто доставки" />
      </Form.Item>
      <Form.Item
        name="numberPost"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть номер відділення",
            min: 3,
          },
        ]}
      >
        <Input placeholder="Номер Вашого відділення" />
      </Form.Item>
      <Form.Item
        name="wayToPayPost"
        rules={[
          {
            required: true,
            message: "Будь ласка, виберіть зручний спосіб оплати",
          },
        ]}
      >
        <Select
          defaultValue="Виберіть зручний спосіб оплати"
          size="large"
          className={classes.select}
          onChange={(value) => setwayToPay(value)}
          options={[
            {
              value: "Накладенний платіж",
              label: "Накладенний платіж",
            },
            {
              value: "Картою на сайті",
              label: "Картою на сайті",
            },
            {
              value: "Перевод у криптовалюті",
              label: "Перевод у криптовалюті",
            },
          ]}
        ></Select>
      </Form.Item>
      {wayToPay === "CashOnDelivery" ? (
        <Form.Item>
          <button className={classes.buttonFinish}>
            Закінчити оформлення!
          </button>
        </Form.Item>
      ) : (
        <Form.Item>
          <button className={classes.buttonFinish}>До оплати!</button>
        </Form.Item>
      )}
    </>
  );
};

export default TakeOnPostForm;
