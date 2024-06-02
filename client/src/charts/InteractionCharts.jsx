import React, { useState } from 'react';
import DoughnutChart, { doughnutChartData } from './DoughnutChart';
import LineChart from './LineChart';

const InteractionCharts = () => {
  // Initialize line chart data with the total data from doughnut chart
  const initialLineData = doughnutChartData;
  const initialBgColor = 'rgba(255, 255, 255, 1)'; // Color matching the first segment
  const [index, setIndex] = useState(null);
 
  const [lineData, setLineData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      data: initialLineData,
      bgColor: initialBgColor,
      fill: false,
      tension: 0.1,
    }]
  });

  const handleSegmentClick = (index) => {
    const newData = [
      [15, 30, 10, 18, 20, 2, 17],
      [4, 16, 8, 28, 3, 21, 12],
      [12, 2, 19, 3, 26, 6, 16],
      [2, 25, 5, 28, 1, 18, 10],
      [26, 6, 19, 29, 9, 18, 3],
      [6, 24, 10, 22, 19, 2, 29],
    ];

    const backgroundColor = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ];
    setIndex(index);
    setLineData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "vish"],
      datasets: [{
        data: newData[index],
        bgColor: backgroundColor[index],
        fill: false,
        tension: 0.1,
      }]
    });
  };

  return (
    <div>
      <DoughnutChart onSegmentClick={handleSegmentClick} />
      <div className="flex py-1 justify-center items-center bg-transparent" style={{ color: lineData.datasets[0].bgColor }}>
        
        {index?lineData.labels[index]:'Today Data'}
      </div>
      <LineChart data={lineData} />
    </div>
  );
};

export default InteractionCharts;
