import React, { useState } from "react";
import { ConfigProvider, Form, Select } from "antd";
import classes from "./DeliveryForm.module.css";
import PickUpInShopForm from "./PickUpInShopForm/PickUpInShopForm";
import DeliveryToAdressForm from "./DeliveryToAdressForm/DeliveryToAdressForm";
import TakeOnPostForm from "./TakeOnPostForm/TakeOnPostForm";

const DeliveryForm = ({ finishBuy, changeStep, user }) => {
  const [selectedWay, setSelectedWay] = useState("");

  function changeWay(value) {
    setSelectedWay(value);
  }

  return (
    <>
      <span className={classes.titleForm}>Дані для доставки</span>
      <div className={classes.formDeliveryWrapper}>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorBorder: "rgb(86, 128, 233)",
                colorBgContainer: "rgb(16, 16, 16)",
                colorTextDescription: "rgb(255, 245, 245)",
                colorTextPlaceholder: "rgb(132, 206, 235,)",
                colorPrimaryHover: "rgb(210, 244, 245)",
                colorBgElevated: "rgb(16, 16, 16)",
                colorText: "rgb(132, 206, 235)",
              },
              Input: {
                colorBgContainer: "rgb(23, 23, 23)",
                colorBorder: "rgb(86, 128, 233)",
                activeBorderColor: "rgb(132, 206, 235)",
                activeBg: "rgb(23, 23, 23)",
                colorText: "rgb(132, 206, 235)",
                colorTextPlaceholder: "rgb(132, 206, 235, 0.5)",
              },
            },
          }}
        >
          <Form
            name="stepDelivery"
            size="large"
            autoComplete="off"
            className={classes.formDelivery}
            onFinish={finishBuy}
          >
            <Form.Item
              name="deliveryWay"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                onChange={changeWay}
                defaultValue="Виберіть метод доставки"
                size="large"
                className={classes.select}
                options={[
                  {
                    value: "Самовивіз",
                    label: "Самовивіз",
                  },
                  {
                    value: "Доставка",
                    label: "Доставка",
                  },
                  {
                    value: "Почта",
                    label: "Почта",
                  },
                ]}
              ></Select>
            </Form.Item>
            {selectedWay === "Самовивіз" ? (
              <>
                <PickUpInShopForm />
              </>
            ) : selectedWay === "Доставка" ? (
              <>
                <DeliveryToAdressForm />
              </>
            ) : selectedWay === "Почта" ? (
              <>
                <TakeOnPostForm />
              </>
            ) : (
              <></>
            )}
          </Form>
        </ConfigProvider>
        <button className={classes.buttonPrev} onClick={changeStep}>
          Назад!
        </button>
      </div>
    </>
  );
};

export default DeliveryForm;
