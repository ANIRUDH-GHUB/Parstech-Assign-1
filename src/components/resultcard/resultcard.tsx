import React from "react";
import { USER } from "../../model/interface";
import "./resultcard.scss";

interface ResultCardProps {
  user: USER;
  text: string;
  active: boolean;
  setPos: Function;
}
const ResultCard: React.FC<ResultCardProps> = (props) => {
  const { user, text, active, setPos } = props;

  const isItem = (items: string[], text: string) =>
    items.some((item) => item.toLowerCase().includes(text.toLowerCase()));

  /**
   * Function to highlight the search key in the user attributes
   * @param value string
   * @param text string
   */
  const formatValue = (value: string, text: string) => {
    const ind = value.toLowerCase().indexOf(text.toLowerCase());
    const key = ind !== -1 ? value.substring(ind, ind + text.length) : "";
    return value.replace(key, `<span class="highlight">${key}</span>`);
  };

  return (
    <>
      {text && (
        <li
          className={`card-item ${active ? "active" : ""}`}
          onMouseMove={(e)=>setPos()}
        >
          <h4
            dangerouslySetInnerHTML={{ __html: formatValue(user.id, text) }}
          ></h4>
          <h5
            dangerouslySetInnerHTML={{ __html: formatValue(user.name, text) }}
          ></h5>
          {isItem(user.items, text) && (
            <p
              className="item-key"
              dangerouslySetInnerHTML={{
                __html: formatValue(`"${text}" found in items`, text),
              }}
            ></p>
          )}
          <p
            dangerouslySetInnerHTML={{
              __html: formatValue(user.address, text),
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: formatValue(user.pincode, text),
            }}
          ></p>
        </li>
      )}
    </>
  );
};

export default ResultCard;
