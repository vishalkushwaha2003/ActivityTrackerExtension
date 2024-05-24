import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ onSegmentClick }) => {
  const chartRef = useRef(null);

  const totalCenterPlugin = {
    id: 'totalCenterPlugin',
    beforeDraw: function(chart) {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
  
      const total = chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
      ctx.fillText(total, width / 2, height / 2);
      ctx.restore();
    }
  };

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Dataset 1',
      data: [300, 50, 100, 75, 125, 150],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 0.1,
    }]
  };

  const options = {
    responsive: true,
    cutout: "80%",
    plugins: {
      legend: {
        display:false,
      },
      tooltip: {
        backgroundColor: '#424242',
        titleColor: '#fff',
        bodyColor: '#fff',
        footerColor: '#fff'
      }
    },
    onClick: (e, activeElements) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        onSegmentClick(index);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-transparent">
      <div className="h-[200px] py-8 mt-10">
        <Doughnut data={data} options={options} plugins={[totalCenterPlugin]} ref={chartRef} />
      </div>
      <div className="px-2 w-full cursor-grab overflow-x-auto">
        <div className="flex mb-4 space-x-4">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              ></span>
              <span className="text-white">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
