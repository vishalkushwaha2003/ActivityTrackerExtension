import BlockIcon from "@mui/icons-material/Block";
import TimelapseIcon from "@mui/icons-material/Timelapse";
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
    <div className="">
      {isForm && <BlockForm />}
      {!isForm && <BlockStats />}

      <div className="absolute bottom-0 bg-[rgba(28,28,28,255)] text-[#9b9b9a] w-full h-10">
        <button onClick={newBlockHandler}>
          <BlockIcon /> New Block
        </button>
        <button onClick={blockDataHandler}>
          <TimelapseIcon /> Block data
        </button>
      </div>
    </div>
  );
};

export default BlockPage;
