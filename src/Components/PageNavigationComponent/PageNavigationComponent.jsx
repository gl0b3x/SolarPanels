import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { Breadcrumb, ConfigProvider } from "antd";
import { useParams } from "react-router";

const PageNavigationComponent = ({
  categoryName,
  productName,
  loading,
  orderId,
  account,
}) => {
  const { category, link } = useParams();

  if (categoryName) {
    if (categoryName === "solarpanels") {
      categoryName = "Сонячні панелі";
    } else if (categoryName === "batteries") {
      categoryName = "Аккумулятори";
    } else if (categoryName === "accessories") {
      categoryName = "Аксесуари";
    }
  }

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Breadcrumb: {
                itemColor: "rgba(132, 206, 235, 0.43)",
                linkHoverColor: "rgb(210, 244, 245)",
                linkColor: "rgba(132, 206, 235, 0.6)",
                separatorColor: "rgba(255, 255, 255, 0.45)",
                fontSize: "16px",
              },
            },
          }}
        >
          <Breadcrumb
            items={[
              {
                href: "/",
                title: (
                  <>
                    <HomeOutlined />
                  </>
                ),
              },
              categoryName
                ? {
                    href: `/${category}`,
                    title: <>{categoryName}</>,
                  }
                : {},
              account
                ? {
                    href: `/account`,
                    title: <>Особистий Кабінет</>,
                  }
                : {},
              productName
                ? {
                    href: `/${category}/${link}`,
                    title: <>{productName[0].name}</>,
                  }
                : {},
              orderId
                ? {
                    href: `/order/${orderId}`,
                    title: <>Замовлення №{orderId}</>,
                  }
                : {},
            ]}
          />
        </ConfigProvider>
      )}
    </>
  );
};

export default PageNavigationComponent;
