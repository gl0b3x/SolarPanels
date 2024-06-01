import React, { useState } from "react";
import { ConfigProvider, Form, Input, InputNumber } from "antd";
import classes from "./ContactsForm.module.css";
import { GiftOutlined } from "@ant-design/icons";

const ContactsForm = ({
  form,
  SendDataUser,
  user,
  applyBonusesForTotalPrice,
  bonusesValue,
  setBonusesValue,
  userBonuses,
}) => {
  const [useBonuses, setUseBonuses] = useState(false);

  function showInputBonuses() {
    setUseBonuses((prev) => !prev);
  }

  return (
    <>
      <span className={classes.titleForm}>Контактні дані</span>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: "rgb(132, 206, 235)",
              labelRequiredMarkColor: "rgb(132, 206, 235)",
              colorBorder: "rgb(86, 128, 233)",
              colorError: "rgb(220, 78, 78)",
            },
            Input: {
              colorBgContainer: "rgb(23, 23, 23)",
              colorBorder: "rgba(86, 128, 233, 0.5)",
              activeBorderColor: "rgb(132, 206, 235)",
              activeBg: "rgb(23, 23, 23)",
              colorText: "rgb(132, 206, 235)",
              colorIcon: "rgb(132, 206, 235)",
              colorIconHover: "rgba(204, 251, 241)",
              colorTextPlaceholder: "rgb(132, 206, 235)",
            },
            InputNumber: {
              colorBgContainer: "rgb(23, 23, 23)",
              colorBorder: "rgba(86, 128, 233, 0.5)",
              activeBorderColor: "rgb(132, 206, 235)",
              activeBg: "rgb(23, 23, 23)",
              colorText: "rgb(132, 206, 235)",
              colorTextPlaceholder: "rgba(132, 206, 235, 0.5)",
            },
          },
        }}
      >
        <Form
          form={form}
          className={classes.contactsForm}
          name="stepContacts"
          size="large"
          autoComplete="off"
          onFinish={SendDataUser}
        >
          <p>Ім'я</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message:
                  "Будь ласка, введіть ім'я довжиною від 2 до 30 символів!",
                min: 2,
                max: 30,
              },
            ]}
          >
            <Input placeholder="Ваше ім'я" />
          </Form.Item>

          <p>Прізвище</p>
          <Form.Item
            name="surname"
            rules={[
              {
                required: true,
                message:
                  "Будь ласка, введіть прізвище довжиною від 2 до 50 символів!",
                min: 2,
                max: 50,
              },
            ]}
          >
            <Input placeholder="Ваше прізвище" />
          </Form.Item>

          <p>Телефон</p>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "",
              },
              {
                validator: (_, value) =>
                  value && value.toString().length === 9
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Будь ласка, введіть коректний номер телефону!",
                        ),
                      ),
              },
            ]}
          >
            <InputNumber
              addonBefore="+380"
              maxLength="9"
              placeholder="Ваш номер телефону"
              controls={false}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <button className={classes.buttonNext}>
              Продовжити оформлення!
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
      {user?.bonusesBuy > 0 || user?.bonusesPromotion !== 0 ? (
        <div className={classes.useUserBonuses}>
          <span className={classes.bonusesUser}>
            У вас є : {userBonuses} бонусів{" "}
            <span>
              <GiftOutlined />
            </span>
          </span>
          <span className={classes.useBonuses} onClick={showInputBonuses}>
            Використати бонуси!
          </span>
          {useBonuses ? (
            <div className={classes.bonuseApply}>
              <ConfigProvider
                theme={{
                  components: {
                    InputNumber: {
                      colorBgContainer: "rgb(23, 23, 23)",
                      colorBorder: "rgba(86, 128, 233, 0.5)",
                      activeBorderColor: "rgb(132, 206, 235)",
                      activeBg: "rgb(23, 23, 23)",
                      colorText: "rgb(132, 206, 235)",
                      colorTextPlaceholder: "rgba(132, 206, 235, 0.5)",
                    },
                  },
                }}
              >
                <InputNumber
                  placeholder="Введіть кількість бонусів"
                  controls={false}
                  max={userBonuses}
                  style={{ width: "60%", height: "100%", fontSize: "18px" }}
                  value={bonusesValue}
                  onChange={setBonusesValue}
                />
              </ConfigProvider>
              <button
                onClick={applyBonusesForTotalPrice}
                className={classes.buttonUseBonuses}
              >
                Використати
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContactsForm;
