import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic({ ...props }) {
  const [patientData, setPatientData] = useState(Array.from({ length: 12 }, () => 0)); // Default for 12 months

  useEffect(() => {
    const apiUrl = `https://mk-be-strapi-production.up.railway.app/api/users?populate=patients`; // Ensure patients are populated under users
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Initialize an array to store patient counts for each month
        const patientCounts = Array.from({ length: 12 }, () => 0);

        // Loop through each user
        data.forEach((user) => {
          // Loop through the user's patients
          if (user.patients && user.patients.length > 0) {
            user.patients.forEach((patient) => {
              const createdAt = new Date(patient.createdAt);
              const month = createdAt.getMonth(); // Get month (0 for Jan, 11 for Dec)
              if (!isNaN(month)) {
                patientCounts[month]++; // Increase the count for the respective month
              }
            });
          }
        });

        setPatientData(patientCounts); // Update state with the patient counts
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, []);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Patients",
        data: patientData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Ensure y-axis starts from 0
        suggestedMax: Math.max(...patientData) + 10, // Adjust max based on data
      },
    },
  };

  return (
    <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
      <h1 className="text-medium font-semibold pb-4">Patients Enrolled</h1>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic;
