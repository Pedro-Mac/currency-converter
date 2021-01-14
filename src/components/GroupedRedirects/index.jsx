import React from "react";

import { links } from "./links";

//images
import logo from "../../images/svg/small-logo.svg";
import appstore from "../../images/svg/appstore.svg";
import playstore from "../../images/svg/playstore.svg";

//styles
import "./style.scss";

const GroupedRedirects = () => {
  return (
    <section>
      <img src={logo} alt="uphold logo" />
      {links.map((value, index) => (
        //value is an object with a title and a list of links
        <div key={index} className="group-list-container">
          <h4 className="group-list-header">{value.header}</h4>

          <ul className="group-list list">
            {value.items.map((item, index) => (
              <li key={index} className="group-list-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <img src={appstore} alt="Appstore" />
        <img src={playstore} alt="Playstore" />
      </div>
    </section>
  );
};

export default GroupedRedirects;
