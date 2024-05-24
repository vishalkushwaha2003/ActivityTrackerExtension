import React, { useState } from 'react';
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';

const InteractionCharts = () => {
  const [lineData, setLineData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      tension: 0.1,
    }]
  });

  const handleSegmentClick = (index) => {
    const newData = [
      [15, 30, 10, 18, 20, 2,17],
      [4, 16, 8, 28, 3, 21, 12],
      [12, 2, 19, 3, 26, 6, 16],
      [2, 25, 5, 28, 1, 18, 10],
      [26, 6, 19, 29, 9, 18, 3],
      [6, 24, 10, 22, 19, 2, 29],
    ];
    
    setLineData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [{
        data: newData[index],
        fill: false,
        tension: 0.1,
      }]
    });
  };

  return (
    <div>
      <DoughnutChart onSegmentClick={handleSegmentClick} />
      <LineChart data={lineData} />
    </div>
  );
};

export default InteractionCharts;
