import React, { useState } from "react";
import Resultlist from "./../resultlist/resultlist";
import "./searchbar.scss";

const Searchbar: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [pos, setPos] = useState<number>(-1);
  const [listener, setListener] = useState<string>("keyboard");
  const ref = React.useRef<HTMLInputElement>(null);

  const keyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setListener("keyboard");
    if (e.key === "ArrowDown") {
      setPos((pos) => pos + 1);
      e.preventDefault();
    }
    if (e.key === "ArrowUp") {
      setPos((pos) => pos - 1);
      e.preventDefault();
    }
  };

  const inputHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setPos(-1);
  };

  return (
    <div className="main-content" onKeyDown={keyHandler}>
      <div className="search-container">
        <div className="search-icon"></div>
        <input
          ref={ref}
          type="text"
          className="input-field"
          value={text}
          name="search"
          placeholder="Search for ID, Name, Address or Item"
          onChange={inputHanlder}
        />
      </div>
      <Resultlist
        text={text}
        pos={pos}
        setPos={setPos}
        listener={listener}
        setListener={setListener}
      />
    </div>
  );
};

export default Searchbar;
