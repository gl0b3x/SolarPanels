import React from "react";
import { Form, Input, Select } from "antd";
import classes from "../DeliveryForm.module.css";

const DeliveryToAdressForm = () => {
  return (
    <>
      <Form.Item
        name="cityToDelivery"
        rules={[
          {
            required: true,
            message: "Будь ласка, виберіть місто доставки",
          },
        ]}
      >
        <Select
          defaultValue="Виберіть Ваше місто"
          size="large"
          className={classes.select}
          options={[
            {
              value: "Київ",
              label: "Київ",
            },
            {
              value: "Львів",
              label: "Львів",
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item
        name="AdressToDelivery"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть Вашу адресу",
            min: 3,
          },
        ]}
      >
        <Input placeholder="Ваша адреса" />
      </Form.Item>
      <Form.Item
        name="NumberToDelivery"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть номер вашого будинку",
          },
        ]}
      >
        <Input placeholder="Номер будинку" />
      </Form.Item>
      <Form.Item
        name="frontDoor"
        rules={[
          {
            required: true,
            message: "Будь ласка, введіть номер вашого під'їзду",
          },
        ]}
      >
        <Input placeholder="Номер під'їзду або інша інформація" />
      </Form.Item>
      <Form.Item
        name="wayToPayDelivery"
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
          options={[
            {
              value: "Готівкою при отриманні",
              label: "Готівкою при отриманні",
            },
            {
              value: "Картою при отриманні",
              label: "Картою при отриманні",
            },
            {
              value: "Перевод у криптовалюті",
              label: "Перевод у криптовалюті",
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item>
        <button className={classes.buttonFinish}>Закінчити оформлення!</button>
      </Form.Item>
    </>
  );
};

export default DeliveryToAdressForm;
