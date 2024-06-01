import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "./ProductPageComponent.module.css";
import Api from "../../API/Api";
import ProductReviewsComponent from "./ProductReviewsComponent/ProductReviewsComponent";
import ProductSpecificationsComponent from "./ProductSpecificationsComponent/ProductSpecificationsComponent";
import ProductComponent from "./ProductComponent/ProductComponent";
import ChooseInfoBlock from "./ChooseInfoMenu/ChooseInfoBlock";
import ProductReviewsComponentLoading from "./ProductReviewsComponent/ProductReviewsComponentLoading";
import ProductComponentLoading from "./ProductComponent/ProductComponentLoading";
import ProductSpecificationsComponentLoading from "./ProductSpecificationsComponent/ProductSpecificationsComponentLoading";
import PageNavigationComponent from "../PageNavigationComponent/PageNavigationComponent";

const ProductPageComponent = () => {
  const { link, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentInfo, setCurrentInfo] = useState("Product");
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Api.getProductByLink(category, link);
        if (response.data.length > 0) {
          setProduct(response.data);
          setReview(response.data[0].reviews);
          setLoading(false);
        } else {
          navigate("/error");
        }
      } catch (error) {
        navigate("/error");
      }
    };
    fetchProduct();
  }, [link, category, navigate]);

  return (
    <>
      <main className={classes.productBlockWrapper}>
        <PageNavigationComponent
          categoryName={category}
          productName={product}
          loading={loading}
        />
        <article className={classes.productBlock}>
          <ChooseInfoBlock
            category={category}
            loading={loading}
            review={review}
            setCurrentInfo={setCurrentInfo}
            currentInfo={currentInfo}
          />
          {loading ? (
            <>
              {currentInfo === "Product" ? (
                <ProductComponentLoading />
              ) : currentInfo === "Characteristics" ? (
                <ProductSpecificationsComponentLoading />
              ) : currentInfo === "Reviews" ? (
                <ProductReviewsComponentLoading />
              ) : null}
            </>
          ) : (
            <>
              {currentInfo === "Product" ? (
                <ProductComponent
                  review={review}
                  product={product}
                  setCurrentInfo={setCurrentInfo}
                />
              ) : currentInfo === "Characteristics" ? (
                <ProductSpecificationsComponent
                  review={review}
                  product={product}
                />
              ) : currentInfo === "Reviews" ? (
                <ProductReviewsComponent
                  review={review}
                  setReview={setReview}
                  product={product}
                />
              ) : null}
            </>
          )}
        </article>
      </main>
    </>
  );
};

export default ProductPageComponent;
