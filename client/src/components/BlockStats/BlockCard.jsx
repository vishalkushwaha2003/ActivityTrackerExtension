/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BlockCard = ({ url, startTime, endTime, days }) => {
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
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(47,47,47,255)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(47,47,47,255)"],
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
        ctx.font = "bold 25px sans-serif";
        ctx.fillStyle = "#9b9b9a";
        ctx.textBaseline = "bottom";
        ctx.textAlign = alignment;
        ctx.fillText(text, positionX + offsetX, bottom + offsetY);
      }

      labels("0", "left", left, 12, -18); // 10px to the right, 10px up
      labels("9", "right", right, -16, -18); // 10px to the left, 10px up
    },
  };

  return (
    <div className="">
      <div>{url}</div>
      <div>
        <Doughnut data={data} options={options} plugins={[gaugeLabels]} />
      </div>
    </div>
  );
};

export default BlockCard;
