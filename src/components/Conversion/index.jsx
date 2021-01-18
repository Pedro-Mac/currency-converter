import React from "react";

import "./style.scss";

import { listOfCurrencies } from "../Main/listOfCurrencies";

const Conversio = ({ convertedAmount, currencyImg, currencyCode }) => {
  return (
    <section className="conversion-container">
      <p className="conversion-amount">{convertedAmount}</p>
      <div className="currency-container">
        <img src={currencyImg} alt={currencyCode} />
        <p>{currencyCode}</p>
      </div>
    </section>
  );
};

export default Conversio;
