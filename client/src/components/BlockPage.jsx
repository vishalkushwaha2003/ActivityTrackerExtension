import { useState } from "react";
import BlockForm from "./BlockForm";
import BlockStats from "./BlockStats/BlockStats";

const BlockPage = () => {
  const [isForm, setIsForm] = useState(true);

  const newBlockHandler = () => {
    setIsForm(true);
  };

  const blockDataHandler = () => {
    setIsForm(false);
  };

  return (
    <div>
      {isForm && <BlockForm />}
      {!isForm && <BlockStats />}

      <div>
        <button onClick={newBlockHandler}>New Block</button>
        <button onClick={blockDataHandler}>Block Data</button>
      </div>
    </div>
  );
};

export default BlockPage;
