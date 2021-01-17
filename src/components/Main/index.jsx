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

//services
import { defineDecimalPlaces } from "./services/decimalPlaces";

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
  const [conversionsList, setConversionsList] = useState([]);

  useEffect(() => {
    sdk.getTicker().then((data) => {
      const currencies = listOfCurrencies.map((item) =>
        item.currencyCode.toUpperCase(),
      );

      const ratesList = data.filter(
        (value) =>
          currencies.includes(value.currency) && value.currency !== "USD",
      );
      setRates(ratesList);

      if (amount) {
        const conversionRates = rates.map((item) => ({
          currency: item.currency,
          conversion: item.ask,
        }));
        if (activeCurrencyCode === "USD" && rates.length) {
          for (let el of conversionRates) {
            el.conversion = Number(el.conversion) * Number(amount);
          }
        } else if (activeCurrencyCode !== "USD" && rates.length) {
          const activeCurrencyRateToUSD = rates.find(
            (item) => item.currency === activeCurrencyCode,
          ).ask;
          console.log(activeCurrencyRateToUSD);
          for (let el of conversionRates) {
            if (el.currency === activeCurrencyCode) {
              el.currency = "USD";
              el.conversion = amount / activeCurrencyRateToUSD;
            } else {
              el.conversion =
                (amount / activeCurrencyRateToUSD) * el.conversion;
            }
          }
        }
        const sortedConversionRates = conversionRates.sort((a, b) => {
          if (a.currency < b.currency) {
            return -1;
          } else if (a.currency > b.currency) {
            return 1;
          } else {
            return 0;
          }
        });
        setConversionsList(() => sortedConversionRates);
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
    if (value.length < 11) setAmount(value);
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
      <div className="displayed-currencies">
        {!Number(amount) && <p>Enter an amount to check the rates</p>}
        {amount &&
          conversionsList.length &&
          listOfCurrencies
            .filter((item) => item.currencyCode !== activeCurrencyCode)
            .map((item, index) => (
              <Conversion
                key={index}
                convertedAmount={conversionsList[index].conversion}
                currencyImg={item.currencyImage}
                currencyCode={item.currencyCode}
              />
            ))}
      </div>
    </main>
  );
};

export default Main;
