import React from "react";

import "./style.scss";

const Currency = ({
  currencyCode,
  updateCurrency,
  updateOptionsStatus,
  activeCurrency,
  currencyImage,
}) => {
  const upperCurrencyCode = currencyCode.toUpperCase();

  const handleSelectedInput = (event) => {
    const { value } = event.target;

    if (value !== activeCurrency) {
      updateCurrency(value, currencyImage);
    }
    updateOptionsStatus(false);
  };

  return (
    <div className="currency">
      <img src={currencyImage} alt={currencyCode} className="currency-image" />
      <label htmlFor={currencyCode} className="currency-text">
        {upperCurrencyCode}
      </label>
      <input
        type="radio"
        id={currencyCode}
        value={upperCurrencyCode}
        onChange={handleSelectedInput}
      />
    </div>
  );
};

export default Currency;
