import "./style.scss";

const AmountInput = ({ amount, handleAmountInput, className }) => {
  return (
    <input
      type="number"
      placeholder="0.00"
      value={amount}
      onChange={handleAmountInput}
      className={className}
    />
  );
};

export default AmountInput;
