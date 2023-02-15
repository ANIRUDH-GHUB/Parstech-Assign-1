import React from "react";
import { USER } from "../../model/interface";
import "./resultcard.css";

interface ResultCardProps {
  user: USER;
  text: string;
}
const ResultCard: React.FC<ResultCardProps> = (props) => {
  const { user, text } = props;
  const [valid, setValid] = React.useState<boolean>(false);

  /**
   * Function to find if search text is present in user object
   * @param user USER
   * @param text string
   * @returns boolean
   */
  const isValidSearch = (user: USER, text: string) => {
    return (
      user.id.toLowerCase().includes(text.toLowerCase()) ||
      user.name.toLowerCase().includes(text.toLowerCase()) ||
      user.address.toLowerCase().includes(text.toLowerCase()) ||
      user.pincode.toLowerCase().includes(text.toLowerCase()) ||
      user.items.some((item) => item.toLowerCase().includes(text.toLowerCase()))
    );
  };

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
  /**
   * Takes effect when user changes
   */
  React.useEffect(() => {
    setValid(() => isValidSearch(user, text));
  }, [user, text]);

  return (
    <>
      {text && valid && (
        <div className="card-item">
          <h4
            dangerouslySetInnerHTML={{ __html: formatValue(user.id, text) }}
          ></h4>
          <h5
            dangerouslySetInnerHTML={{ __html: formatValue(user.name, text) }}
          ></h5>
          <p
            dangerouslySetInnerHTML={{
              __html: formatValue(user.address, text)
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: formatValue(user.pincode, text)
            }}
          ></p>
        </div>
      )}
    </>
  );
};

export default ResultCard;
