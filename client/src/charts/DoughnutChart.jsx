import React, { useRef, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ onSegmentClick }) => {
  const chartRef = useRef(null);
  const [total, setTotal] = useState(0);
  const totalRef = useRef(total);

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Dataset 1',
      data: [20, 150, 2, 700, 29, 140],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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

  useEffect(() => {
    const chart = chartRef.current;
    const totalValue = chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

    const incrementTotal = (start, end, duration) => {
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const animatedTotal = Math.round(start + (end - start) * progress);
        setTotal(animatedTotal);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTotal(end); // Ensure the final value is set
        }
      };

      requestAnimationFrame(animate);
    };

    chart.options.animation = {
      onProgress: () => {
        incrementTotal(0, totalValue, 1000); // Animate over 1 second
      },
    };

    chart.update();
  }, []);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  const totalCenterPlugin = {
    id: 'totalCenterPlugin',
    beforeDraw: function(chart) {
      const { ctx, chartArea: { top, bottom, left, right } } = chart;
      ctx.save();
      
      // Calculate positions
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      
      // Draw the total value
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(totalRef.current, centerX, centerY - 8); // Adjust y-position for spacing
      
      // Draw the "min" label
      ctx.font = '12px Arial';
      ctx.fillStyle = 'yellow'; // Change color for "min"
      ctx.fillText('min', centerX, centerY + 12); // Adjust y-position for spacing

      ctx.restore();
    }
  };

  const options = {
    responsive: true,
    cutout: "80%", // Adjusted cutout percentage for more visible padding
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(22,22,22,1)',
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
    },
   
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    elements: {
      arc: {
        hoverOffset: 15, // Increase the hover offset to scale the segment
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-transparent">
      <div className="h-[200px] mt-9">
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

export const doughnutChartData = [20, 150, 2, 700, 29, 140] // Export the total data
