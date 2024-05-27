import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
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

      <div className="fixed bottom-0 bg-[rgba(28,28,28,255)] text-[#9b9b9a] w-full h-11   ">
        <div className="mx-6 flex justify-between pt-1">
          <button onClick={newBlockHandler}>
            <div className="flex flex-col">
              <div className="text-[5px]">
                {isForm ? <NoEncryptionIcon /> : <NoEncryptionOutlinedIcon />}
              </div>
              <div className="text-[10px]">New Block</div>
            </div>
          </button>
          <button onClick={blockDataHandler}>
            <div className="flex flex-col">
              <div className="text-[5px]">
                {isForm ? <InsertChartOutlinedIcon /> : <InsertChartIcon />}
              </div>
              <div className="text-[10px]">Block Data</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
