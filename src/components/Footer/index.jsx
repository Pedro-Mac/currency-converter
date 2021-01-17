import React from "react";

import qrCode from "../../images/svg/qr-code.svg";

import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className="outter-container">
        <p className="outter-text">
          Uphold Europe Limited, Reg No. 09281410, Registered Office:
          Interchange Triangle, Chalk Farm, London, England, NW1 8AB
        </p>
        <div className="inner-container">
          <p className="inner-text">
            {" "}
            © Uphold, Inc. 2018. All rights Reserved.
          </p>
          <ul className="group-list list">
            <li className="list-item">
              <a href="/" className="anchor">
                {" "}
                Agreements
              </a>
            </li>
            <li className="list-item">
              <a href="/" className="anchor">
                {" "}
                Privacy & Data Policy
              </a>
            </li>
            <li className="list-item">
              <a href="/" className="anchor">
                {" "}
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <img src={qrCode} alt="QR Code" />
    </footer>
  );
};

export default Footer;
