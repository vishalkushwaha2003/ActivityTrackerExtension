/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import EditIcon from "@mui/icons-material/Edit";
import BlockFormOnEdit from "../BlockFormOnEdit";

ChartJS.register(ArcElement, Tooltip, Legend);

const BlockCard = ({ url, startTime, endTime, days, name }) => {
  const [isEdit, setIsEdit] = useState(false);

  const timeToMinutes = (time) => {
    const [hour, minutes] = time.split(":").map(Number);
    return hour * 60 + minutes;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalMinutes = endMinutes - startMinutes;
  const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const passedMinutes = currentMinutes - startMinutes;
  let remainingMinutes = totalMinutes - passedMinutes;

  if (remainingMinutes < 0) remainingMinutes = 0;
  console.log(name + " " + passedMinutes + " " + remainingMinutes);

  const data = {
    labels: ["Time passed", "Time Remaining"],
    datasets: [
      {
        label: "Time",
        data: [passedMinutes, remainingMinutes],
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(47, 47, 47, 255)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(47, 47, 47, 255)"],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: false,
    },
    cutout: "80%",
    elements: {
      arc: {
        hoverOffset: 15, // Increase the hover offset to scale the segment
      },
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 15,
        right: 15,
      },
    },
  };

  const gaugeLabels = {
    id: "gaugeLabels",
    beforeDatasetDraw(chart, args, pluginOptions) {
      const {
        ctx,
        chartArea: { left, right, bottom },
      } = chart;

      ctx.save();

      function labels(text, alignment, positionX, offsetX, offsetY) {
        ctx.font = "bold 15px sans-serif";
        ctx.fillStyle = "#9b9b9a";
        ctx.textBaseline = "bottom";
        ctx.textAlign = alignment;
        ctx.fillText(text, positionX + offsetX, bottom + offsetY);
      }

      labels(startTime, "left", left, -12, -10);
      labels(endTime, "right", right, 14, -10);
    },
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsEdit(false);
  };

  const activeButtonStyle = {
    borderColor: "rgba(54, 162, 235, 1)",
    color: "rgba(54, 162, 235, 1)",
  };

  const inActiveButtonStyle = {
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: "rgba(255, 255, 255, 0.3)",
  };

  return (
    <div>
      <div className="bg-card-blur m-4 w-60 h-52 rounded-lg shadow-lg relative">
        <div className="bg-card-content flex flex-col items-center">
          <div
            onClick={handleEdit}
            className="text-[#9b9b9a] absolute right-3 top-3 text-sm hover:cursor-pointer bg-transparent"
          >
            <EditIcon />
          </div>

          <div className="text-[#9b9b9a] text-base">{name}</div>

          <div className="w-60 h-32 -mt-4 flex justify-center">
            <Doughnut data={data} options={options} plugins={[gaugeLabels]} />
          </div>

          <div className="flex justify-center space-x-2 mt-2">
            <button
              className="w-6 h-6 border rounded-full flex items-center justify-center"
              style={days[0] ? activeButtonStyle : inActiveButtonStyle}
            >
              M
            </button>
            <button
              style={days[1] ? activeButtonStyle : inActiveButtonStyle}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              T
            </button>
            <button
              style={days[2] ? activeButtonStyle : inActiveButtonStyle}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              W
            </button>
            <button
              style={days[3] ? activeButtonStyle : inActiveButtonStyle}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              T
            </button>
            <button
              style={days[4] ? activeButtonStyle : inActiveButtonStyle}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              F
            </button>
            <button
              style={days[5] ? activeButtonStyle : inActiveButtonStyle}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              S
            </button>
            <button
              style={days[6] ? activeButtonStyle : inActiveButtonStyle}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              S
            </button>
          </div>
        </div>
      </div>

      {isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[rgba(20,20,20,255)] p-4 rounded-md shadow-md flex flex-col items-center w-[90%] h-[80%]">
            <h1 className="text-base text-[#9b9b9a] mb-4 text-center">
              Edit {name}
            </h1>
            <BlockFormOnEdit
              name={name}
              url={url}
              startTime={startTime}
              endTime={endTime}
              days={days}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockCard;
