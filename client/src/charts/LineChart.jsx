import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
 
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ],
  datasets: [
    {
      
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
        fill: false,
     
      tension: 0.1,
      
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false // Hide the legend
    }
  },
  
  borderWidth:0.8,
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
        }
    }
}
};

const LineChart = () => {
  return (
    <div className="w-full py-5 overflow-x-scroll ">
      
      <div className="w-[500px] h-[200px]">
      <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
