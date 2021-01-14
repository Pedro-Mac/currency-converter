import React from "react";

import { links } from "./links";

//images
import logo from "../../images/svg/small-logo.svg";
import appstore from "../../images/svg/appstore.svg";
import playstore from "../../images/svg/playstore.svg";

//styles
import "./style.scss";

const GroupedRedirects = () => {
  //this turns the lowercase strings in the "links" file into Capitalized strings
  const capitalizedLinks = links.map((value) => {
    const { header, items } = value;
    const capitalizedHeader = header.charAt(0).toUpperCase() + header.slice(1);

    const arrayOfCapitalizedStrings = items.map((string) => {
      const capitalizedItems = string.split(" ").map((word) => {
        if (word === "faq") {
          return "FAQ";
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      });
      return capitalizedItems.join(" ");
    });
    return { header: capitalizedHeader, items: arrayOfCapitalizedStrings };
  });

  return (
    <section>
      <img src={logo} alt="uphold logo" />
      {capitalizedLinks.map((value, index) => (
        //value is an object with a title and a list of links
        <div key={index} className="group-list-container">
          <h4 className="group-list-header">{value.header}</h4>

          <ul className="group-list list">
            {value.items.map((item, index) => (
              <li key={index} className="group-list-item">
                <a href="/" className="anchor">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="stores-container">
        <a href="/">
          <img src={appstore} alt="Appstore" />
        </a>
        <a href="/">
          <img src={playstore} alt="Playstore" />
        </a>
      </div>
    </section>
  );
};

export default GroupedRedirects;
