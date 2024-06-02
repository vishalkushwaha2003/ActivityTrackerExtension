/* eslint-disable react/prop-types */

import { useState } from "react";

/* eslint-disable no-unused-vars */
const BlockFormOnEdit = ({
  name,
  url,
  startTime,
  endTime,
  days,
  handleClose,
}) => {
  const [editedName, setEditedName] = useState(name);
  const [editedUrl, setEditedUrl] = useState(url);
  const [editedStartTime, setEditedStartTime] = useState(startTime);
  const [editedEndTime, setEditedEndTime] = useState(endTime);
  const [editedSelectedDays, setEditedSelectedDays] = useState(days);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setEditedUrl(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setEditedStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEditedEndTime(e.target.value);
  };

  const toggleDay = (index) => {
    setEditedSelectedDays((prevState) => {
      const newDays = [...prevState];
      newDays[index] = !newDays[index];
      return newDays;
    });
  };

  return (
    <>
      <div className="text-center -mt-4  text-[#b3b4b4] ">
        <div className="flex flex-col justify-center items-center">
          <input
            className="mt-3 px-2 py-2 rounded-lg text-[#9b9b9a] bg-[rgba(47,47,47,255)] w-60  border-none focus:outline-none"
            type="text"
            placeholder="Enter the Name"
            id="urlInput"
            value={editedName}
            onChange={handleNameChange}
          />

          <input
            className="mt-3 px-2 py-2 rounded-lg text-[#9b9b9a] bg-[rgba(47,47,47,255)] w-60  border-none focus:outline-none"
            type="text"
            placeholder="Enter the URL to block"
            id="urlInput"
            value={editedUrl}
            onChange={handleUrlChange}
          />

          <div className="flex  mt-3">
            <div className="flex flex-col mr-6">
              <label className="mb-1" htmlFor="startTime">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                className="bg-[rgba(47,47,47,255)] px-2 py-1 focus:outline-none rounded-sm"
                placeholder="Enter the start time in (HH:MM)"
                id="startTime"
                value={editedStartTime}
                onChange={handleStartTimeChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1" htmlFor="endTime">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                className="bg-[rgba(47,47,47,255)] px-2 py-1 focus:outline-none rounded-sm"
                placeholder="Enter the end time in (HH:MM)"
                id="endTime"
                value={editedEndTime}
                onChange={handleEndTimeChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 mb-1">
          <h3 className=" text-sm ">Select Days to block the website</h3>
        </div>

        <div className="mt-2  text-base">
          <div className="flex justify-center space-x-2">
            <button
              id="Monday"
              onClick={() => toggleDay(0)}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                editedSelectedDays[0]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              M
            </button>
            <button
              id="Tuesday"
              onClick={() => toggleDay(1)}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                editedSelectedDays[1]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              T
            </button>
            <button
              id="Wednesday"
              onClick={() => toggleDay(2)}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                editedSelectedDays[2]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              W
            </button>
            <button
              id="Thru"
              onClick={() => toggleDay(3)}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                editedSelectedDays[3]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              T
            </button>
            <button
              id="Friday"
              onClick={() => toggleDay(4)}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                editedSelectedDays[4]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              F
            </button>
            <button
              id="Sat"
              onClick={() => toggleDay(5)}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                editedSelectedDays[5]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              S
            </button>
            <button
              id="Sunday"
              onClick={() => toggleDay(6)}
              className={`w-7 h-7 flex items-center justify-center rounded-full ${
                editedSelectedDays[6]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              S
            </button>
          </div>
          <div className="mt-6 mx-2 flex justify-center space-x-2">
            <button
              id="submitButton"
              className="bg-[rgba(47,47,47,255)] -ml-4 px-2 py-1 rounded-md hover:cursor-pointer hover:bg-[rgb(57,57,57)]"
            >
              Submit
            </button>
            <button
              id="submitButton"
              onClick={handleClose}
              className="bg-[rgba(47,47,47,255)] -ml-4 px-2 py-1 rounded-md hover:cursor-pointer hover:bg-[rgb(57,57,57)]"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* {isOverlay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[rgba(20,20,20,255)] p-4 rounded-md shadow-md flex flex-col items-center">
              <h1 className="text-base mb-4 text-center">{message}</h1>
              <button
                className="bg-[rgba(47,47,47,255)] px-4 py-2 rounded-md hover:cursor-pointer hover:bg-[rgb(57,57,57)]"
                onClick={cancelButtonHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        )}  */}
      </div>
    </>
  );
};

export default BlockFormOnEdit;
