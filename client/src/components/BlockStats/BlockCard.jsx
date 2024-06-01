/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import axios from "axios";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import EditIcon from "@mui/icons-material/Edit";

ChartJS.register(ArcElement, Tooltip, Legend);

const BlockCard = ({ url, startTime, endTime, days, name }) => {
  const timeToMinutes = (time) => {
    const [hour, minutes] = time.split(":").map(Number);
    return hour * 60 + minutes;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalMinutes = endMinutes - startMinutes;
  const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const passedMinutes = currentMinutes - startMinutes;
  const remainingMinutes = totalMinutes - passedMinutes;

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
    },
    cutout: "80%",
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

      labels("0", "left", left, 4, -10);
      labels("9", "right", right, -4, -10);
    },
  };

  const handleEdit = () => {
    //call to backend for updating the block item
  };

  return (
    <div className="bg-card-blur m-4 w-60 h-52 rounded-lg shadow-lg">
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
            style={{
              borderColor: "rgba(54, 162, 235, 1)",
              color: "rgba(54, 162, 235, 1)",
            }}
          >
            M
          </button>
          <button
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "rgba(255, 255, 255, 0.3)",
            }}
            className="w-6 h-6 border rounded-full flex items-center justify-center"
          >
            T
          </button>
          <button
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "rgba(255, 255, 255, 0.3)",
            }}
            className="w-6 h-6 border rounded-full flex items-center justify-center"
          >
            W
          </button>
          <button
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "rgba(255, 255, 255, 0.3)",
            }}
            className="w-6 h-6 border rounded-full flex items-center justify-center"
          >
            T
          </button>
          <button
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "rgba(255, 255, 255, 0.3)",
            }}
            className="w-6 h-6 border rounded-full flex items-center justify-center"
          >
            F
          </button>
          <button
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "rgba(255, 255, 255, 0.3)",
            }}
            className="w-6 h-6 border rounded-full flex items-center justify-center"
          >
            S
          </button>
          <button
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "rgba(255, 255, 255, 0.3)",
            }}
            className="w-6 h-6 border rounded-full flex items-center justify-center"
          >
            S
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockCard;
