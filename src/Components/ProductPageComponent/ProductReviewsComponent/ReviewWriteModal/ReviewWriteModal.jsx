import React, { useContext, useEffect } from "react";
import classes from "./ReviewWriteModal.module.css";
import { ConfigProvider, Form, Input, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ProductContext } from "../../../../Context";
import Api from "../../../../API/Api";

const ReviewWriteModal = ({ visible, setVisible, product = [] }) => {
  const [form] = Form.useForm();
  const { userToken } = useContext(ProductContext);
  const rootClasses = [classes.writeReviewModal];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Api.getUserInfo(
          userToken.token,
          userToken.email,
        );

        if (response) {
          form.setFieldsValue({
            name: response.data[0].user.userName || "",
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, [userToken, form]);

  const onFinish = async (value) => {
    const formattedDate = new Date().toISOString().slice(0, 10);
    const userReviews = {
      ...value,
      product: product[0].name,
      date: formattedDate,
    };
    try {
      await fetch(
        `https://1912e4188940f0c9.mokky.dev/products/${product[0].id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviews: [...product[0].reviews, userReviews],
          }),
        },
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      window.location.reload();
    }
  };

  if (visible) {
    rootClasses.push(classes.active);
  }

  function closeModal() {
    setVisible(false);
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={rootClasses.join(" ")} onClick={closeModal}>
        <div
          className={classes.reviewModalContent}
          onClick={handleContentClick}
        >
          <span className={classes.reviewUserText}>
            Написати відгук до товару:
          </span>
          <span className={classes.reviewNameProduct}>
            {product[0] ? product[0].name : "Невідомий продукт"}
          </span>
          <ConfigProvider
            theme={{
              components: {
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
            <Form
              form={form}
              className={classes.reviewUser}
              name="reviewUser"
              onFinish={onFinish}
            >
              <label className={classes.labelRate}>Ваше ім'я:</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, введіть Ваше ім'я!",
                  },
                ]}
              >
                <Input
                  placeholder="Ваше ім'я"
                  className={classes.inputHolder}
                />
              </Form.Item>
              <label className={classes.labelRate}>Ваш відгук:</label>
              <Form.Item
                name="review"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, введіть відгук!",
                  },
                ]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <label className={classes.labelRate}>Кількість зірок:</label>
              <Form.Item
                name="rating"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, виберіть Вашу оцінку!",
                  },
                ]}
              >
                <Rate className="custom-rate" allowHalf />
              </Form.Item>
              <Form.Item>
                <button className={classes.addReviewButton}>
                  Додати відгук!
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default ReviewWriteModal;
