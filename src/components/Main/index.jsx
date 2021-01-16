import React, { useState, useEffect } from "react";
import SDK from "@uphold/uphold-sdk-javascript";

//components
import Currency from "../Currency";
import AmountInput from "../AmountInput";
import SelectedCurrency from "../SelectedCurrency";
import Conversion from "../Conversion";

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
  const [amount, setAmount] = useState("");

  useEffect(() => {
    sdk.getTicker().then((data) => {
      // if (amount) {
      //   const
      // }
    });
  }, [amount]);

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
      <div>
        {!Number(amount) && <p>Enter an amount to check the rates</p>}
        {amount &&
          listOfCurrencies.map((item) => (
            <Conversion
              convertedAmount="0"
              currencyImg={item.currencyImage}
              currencyCode={item.currencyCode}
            />
          ))}
      </div>
    </main>
  );
};

export default Main;
