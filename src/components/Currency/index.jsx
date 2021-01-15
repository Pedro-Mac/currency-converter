import React from "react";

import euroCurrency from "../../images/png/currencies/EUR.png";

import "./style.scss";

const Currency = () => {
  return (
    <div className="currency">
      <img src={euroCurrency} alt="eur" className="currency-image" />
      <label htmlFor="eur" className="currency-text">
        EUR
      </label>
      <input type="radio" id="eur" />
    </div>
  );
};

export default Currency;
