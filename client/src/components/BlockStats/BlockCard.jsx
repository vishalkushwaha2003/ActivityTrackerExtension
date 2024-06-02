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
  const today = (new Date().getDay() + 6) % 7;

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

  const red = "rgba(255, 99, 132, 1)";
  const green = "rgba(75, 192, 192, 1)";
  const gaugeColor =
    remainingMinutes === 0 ? [green, red] : [red, "rgba(47,47,47,255)"];

  const data = {
    labels: ["Time passed", "Time Remaining"],
    datasets: [
      {
        label: "Time",
        data: [passedMinutes, remainingMinutes],
        backgroundColor: gaugeColor,
        borderColor: gaugeColor,
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
        hoverOffset: 15,
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
    borderColor: green,
    color: green,
  };

  const inActiveButtonStyle = {
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: "rgba(255, 255, 255, 0.3)",
  };

  const todayButtonStyle = {
    borderColor: red,
    color: red,
  };

  const styles = (day) => {
    return days[day]
      ? today === day
        ? remainingMinutes === 0
          ? activeButtonStyle
          : todayButtonStyle
        : activeButtonStyle
      : inActiveButtonStyle;
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
              style={styles(0)}
            >
              M
            </button>
            <button
              style={styles(1)}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              T
            </button>
            <button
              style={styles(2)}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              W
            </button>
            <button
              style={styles(3)}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              T
            </button>
            <button
              style={styles(4)}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              F
            </button>
            <button
              style={styles(5)}
              className="w-6 h-6 border rounded-full flex items-center justify-center"
            >
              S
            </button>
            <button
              style={styles(6)}
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
