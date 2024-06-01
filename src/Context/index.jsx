import { createContext, useEffect, useState } from "react";
import Api from "../API/Api";

export const ProductContext = createContext({});

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, isLoading] = useState(true);
  const [productCart, setProductCart] = useState([]);
  const [viewsHistory, setViewsHistory] = useState([]);
  const [userToken, setUserToken] = useState("false");
  const [userTokenLoaded, setUserTokenLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.getAll();
        const responseCategories = await Api.getAllCategories();
        setProducts(response.data);
        setCategories(responseCategories.data);
        isLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const savedCart = localStorage.getItem("productCart");
    if (savedCart) {
      setProductCart(JSON.parse(savedCart));
    }

    const saverHistory = localStorage.getItem("viewsHistory");
    if (saverHistory) {
      setViewsHistory(JSON.parse(saverHistory));
    }

    const userTokenId = localStorage.getItem("userToken");
    if (userTokenId) {
      setUserToken(JSON.parse(userTokenId));
      setUserTokenLoaded(true);
    } else {
      setUserTokenLoaded(true);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        productCart,
        setProductCart,
        setViewsHistory,
        viewsHistory,
        userToken,
        setUserToken,
        userTokenLoaded,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
