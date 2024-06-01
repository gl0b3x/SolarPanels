import React, { useContext, useState } from "react";
import { Form, Input, ConfigProvider } from "antd";
import classes from "../AuthModal.module.css";
import { ProductContext } from "../../../../Context";

const LoginForm = ({ setWillLogin, setVisible }) => {
  const { setUserToken } = useContext(ProductContext);
  const [visibleError, setVisibleError] = useState(true);

  const onFinish = async (values) => {
    try {
      const response = await fetch("https://1912e4188940f0c9.mokky.dev/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        setUserToken(json.token);
        const tokenObject = {
          token: json.token,
          email: values.email,
        };
        localStorage.setItem("userToken", JSON.stringify(tokenObject));
        setVisible(false);
        window.location.reload();
      }
      if (!response.ok) {
        setVisibleError(false);
      }
    } catch (error) {
      console.log(error.message);
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
        <div className={classes.nameOfForm}>Увійти</div>
        <Form
          className={classes.loginForm}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <span className={classes.nameOfInput}>Email</span>
          <Form.Item
            name="email"
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
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <span hidden={visibleError} className={classes.errorSpan}>
            Неправильно введений пароль або логін!
          </span>

          <Form.Item>
            <button className={classes.buttonForm}>Увійти!</button>
          </Form.Item>
        </Form>
      </ConfigProvider>
      <div className={classes.downBlock}>
        <span>Новий користувач?</span>
        <p onClick={() => setWillLogin(false)}>Зареєструватись</p>
      </div>
    </>
  );
};

export default LoginForm;
