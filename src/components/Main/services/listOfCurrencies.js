import eur from "../../../images/png/currencies/EUR.png";
import usd from "../../../images/png/currencies/USD.png";
import bat from "../../../images/png/currencies/BAT.png";
import bch from "../../../images/png/currencies/BCH.png";
import btc from "../../../images/png/currencies/BTC.png";
import gbp from "../../../images/png/currencies/GBP.png";
import pln from "../../../images/png/currencies/PLN.png";

export const listOfCurrencies = [
  { currencyCode: "EUR", currencyImage: eur },
  { currencyCode: "USD", currencyImage: usd },
  { currencyCode: "BAT", currencyImage: bat },
  { currencyCode: "BCH", currencyImage: bch },
  { currencyCode: "BTC", currencyImage: btc },
  { currencyCode: "GBP", currencyImage: gbp },
  { currencyCode: "PLN", currencyImage: pln },
].sort((a, b) => {
  if (a.currencyCode < b.currencyCode) {
    return -1;
  } else if (a.currencyCode > b.currencyCode) {
    return 1;
  } else {
    return 0;
  }
});
