import React from "react";
import { Form, Select } from "antd";
import classes from "../DeliveryForm.module.css";

const PickUpInShopForm = () => {
  return (
    <>
      <Form.Item
        name="shopToPickUp"
        rules={[
          {
            required: true,
            message: "Будь ласка, виберіть зручну Вам адресу",
          },
        ]}
      >
        <Select
          defaultValue="Виберіть зручну Вам адресу"
          size="large"
          className={classes.select}
          options={[
            {
              value: "Київ, Леся Українки 10 (9:00-22:00)",
              label: "Київ, Леся Українки 10 (9:00-22:00)",
            },
            {
              value: "Київ, Тараса Шевченка 25 (9:00-22:00)",
              label: "Київ, Тараса Шевченка 25 (9:00-22:00)",
            },
            {
              value: "Львів, Центральна 23А (9:00-22:00)",
              label: "Львів, Центральна 23А (9:00-22:00)",
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item
        name="wayToPayPickUp"
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
              value: "Готівкою у магазині",
              label: "Готівкою у магазині",
            },
            {
              value: "Картою у магазині",
              label: "Картою у магазині",
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

export default PickUpInShopForm;
