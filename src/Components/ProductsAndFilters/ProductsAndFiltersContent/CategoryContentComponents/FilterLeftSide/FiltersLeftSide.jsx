import React, { useEffect, useState } from "react";
import classes from "./FilterLeftSide.module.css";
import { Slider } from "antd";
import NumberWithSpaces from "../../../../Tools/NumberWithSpaces";

const FiltersLeftSide = ({
  products,
  setPriceRange,
  setProducerArray,
  setPowerArray,
  setCapacityArray,
  itemsQuantity,
  setCountryArray,
  setTypeArray,
}) => {
  const [sliderValue, setSliderValue] = useState([1, 5]);
  const [capacityList, setCapacityList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [producerList, setProducerList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [powerList, setPowerList] = useState([]);
  const [sliderMin, setSliderMin] = useState();
  const [sliderMax, setSliderMax] = useState();
  const [showFiltres, setShowFiltres] = useState(true);
  const [visibleButton, setVisibleButton] = useState(false);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setPriceRange(value);
  };

  useEffect(() => {
    if (setCapacityArray) {
      const capacities = [];

      products.forEach((item) => {
        const capacity = item.characteristics.find(
          (char) => char.name === "Ємність, (А*год)",
        );
        if (capacity && !capacities.includes(capacity.value)) {
          capacities.push(capacity.value);
        }
      });
      setCapacityList(capacities);
    }

    if (setTypeArray) {
      const types = [];

      products.forEach((item) => {
        const type = item.characteristics.find(
          (char) => char.name === "Тип аккумулятора:",
        );
        if (type && !types.includes(type.value)) {
          types.push(type.value);
        }
      });
      setTypeList(types);
    }

    if (setCountryArray) {
      const countries = [];

      products.forEach((item) => {
        const country = item.characteristics.find(
          (char) => char.name === "Країна виробник:",
        );
        if (country && !countries.includes(country.value)) {
          countries.push(country.value);
        }
      });
      setCountriesList(countries);
    }

    if (setPowerArray) {
      const powers = [];

      products.forEach((item) => {
        const power = item.characteristics.find(
          (char) => char.name === "Номінальна потужність:",
        );
        if (power && !powers.includes(power.value)) {
          powers.push(power.value);
        }
      });
      setPowerList(powers.sort());
    }

    if (setProducerArray) {
      const producers = [];

      products.forEach((item) => {
        const producer = item.characteristics.find(
          (char) => char.name === "Виробник:",
        );
        if (producer && !producers.includes(producer.value)) {
          producers.push(producer.value);
        }
      });
      setProducerList(producers.sort());
    }

    const prices = products.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setSliderMin(minPrice);
    setSliderMax(maxPrice);
    setSliderValue([minPrice, maxPrice]);
    setPriceRange([minPrice, maxPrice]);
  }, [
    products,
    setPriceRange,
    setCapacityArray,
    setCountryArray,
    setPowerArray,
    setProducerArray,
    setTypeArray,
  ]);

  function addProducer(id) {
    setProducerArray((prev) => {
      const newArray = [...prev];

      const index = newArray.indexOf(id);
      if (index === -1) {
        newArray.push(id);
      } else {
        newArray.splice(index, 1);
      }
      return newArray;
    });
  }

  function addPower(id) {
    setPowerArray((prev) => {
      const newArray = [...prev];

      const index = newArray.indexOf(id);
      if (index === -1) {
        newArray.push(id);
      } else {
        newArray.splice(index, 1);
      }
      return newArray;
    });
  }

  function addCapacity(id) {
    setCapacityArray((prev) => {
      const newArray = [...prev];

      const index = newArray.indexOf(id);
      if (index === -1) {
        newArray.push(id);
      } else {
        newArray.splice(index, 1);
      }
      return newArray;
    });
  }

  function addType(id) {
    setTypeArray((prev) => {
      const newArray = [...prev];

      const index = newArray.indexOf(id);
      if (index === -1) {
        newArray.push(id);
      } else {
        newArray.splice(index, 1);
      }
      return newArray;
    });
  }

  function addCountries(id) {
    setCountryArray((prev) => {
      const newArray = [...prev];

      const index = newArray.indexOf(id);
      if (index === -1) {
        newArray.push(id);
      } else {
        newArray.splice(index, 1);
      }
      return newArray;
    });
  }

  function showFiltresFunction() {
    setShowFiltres((prev) => !prev);
  }

  useEffect(() => {
    if (window.innerWidth < 768) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }, []);

  return (
    <>
      <div className={classes.filterButtonWrapper}>
        <button
          className={`${classes.filterButtonShow} ${visibleButton ? classes.ActiveFilterButton : ""}`}
          onClick={showFiltresFunction}
        >
          {showFiltres ? <>Закрити фільтри</> : <>Відкрити фільтри</>}
        </button>
      </div>
      {showFiltres ? (
        <>
          <div className={classes.filterWrapper}>
            <span className={classes.filterName}>
              Показано товарів: {itemsQuantity}
            </span>
          </div>

          <div className={classes.filterWrapper}>
            <span className={classes.filterName}>Ціна</span>
            <div className={classes.filterFlex}>
              <span>
                <NumberWithSpaces number={sliderValue[0]} />
              </span>
              <span>
                <NumberWithSpaces number={sliderValue[1]} />
              </span>
            </div>
            <Slider
              dotActiveBorderColor="rgb(86, 128, 233)"
              handleActiveColor="rgb(132, 206, 235)"
              handleColor="rgb(86, 128, 233)"
              trackStyle={{ backgroundColor: "rgb(86, 128, 233)" }}
              railStyle={{ backgroundColor: "rgb(132, 206, 235)" }}
              dotStyle={{ borderColor: "rgb(86, 128, 233)" }}
              range
              value={sliderValue}
              min={sliderMin}
              max={sliderMax}
              step={100}
              onChange={handleSliderChange}
              tooltip={{ open: false }}
            />
          </div>
          <div className={classes.filterWrapper}>
            <span className={classes.filterName}>Виробник</span>
            {producerList.map((item, index) => (
              <div key={index} className={classes.filterBrand}>
                <input
                  type="checkbox"
                  id={item}
                  onChange={() => addProducer(item)}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
          {setPowerArray ? (
            <div className={classes.filterWrapper}>
              <span className={classes.filterName}>Номінальна потужність:</span>
              {powerList.map((item, index) => (
                <div key={index} className={classes.filterBrand}>
                  <input
                    type="checkbox"
                    id={item}
                    onChange={() => addPower(item)}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          {setCapacityArray ? (
            <div className={classes.filterWrapper}>
              <span className={classes.filterName}>Ємність, (А*год)</span>
              {capacityList.map((item, index) => (
                <div key={index} className={classes.filterBrand}>
                  <input
                    type="checkbox"
                    id={item}
                    onChange={() => addCapacity(item)}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          {setCountryArray ? (
            <div className={classes.filterWrapper}>
              <span className={classes.filterName}>Країна виробник</span>
              {countriesList.map((item, index) => (
                <div key={index} className={classes.filterBrand}>
                  <input
                    type="checkbox"
                    id={item}
                    onChange={() => addCountries(item)}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          {setTypeArray ? (
            <div className={classes.filterWrapper}>
              <span className={classes.filterName}>Тип аккумулятора:</span>
              {typeList.map((item, index) => (
                <div key={index} className={classes.filterBrand}>
                  <input
                    type="checkbox"
                    id={item}
                    onChange={() => addType(item)}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FiltersLeftSide;
