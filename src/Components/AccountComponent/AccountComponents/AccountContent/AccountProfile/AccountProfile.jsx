import React, { useEffect, useState } from "react";
import classes from "./AccountProfile.module.css";
import { ConfigProvider, DatePicker, Form, Input, InputNumber } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CountUp from "react-countup";

const AccountProfile = ({ token, user }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const parseDate = (dateString) => {
    return dateString ? moment(dateString, "DD.MM.YYYY") : null;
  };

  useEffect(() => {
    if (user && user.user) {
      form.setFieldsValue({
        phone: user.user.phone || "",
        name: user.user.userName || "",
        surname: user.user.userSurname || "",
        dateBirthday: parseDate(user.user.birthdayDate),
      });
    }
  }, [user, form]);

  const SendDataUser = async (value) => {
    setLoading(true);
    try {
      await fetch(
        `https://1912e4188940f0c9.mokky.dev/dataUsers/${user.user_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              ...user.user,
              userName: value.name,
              userSurname: value.surname,
              email: token.email,
              phone: value.phone,
              birthdayDate: value.dateBirthday
                ? value.dateBirthday.format("DD.MM.YYYY")
                : null,
            },
          }),
        },
      );
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className={classes.AccountProfileWrapper}>
      <div className={classes.leftBlock}>
        <span className={classes.NameOfForm}>Персональні дані</span>
        {loading ? (
          <>
            <SkeletonTheme
              baseColor="#202020"
              highlightColor="#444"
              height="8%"
              width="30vw"
            >
              <Skeleton count={5} style={{ marginTop: "4vh" }} />
            </SkeletonTheme>
          </>
        ) : (
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
                  colorTextPlaceholder: "rgba(132, 206, 235, 0.5)",
                },
                InputNumber: {
                  colorBgContainer: "rgb(23, 23, 23)",
                  colorBorder: "rgba(86, 128, 233, 0.5)",
                  activeBorderColor: "rgb(132, 206, 235)",
                  activeBg: "rgb(23, 23, 23)",
                  colorText: "rgb(132, 206, 235)",
                  colorTextPlaceholder: "rgba(132, 206, 235, 0.5)",
                },
                DatePicker: {
                  activeBorderColor: "rgb(132, 206, 235)",
                  activeBg: "rgb(23, 23, 23)",
                  colorBgContainer: "rgb(23, 23, 23)",
                  colorBorder: "rgba(86, 128, 233, 0.5)",
                  hoverBorderColor: "rgb(132, 206, 235)",
                  colorIcon: "rgb(132, 206, 235)",
                  colorIconHover: "rgb(132, 206, 235)",
                  colorText: "rgb(132, 206, 235)",
                  colorTextDescription: "rgb(132, 206, 235)",
                  colorTextHeading: "rgb(132, 206, 235)",
                  colorTextPlaceholder: "rgb(132, 206, 235)",
                  colorBgElevated: "rgb(23, 23, 23)",
                  colorTextDisabled: "rgba(132, 206, 235, 0.5)",
                },
              },
            }}
          >
            <Form
              form={form}
              className={classes.loginForm}
              name="infoUser"
              size="large"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={SendDataUser}
            >
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

              <p>Дата народження</p>
              <Form.Item
                name="dateBirthday"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, введіть дату Вашого дня народження",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="DD.MM.YYYY" />
              </Form.Item>

              <Form.Item>
                <button className={classes.buttonAdd}>Надіслати</button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        )}
      </div>
      <div className={classes.rightBlock}>
        <div className={classes.titleBonuses}>Бонуси</div>
        <div className={classes.bonusesWrapper}>
          <div className={classes.bonuses}>
            <span>Бонуси за покупки</span>
            <p>
              {user.bonusesBuy ? (
                <CountUp end={user.bonusesBuy} duration={1} />
              ) : (
                <>0</>
              )}
              <span>
                <GiftOutlined />
              </span>
            </p>
          </div>
          <div className={classes.bonuses}>
            <span>Акційні бонуси!</span>
            <p>
              {user.bonusesPromotion ? (
                <CountUp end={user.bonusesPromotion} duration={1} />
              ) : (
                <>0</>
              )}
              <span>
                <GiftOutlined />
              </span>
            </p>
          </div>
        </div>
        <div className={classes.rulesBonuses}>
          <div>Правила використування бонусів:</div>
          <ul>
            <li>
              5 бонусів еквівалентні 1 грн, тобто 500 бонусів дорівнюють 100
              грн.
            </li>
            <li>
              За регістрацію та на день народження Ви отримуєте 500 бонусів
            </li>
            <li>
              За кожну покупку ви отримуєте 5% бонусів від вартості замовлення.
            </li>
            <li>
              Якщо під час покупки були використані бонуси, ви отримаєте 1%
              бонусів від вартості замовлення.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AccountProfile;
