import React from "react";

import dropdownIcon from "../../images/svg/dropdown-icon.svg";

const SelectedCurrency = ({
  currencyImage,
  toggleCurrencyOptions,
  currencyCode,
  className,
}) => {
  return (
    <div className={className} onClick={toggleCurrencyOptions}>
      <img src={currencyImage} alt={currencyCode} className="currency-image" />
      <p className="currency-text">{currencyCode}</p>
      <img src={dropdownIcon} alt="dropdown" className="dropdown selected" />
    </div>
  );
};

export default SelectedCurrency;
