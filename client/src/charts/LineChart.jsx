import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const LineChart = ({ data }) => {
  console.log(data);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to take the full height of its container
    plugins: {
      legend: {
        display: false // Hide the legend
      }
    },
    borderWidth: 0.8,
    borderColor: data.datasets[0].bgColor,
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

  // Calculate the width based on the number of labels
  const labelCount = data.labels.length;
  const chartWidth = labelCount * 50; // 50px per label, adjust as needed

  return (
    <div className="w-full py-5 overflow-x-scroll">
      <div className="relative h-[200px]" style={{ width: `${chartWidth}px` }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
