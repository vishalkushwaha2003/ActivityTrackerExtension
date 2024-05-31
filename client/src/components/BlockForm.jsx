/* eslint-disable no-undef */

import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const BlockForm = () => {
  const [backendMessage, setBackendMessage] = useState([]);
  const [selectedDays, setSelectedDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [isOverlay, setIsOverlay] = useState(false);
  const [message, setMessage] = useState(null);

  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://192.168.29.141:8080/server");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected");
        stompClient.subscribe(
          "/topic/513a3660-257d-45f9-94eb-5e51d5cdfbaf",
          (message) => {
            try {
              const parsedMessage = JSON.parse(message.body);
              console.log("Received message:", parsedMessage);
              setBackendMessage((prevMessages) => [
                ...prevMessages,
                parsedMessage,
              ]);
            } catch (error) {
              console.error("Error parsing message:", error);
            }
          }
        );
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();

    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const toggleDay = (index) => {
    setSelectedDays((prevState) => {
      const newDays = [...prevState];
      newDays[index] = !newDays[index];
      return newDays;
    });
  };

  const cancelButtonHandler = () => {
    setIsOverlay(false);
  };

  const clickHandler = () => {
    const url = document.getElementById("urlInput").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    const stompClient = stompClientRef.current;

    stompClient.publish({
      destination: "/app/test",
      body: JSON.stringify({ message: "Block Site Api testing checking" }),
    });

    console.log(message);

    if (url && startTime && endTime) {
      chrome.storage.local.get({ blockedSites: [] }, (result) => {
        const blockedSites = result.blockedSites;
        blockedSites.push({ url, startTime, endTime, days: selectedDays });
        chrome.storage.local.set({ blockedSites: blockedSites }, () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTabId = tabs[0].id;
            chrome.tabs.sendMessage(
              currentTabId,
              {
                action: "blockSite",
                url,
                startTime,
                endTime,
                days: selectedDays,
              },
              () => {
                chrome.tabs.reload(currentTabId);
              }
            );
          });
        });
      });

      setIsOverlay(true);
      setMessage("Submitted Successfully");
    } else {
      setIsOverlay(true);
      setMessage("Fill all fields");
    }
  };

  return (
    <>
      <div className="text-center mt-5 text-[#b3b4b4]">
        {/* <h1 className="text-xl font-semibold">Block Website</h1> */}
        <div className="flex flex-col justify-center items-center">
          <input
            className="mt-3 px-2 py-2 rounded-lg text-[#9b9b9a] bg-[rgba(47,47,47,255)] w-60  border-none focus:outline-none"
            type="text"
            placeholder="Enter the Name"
            id="urlInput"
          />

          <input
            className="mt-3 px-2 py-2 rounded-lg text-[#9b9b9a] bg-[rgba(47,47,47,255)] w-60  border-none focus:outline-none"
            type="text"
            placeholder="Enter the URL to block"
            id="urlInput"
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
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className=" text-base font-medium">
            Select Days to block the website
          </h3>
        </div>

        <div className="mt-2 ml-4 text-base">
          <div className="flex space-x-2">
            <button
              id="Monday"
              onClick={() => toggleDay(0)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                selectedDays[0]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              M
            </button>
            <button
              id="Tuesday"
              onClick={() => toggleDay(1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                selectedDays[1]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              T
            </button>
            <button
              id="Wednesday"
              onClick={() => toggleDay(2)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                selectedDays[2]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              W
            </button>
            <button
              id="Thru"
              onClick={() => toggleDay(3)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                selectedDays[3]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              T
            </button>
            <button
              id="Friday"
              onClick={() => toggleDay(4)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                selectedDays[4]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              F
            </button>
            <button
              id="Sat"
              onClick={() => toggleDay(5)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                selectedDays[5]
                  ? "bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              S
            </button>
            <button
              id="Sunday"
              onClick={() => toggleDay(6)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                selectedDays[6]
                  ? "bg-bg-[rgb(35,35,35)] border  border-white"
                  : "bg-[rgba(47,47,47,255)]"
              }`}
            >
              S
            </button>
          </div>
          <div className="mt-6">
            <button
              id="submitButton"
              onClick={clickHandler}
              className="bg-[rgba(47,47,47,255)] -ml-4 px-2 py-1 rounded-md hover:cursor-pointer hover:bg-[rgb(57,57,57)]"
            >
              Submit
            </button>
          </div>
        </div>

        {isOverlay && (
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
        )}
      </div>

      <div>{backendMessage}</div>
    </>
  );
};

export default BlockForm;
