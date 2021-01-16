import React, { useState, useEffect } from "react";
import SDK from "@uphold/uphold-sdk-javascript";

//components
import Currency from "../Currency";
import AmountInput from "../AmountInput";
import SelectedCurrency from "../SelectedCurrency";

import { listOfCurrencies } from "./listOfCurrencies";
//images
import usd from "../../images/png/currencies/USD.png";

import "./style.scss";

const sdk = new SDK({
  baseUrl: "http://api-sandbox.uphold.com",
  clientId: "foo",
  clientSecret: "bar",
});

const Main = () => {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [currencyImage, setCurrencyImage] = useState(usd);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [amount, setAmount] = useState("0.00");

  useEffect(() => {
    sdk.getTicker().then((data) => console.log(data));
  }, []);

  const toggleCurrencyOptions = () => {
    setOptionsOpen(() => !optionsOpen);
  };

  const updateCurrency = (code, image) => {
    setCurrencyCode(code);
    setCurrencyImage(image);
  };

  const handleAmountInput = (event) => {
    const { value } = event.target;
    setAmount(value);
  };

  return (
    <main>
      <div className="inputs-container">
        <AmountInput
          amount={amount}
          handleAmountInput={handleAmountInput}
          className="input-amount"
        />
        <div className="currencies-container">
          <SelectedCurrency
            className="currency"
            toggleCurrencyOptions={toggleCurrencyOptions}
            currencyImage={currencyImage}
            currencyCode={currencyCode}
          />

          {optionsOpen && (
            <form className="currency-options-container">
              {listOfCurrencies.map((item, index) => (
                <Currency
                  activeCurrency={currencyCode}
                  currencyCode={item.currencyCode}
                  updateCurrency={updateCurrency}
                  updateOptionsStatus={setOptionsOpen}
                  currencyImage={item.currencyImage}
                  key={index}
                />
              ))}
            </form>
          )}
        </div>
      </div>
      <div></div>
      <p>Enter an amount to check the rates</p>
    </main>
  );
};

export default Main;
