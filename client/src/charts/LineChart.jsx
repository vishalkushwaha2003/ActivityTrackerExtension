import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  // Calculate the maximum value from the data
  const maxDataValue = Math.max(...data.datasets[0].data);
  const yAxisMax = maxDataValue + (maxDataValue * 0.1); // Adding 10% padding to max value

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to take the full height of its container
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    borderWidth: 0.8,
    borderColor: data.datasets[0].bgColor,
    scales: {
      x: {
        grid: {
          color: 'rgba(51, 65, 85, 0.14)', // Change the color of the x-axis grid lines
        },
        ticks: {
          callback: function(value, index, ticks) {
            const label = this.getLabelForValue(value);
            return label.length > 10 ? label.slice(0, 10) + '...' : label; // Truncate long labels
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(51, 65, 85, 0.14)', // Change the color of the y-axis grid lines
        },
        min: 0,
        max: yAxisMax, // Adjust based on the max value of the data
      },
    },
  };

  // Calculate the width based on the number of labels
  const labelCount = data.labels.length;
  const chartWidth = labelCount * 50; // 50px per label, adjust as needed

  return (
    <div className="w-full  overflow-x-auto">
      <div className="relative h-[200px] overflow-y-auto" style={{ width: `${chartWidth}px` }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
