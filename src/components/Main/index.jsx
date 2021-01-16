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
//styles
import "./style.scss";

const sdk = new SDK({
  baseUrl: "http://api-sandbox.uphold.com",
  clientId: "foo",
  clientSecret: "bar",
});

const Main = () => {
  const [activeCurrencyCode, setActiveCurrencyCode] = useState("USD");
  const [currencyImage, setCurrencyImage] = useState(usd);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    sdk.getTicker().then((data) => {
      const currencies = listOfCurrencies.map((item) =>
        item.currencyCode.toUpperCase(),
      );

      if (amount) {
        const ratesList = data.filter(
          (value) =>
            currencies.includes(value.currency) && value.currency !== "USD",
        );

        setRates(ratesList);
      }
    });
  }, [amount, activeCurrencyCode]);

  const toggleCurrencyOptions = () => {
    setOptionsOpen(() => !optionsOpen);
  };

  const updateCurrency = (code, image) => {
    setActiveCurrencyCode(code);
    setCurrencyImage(image);
  };

  const handleAmountInput = (event) => {
    const { value } = event.target;
    setAmount(value);
  };

  const calculateAmount = (activeCurrency, currencyCode) => {
    if (activeCurrency === "USD" && rates.length) {
      const conversionRate = rates.find(
        (item) =>
          item.pair === `${activeCurrency}${currencyCode.toUpperCase()}`,
      ).ask;
      return (amount * conversionRate).toFixed(2);
    }

    return 0;
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
            currencyCode={activeCurrencyCode}
          />

          {optionsOpen && (
            <form className="currency-options-container">
              {listOfCurrencies.map((item, index) => (
                <Currency
                  activeCurrency={activeCurrencyCode}
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
          listOfCurrencies
            .filter(
              (item) => item.currencyCode.toUpperCase() !== activeCurrencyCode,
            )
            .map((item, index) => (
              <Conversion
                key={index}
                convertedAmount={calculateAmount(
                  activeCurrencyCode,
                  item.currencyCode,
                )}
                currencyImg={item.currencyImage}
                currencyCode={item.currencyCode}
              />
            ))}
      </div>
    </main>
  );
};

export default Main;
