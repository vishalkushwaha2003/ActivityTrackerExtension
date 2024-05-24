import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false // Hide the legend
      }
    },
    borderWidth: 0.8,
    borderColor: "white",
    scales: {
      x: {
        grid: {
          color: 'rgba(51, 65, 85, 0.14)' // Change the color of the x-axis grid lines
        }
      },
      y: {
        grid: {
          color: 'rgba(51, 65, 85, 0.14)' // Change the color of the y-axis grid lines
        },
        min: 0,
        max: 30 // Adjust this based on your expected data range
      }
    }
  };

  return (
    <div className="w-full py-5 overflow-x-scroll">
      <div className="w-[500px] h-[200px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
