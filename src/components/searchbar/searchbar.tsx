import React, { useState } from "react";
import Resultlist from "./../resultlist/resultlist";

const Searchbar: React.FC = () => {
  const [text, setText] = useState<string>("");

  return (
    <div>
      <div>
        <input
          value={text}
          name="search"
          onChange={(e) => setText(e.target.value)}
        />
        <Resultlist text={text} />
      </div>
    </div>
  );
};

export default Searchbar;
