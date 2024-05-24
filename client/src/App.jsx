import { useState } from "react";
import BackgroundAnimation from "./backgroundanimation/BackgroundAnimation";
import BlockPage from "./components/BlockPage";
import Stats from "./components/Stats";

const App = () => {
  const [active, setActive] = useState(1);
  const clickHandler = (index) => {
    setActive(index);
  };
  return (
    <>
      <BackgroundAnimation />
      <div className="">
        <div className="bg-[rgba(47,47,47,255)] flex text-base h-8 text-[#9b9b9a] hover:z-100 hover:bg-[rgba(65,65,65,255)]">
          <div
            onClick={() => clickHandler(1)}
            className={` absolute pt-1  left-0 h-8  w-[154px] text-center ${
              active === 1
                ? "bg-[rgba(33,33,33,255)] rounded-t-2xl border-l-2 border-t-2 border-[rgba(47,47,47,255)]"
                : "bg-[rgba(47,47,47,255)] z-10 rounded-br-2xl hover:cursor-pointer hover:z-30 hover:bg-[rgba(65,65,65,255)]"
            }`}
          >
            Stats
          </div>
          {active === 1 && (
            <div className="absolute top-0 border-t-2 border-r-2 border-[rgba(47,47,47,255)]  z-20 left-[126px] bg-[rgba(47,47,47,255)]">
              <div className="bg-[rgba(33,33,33,255)] w-4 h-4 z-30  rounded-tr-2xl"></div>
            </div>
          )}
          {active === 2 && (
            <div className="absolute top-0 z-20 border-t-2 border-[rgba(47,47,47,255)] left-[154px] bg-[rgba(47,47,47,255)]">
              <div className="bg-[rgba(33,33,33,255)] w-4 h-4 z-30  rounded-tl-2xl"></div>
            </div>
          )}
          <div
            onClick={() => clickHandler(2)}
            className={` pt-1 absolute h-8 px-5 right-0 w-[158px] text-center ${
              active === 2
                ? "bg-[rgba(33,33,33,255)] rounded-t-2xl border-t-2 border-r-2 border-[rgba(47,47,47,255)]"
                : "bg-[rgba(47,47,47,255)] z-10 rounded-bl-2xl hover:cursor-pointer hover:z-30 hover:bg-[rgba(65,65,65,255)]"
            }`}
          >
            Block
          </div>
        </div>
        <div>
          {active === 1 && <Stats />}
          {active === 2 && <BlockPage />}
        </div>
      </div>
    </>
  );
};

export default App;
