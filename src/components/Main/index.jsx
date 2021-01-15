import React, { useState } from "react";

import Currency from "../Currency";
import usd from "../../images/png/currencies/USD.png";
import dropdownIcon from "../../images/svg/dropdown-icon.svg";
import "./style.scss";

const Main = () => {
  const [currency, setCurrency] = useState("USD");
  const [optionsOpen, setOptionsOpen] = useState(false);

  const toggleCurrencyOptions = () => {
    setOptionsOpen(() => !optionsOpen);
  };

  return (
    <main>
      <div className="inputs-container">
        <input type="number" className="input-amount" placeholder="0.00" />
        <div className="currencies-container">
          <div className="currency" onClick={toggleCurrencyOptions}>
            <img src={usd} alt="USD" className="currency-image" />
            <p className="currency-text">{currency}</p>
            <img
              src={dropdownIcon}
              alt="dropdown"
              className="dropdown selected"
            />
          </div>
          {optionsOpen && (
            <div className="currency-options-container">
              <Currency />
            </div>
          )}
        </div>
      </div>
      <p>Enter an amount to check the rates</p>
    </main>
  );
};

export default Main;
