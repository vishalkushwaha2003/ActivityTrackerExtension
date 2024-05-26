/* eslint-disable no-unused-vars */
import BlockCard from "./BlockCard";

const dummyData = [
  {
    url: "example.com",
    startTime: "10:00",
    endTime: "18:00",
    days: [true, false, false, false, false, false, false],
  },
  {
    url: "abc.com",
    startTime: "17:00",
    endTime: "18:00",
    days: [false, true, false, false, false, false, false],
  },
  {
    url: "def.com",
    startTime: "09:00",
    endTime: "18:00",
    days: [true, true, false, false, false, false, false],
  },
  {
    url: "gef.com",
    startTime: "08:00",
    endTime: "18:00",
    days: [true, true, false, false, false, true, true],
  },
];

const BlockStats = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-[#5a5a59]">
        <h1>All Blocked Sites</h1>
      </div>

      <div className="">
        <BlockCard
          url={dummyData[0].url}
          startTime={dummyData[0].startTime}
          endTime={dummyData[0].endTime}
          days={dummyData[0].days}
        />
      </div>
    </div>
  );
};

export default BlockStats;
