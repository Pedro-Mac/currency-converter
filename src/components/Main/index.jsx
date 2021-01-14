import React from "react";

import "./style.scss";

const Main = () => {
  return (
    <main>
      <div className="inputs-container">
        <input type="number" className="input-amount" placeholder="0.00" />
        <select
          name="currency"
          id="currency-select"
          className="currency-select"
        >
          <option value="USD">USD</option>
        </select>
      </div>
      <p>Enter an amount to check the rates</p>
    </main>
  );
};

export default Main;
