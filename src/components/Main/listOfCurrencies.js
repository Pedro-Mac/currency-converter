import eur from "../../images/png/currencies/EUR.png";
import usd from "../../images/png/currencies/USD.png";
import bat from "../../images/png/currencies/BAT.png";
import bch from "../../images/png/currencies/BCH.png";
import btc from "../../images/png/currencies/BTC.png";
import gbp from "../../images/png/currencies/GBP.png";
import pln from "../../images/png/currencies/PLN.png";

const currenciesStrings = ["eur", "usd", "bat", "bch", "btc", "gbp", "pln"];
const currenciesImages = [eur, usd, bat, bch, btc, gbp, pln];

export const listOfCurrencies = currenciesStrings.map((item, index) => ({
  currencyCode: item,
  currencyImage: currenciesImages[index],
}));
