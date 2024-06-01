/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import BlockCard from "./BlockCard";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

const BlockStats = () => {
  const [data, setData] = useState([
    {
      url: "www.google.com",
      name: "Google",
      startTime: "10:00",
      endTime: "12:00",
      days: [true, true, true, false, false, false, false],
    },
    {
      url: "www.google.com",
      name: "Netflix",
      startTime: "10:00",
      endTime: "12:00",
      days: [true, true, true, false, false, false, false],
    },
    {
      url: "www.google.com",
      name: "Facebook",
      startTime: "10:00",
      endTime: "12:00",
      days: [true, true, true, false, false, false, false],
    },
    {
      url: "www.google.com",
      name: "Youtube",
      startTime: "10:00",
      endTime: "12:00",
      days: [true, true, true, false, false, false, false],
    },
  ]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // call for getting the data
    setFilteredData(data);
  }, []);

  const searchHandler = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="absolute right-[32px] top-10">
        {
          <input
            className=" px-2 py-1 rounded-md text-[#9b9b9a] bg-[rgba(47,47,47,255)] w-[100px]  border-none focus:outline-none"
            type="text"
            onChange={searchHandler}
            placeholder="Search"
            id="urlInput"
          />
        }
      </div>

      <div className="text-[#c7c7c6] mt-2 text-base pb-2 ml-[-120px] ">
        <h1>All Blocked Sites</h1>
      </div>

      <div className="h-[310px] overflow-y-scroll">
        {filteredData.map((item, i) => {
          return (
            <BlockCard
              key={i}
              url={item.url}
              name={item.name}
              startTime={item.startTime}
              endTime={item.endTime}
              days={item.days}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlockStats;
