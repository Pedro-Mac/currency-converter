import React from "react";

const AmountInput = ({ amount, handleAmountInput }) => {
  return (
    <input
      type="number"
      className="input-amount"
      placeholder="0.00"
      value={amount}
      onChange={handleAmountInput}
    />
  );
};

export default AmountInput;
