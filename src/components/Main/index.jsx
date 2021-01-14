import React from "react";

import "./style.scss";

const Main = () => {
  return (
    <main>
      <div className="inputs-container">
        <input type="number" className="input-amount" />
      </div>
      <p>Enter an amount to check the rates</p>
    </main>
  );
};

export default Main;
