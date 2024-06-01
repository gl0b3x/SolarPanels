import React, { useContext, useState } from "react";
import { Form, Input, ConfigProvider } from "antd";
import classes from "../AuthModal.module.css";
import { ProductContext } from "../../../../Context";

const RegisterForm = ({ setWillLogin, setVisible }) => {
  const { setUserToken } = useContext(ProductContext);
  const [visibleError, setVisibleError] = useState(true);
  const [visibleErrorPassword, setVisibleErrorPassword] = useState(true);

  const onFinish = async (values) => {
    if (values.password === values.passwordRepeat) {
      const response = await fetch(
        "https://1912e4188940f0c9.mokky.dev/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: values.username,
            email: values.mail,
            password: values.password,
          }),
        },
      );

      /* eslint-disable no-unused-vars */
      if (response.ok) {
        const json = await response.json();
        setUserToken(json.token);
        const res = await fetch(
          "https://1912e4188940f0c9.mokky.dev/dataUsers",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${json.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.mail,
              bonusesBuy: "0",
              bonusesPromotion: "500",
            }),
          },
        );

        const tokenObject = {
          token: json.token,
          email: values.mail,
        };
        localStorage.setItem("userToken", JSON.stringify(tokenObject));
        setVisible(false);
        window.location.reload();
      }

      if (!response.ok) {
        setVisibleError(false);
      }
    } else {
      setVisibleErrorPassword(false);
    }
  };

  return (
    <>
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
              colorTextPlaceholder: "rgb(132, 206, 235, 0.5)",
            },
          },
        }}
      >
        <div className={classes.nameOfForm}>Зареєструватись</div>
        <Form
          className={classes.loginForm}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <span className={classes.nameOfInput}>Ваше ім'я</span>
          <Form.Item
            name="username"
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

          <span className={classes.nameOfInput}>Пошта</span>
          <Form.Item
            name="mail"
            rules={[
              {
                required: true,
                message: "",
              },
              {
                type: "email",
                message: "Будь ласка, введіть дійсну пошту!",
              },
              {
                min: 3,
                message: "Пошта повинна містити принаймні 3 символи!",
              },
              {
                max: 50,
                message: "Пошта не повинна перевищувати 50 символів!",
              },
            ]}
          >
            <Input placeholder="Ваша пошта" />
          </Form.Item>

          <span className={classes.nameOfInput}>Пароль</span>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть пароль!",
              },
              {
                min: 6,
                message: "Пароль повинен містити принаймні 6 символів!",
              },
              {
                max: 20,
                message: "Пароль не повинен перевищувати 20 символів!",
              },
            ]}
          >
            <Input.Password
              onChange={() => setVisibleErrorPassword(true)}
              placeholder="Пароль"
            />
          </Form.Item>

          <span className={classes.nameOfInput}>Підтвердіть Ваш пароль</span>
          <Form.Item
            name="passwordRepeat"
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть пароль!",
              },
              {
                min: 6,
                message: "Пароль повинен містити принаймні 6 символів!",
              },
              {
                max: 20,
                message: "Пароль не повинен перевищувати 20 символів!",
              },
            ]}
          >
            <Input.Password
              onChange={() => setVisibleErrorPassword(true)}
              placeholder="Повторіть Ваш пароль"
            />
          </Form.Item>

          <span hidden={visibleError} className={classes.errorSpan}>
            Користувач з такою поштою вже існує!
          </span>

          <span hidden={visibleErrorPassword} className={classes.errorSpan}>
            Ви ввели не однакові паролі!
          </span>

          <Form.Item>
            <button className={classes.buttonForm}>Зареєструватись</button>
          </Form.Item>
        </Form>
      </ConfigProvider>
      <div className={classes.downBlock}>
        <span>Вже зареєстровані?</span>
        <p onClick={() => setWillLogin(true)}>Увійти</p>
      </div>
    </>
  );
};

export default RegisterForm;
