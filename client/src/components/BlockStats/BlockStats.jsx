/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BlockCard from "./BlockCard";

const BlockStats = () => {
  const [data, setData] = useState([
    {
      url: "www.google.com",
      name: "Google",
      startTime: "10:00",
      endTime: "12:00",
      days: [true, true, true, false, false, false, false],
    },
  ]);

  useEffect(() => {
    // call for getting the data
  }, []);

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="text-[#c7c7c6] mt-2 text-base pb-2">
        <h1>All Blocked Sites</h1>
      </div>

      <div className="h-[310px] overflow-y-scroll">
        <BlockCard
          url={data[0].url}
          name={data[0].name}
          startTime={data[0].startTime}
          endTime={data[0].endTime}
          days={data[0].days}
        />
      </div>
    </div>
  );
};

export default BlockStats;
