'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/User';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export default function MultiChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Predicted',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Actual',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      }
    ]
  });

  const { user, loading } = useUser();

  const fetchData = async () => {
    if (user.access_token){
        try {
          const response = await fetch('http://localhost:5000/waste/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + user.access_token
            },
            body: JSON.stringify({ date: '15/07/2024' }), // Adjust date as needed
          });
          if (!response.status === 200) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          const labels = data.map(item => item.date);
          const predictedLevels = data.map(item => item.predicted_level);
          setChartData({
            labels: labels,
            datasets: [
              {
                ...chartData.datasets[0],
                data: predictedLevels,
              },
              {
                ...chartData.datasets[0],
                data: predictedLevels,
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
  };

  useEffect(() => {
    console.log("user", user)
    fetchData();
  }, [loading]);

  return <Line options={options} data={chartData} />;
}