'use client'
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/User';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

const PredictionChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Predicted Levels',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
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
          const labels = data.map(item => item.date);
          const predictedLevels = data.map(item => item.predicted_level);
          // setChartData({
          //   labels: labels,
          //   datasets: [
          //     {
          //       ...chartData.datasets[0],
          //       data: predictedLevels,
          //     },
          //   ],
          // });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log("user", user)
    fetchData();
  }, [loading]);

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Predicted Levels Over Time</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Predicted Levels Over Time',
            },
            legend: {
              display: true,
              position: 'top',
            },
          },
        }}
      />
    </div>
  );
};

export default PredictionChart;
