import React, { useState, useEffect, useCallback } from "react";
import SDK from "@uphold/uphold-sdk-javascript";

//components
import Currency from "../Currency";
import AmountInput from "../AmountInput";
import SelectedCurrency from "../SelectedCurrency";
import Conversion from "../Conversion";

import { listOfCurrencies } from "./services/listOfCurrencies";
import { defineDecimalPlaces } from "./services/decimalPlaces";
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
  const [activeCurrencyCode, setActiveCurrencyCode] = useState(
    localStorage.getItem("currCode") || "USD",
  );
  const [currencyImage, setCurrencyImage] = useState(
    localStorage.getItem("currImage") || usd,
  );
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [conversionsList, setConversionsList] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const debounce = useCallback((scheduledReq) => {
    document.addEventListener("keydown", () => clearTimeout(scheduledReq));
    return () =>
      document.removeEventListener("keydown", () => clearTimeout(scheduledReq));
  }, []);

  useEffect(() => {
    if (amount) {
      const listRequest = setTimeout(async () => {
        // Get currencies conversion from API and filter them
        const listOfCurrenciesToUse = await sdk.getTicker().then((data) => {
          const ratesList = data.filter((value) => {
            return (
              value.currency !== "USD" &&
              listOfCurrencies.some(
                (item) => item.currencyCode === value.currency,
              )
            );
          });
          return ratesList;
        });

        const conversionRates = listOfCurrenciesToUse.map((item) => ({
          currency: item.currency,
          conversion: item.ask,
        }));
        if (activeCurrencyCode === "USD") {
          for (let el of conversionRates) {
            el.conversion = Number(el.conversion) * Number(amount);
          }
        } else if (activeCurrencyCode !== "USD") {
          //Convert the selected currency to USD in order to convert it to all other currencies from there
          const activeCurrencyRateToUSD = listOfCurrenciesToUse.find(
            (item) => item.currency === activeCurrencyCode,
          ).ask;

          for (let el of conversionRates) {
            if (el.currency === activeCurrencyCode) {
              el.currency = "USD";
              el.conversion = defineDecimalPlaces(
                amount / activeCurrencyRateToUSD,
              );
            } else {
              el.conversion = defineDecimalPlaces(
                (amount / activeCurrencyRateToUSD) * el.conversion,
              );
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
        setIsReady(true);
        setConversionsList(sortedConversionRates);

        console.log(listOfCurrenciesToUse);
      }, 1000);
      return debounce(listRequest);
    } else {
      setConversionsList([]);
      setIsReady(false);
    }
  }, [amount, activeCurrencyCode, debounce]);

  const toggleCurrencyOptions = () => {
    setOptionsOpen(() => !optionsOpen);
  };

  const updateCurrency = (code, image) => {
    localStorage.setItem("currCode", code);
    localStorage.setItem("currImage", image);
    setIsReady(false);
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
        {!amount && (
          <p className="displayed-currencies-none">
            Enter an amount to check the rates
          </p>
        )}
        {amount &&
          isReady &&
          conversionsList
            .filter((item) => item.currency !== activeCurrencyCode)
            .map((item, index) => (
              <Conversion
                key={index}
                convertedAmount={item.conversion}
                currencyImg={
                  listOfCurrencies.find(
                    (value) => value.currencyCode === item.currency,
                  ).currencyImage
                }
                currencyCode={item.currency}
              />
            ))}
      </div>
    </main>
  );
};

export default Main;
