import React, { useEffect, useState } from "react";
import classes from "../ProductsAndFilters.module.css";
import ProductBlock from "./CategoryContentComponents/ProductBlock/ProductBlock";
import FiltersLeftSide from "./CategoryContentComponents/FilterLeftSide/FiltersLeftSide";
import { motion } from "framer-motion";
import { ConfigProvider, Pagination } from "antd";

const CategoryContent = ({ products, category }) => {
  const [producerArray, setProducerArray] = useState([]);
  const [capacityArray, setCapacityArray] = useState([]);
  const [countryArray, setCountryArray] = useState([]);
  const [typeArray, setTypeArray] = useState([]);
  const [powerArray, setPowerArray] = useState([]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsQuantity, setItemsQuantity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const filtered = products.filter((item) => {
      const producerFilter =
        producerArray.length > 0 ? producerArray.includes(item.producer) : true;
      const capacityFilter =
        capacityArray.length > 0 ? capacityArray.includes(item.capacity) : true;
      const countryFilter =
        countryArray.length > 0 ? countryArray.includes(item.country) : true;
      const powerFilter =
        powerArray.length > 0 ? powerArray.includes(item.power) : true;
      const typeFilter =
        typeArray.length > 0 ? typeArray.includes(item.type) : true;

      return (
        producerFilter &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1] &&
        capacityFilter &&
        powerFilter &&
        countryFilter &&
        typeFilter
      );
    });

    setFilteredProducts(filtered);
    setItemsQuantity(filtered.length);
    setCurrentPage(1); // Reset to first page on filter change
  }, [
    producerArray,
    capacityArray,
    powerArray,
    priceRange,
    products,
    countryArray,
    typeArray,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <section className={classes.categoryContent}>
        <div className={classes.filtersBlock}>
          {category === "batteries" ? (
            <FiltersLeftSide
              products={products}
              setPriceRange={setPriceRange}
              setProducerArray={setProducerArray}
              setCapacityArray={setCapacityArray}
              itemsQuantity={itemsQuantity}
              setPowerArray={setPowerArray}
              setTypeArray={setTypeArray}
            />
          ) : category === "solarpanels" ? (
            <FiltersLeftSide
              products={products}
              setPriceRange={setPriceRange}
              setProducerArray={setProducerArray}
              setCountryArray={setCountryArray}
              setPowerArray={setPowerArray}
              itemsQuantity={itemsQuantity}
            />
          ) : category === "accessories" ? (
            <FiltersLeftSide
              products={products}
              setPriceRange={setPriceRange}
              setProducerArray={setProducerArray}
              setCountryArray={setCountryArray}
              setPowerArray={setPowerArray}
              itemsQuantity={itemsQuantity}
            />
          ) : (
            <></>
          )}
        </div>
        <div className={classes.productsBlock}>
          {paginatedProducts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              animate={{ opacity: 1 }}
            >
              <ProductBlock key={item.id} item={item} />
            </motion.div>
          ))}
        </div>
      </section>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "rgb(132, 206, 235)",
              colorBorder: "rgb(86, 128, 233)",
              colorText: "rgb(210, 244, 245)",
            },
          },
        }}
      >
        {itemsQuantity > 11 ? (
          <Pagination
            className={classes.Pagination}
            total={itemsQuantity}
            pageSize={pageSize}
            current={currentPage}
            onChange={handlePageChange}
          />
        ) : (
          <></>
        )}
      </ConfigProvider>
    </>
  );
};

export default CategoryContent;
