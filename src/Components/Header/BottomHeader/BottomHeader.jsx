import React, { useContext, useEffect, useState, useRef } from "react";
import { Input, Dropdown, Badge } from "antd";
import BasketModal from "../../CartModal/CartModal";
import classes from "./BottomHeader.module.css";
import { ProductContext } from "../../../Context";
import { Link } from "react-router-dom";
import { ShoppingFilled, UserOutlined, LoginOutlined } from "@ant-design/icons";
import NumberWithSpaces from "../../Tools/NumberWithSpaces";
import LoginModal from "../../AccountComponent/AuthModals/AuthModal";

const BottomHeader = () => {
  const { categories, loading, products, productCart, userToken } =
    useContext(ProductContext);
  const [visibleBasket, setVisibleBasket] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const headerDownRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const newMenuItems = categories.map((category) => ({
        key: category.id,
        label: <Link to={`/${category.link}`}>{category.name}</Link>,
      }));
      setMenuItems(newMenuItems);
    } else {
      const newMenuItems = [
        {
          key: 1,
          label: <div style={{ color: "var(--text)" }}> Loading...</div>,
        },
      ];
      setMenuItems(newMenuItems);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [categories, loading]);

  const handleClickOutside = (event) => {
    if (
      headerDownRef.current &&
      !headerDownRef.current.contains(event.target)
    ) {
      setShowSearchResult(false);
    }
  };

  return (
    <>
      <LoginModal visible={visibleLogin} setVisible={setVisibleLogin} />
      <BasketModal visible={visibleBasket} setVisible={setVisibleBasket} />
      <header ref={headerDownRef} className={classes.headerDown}>
        <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
          <div className={classes.catalog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="18px"
              height="18px"
            >
              <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z" />
            </svg>
            <span>Каталог</span>
          </div>
        </Dropdown>
        <Input
          className={`${classes.headerSearch} ${showSearchResult ? classes.activeHeaderSearch : ""}`}
          placeholder="Пошук"
          size="large"
          variant="borderless"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowSearchResult(true)}
        />

        {userToken !== "false" ? (
          <Link className={classes.userButton} to={"/account"}>
            <UserOutlined />
          </Link>
        ) : (
          <div
            className={classes.userButton}
            onClick={() => setVisibleLogin(true)}
          >
            <LoginOutlined />
          </div>
        )}

        <Badge
          count={productCart.length}
          onClick={() => setVisibleBasket(true)}
          className={classes.headerBasket}
        >
          <ShoppingFilled
            style={{ color: "var(--textHover)", height: "18px", width: "18px" }}
          />
        </Badge>
        {showSearchResult && (
          <div className={classes.resultSearch}>
            {search === "" ? (
              <div className={classes.nothingFound}>
                Напишіть, що хочете знайти
              </div>
            ) : products.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase()),
              ).length === 0 ? (
              <div className={classes.nothingFound}>Нічого не знайдено</div>
            ) : (
              products
                .filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((product) => (
                  <Link
                    onClick={() => setShowSearchResult(false)}
                    className={classes.searchProductResult}
                    to={`/${product.category}/${product.link}`}
                    key={product.id}
                  >
                    <img
                      className={classes.searchProductImage}
                      src={product.images[0].photo}
                      alt="productImage"
                    />
                    <div className={classes.searchProductInfo}>
                      <span className={classes.searchProductName}>
                        {product.name}
                      </span>
                      <span className={classes.searchProductPrice}>
                        <NumberWithSpaces number={product.price} /> ₴
                      </span>
                    </div>
                  </Link>
                ))
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default BottomHeader;
