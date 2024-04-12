import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic({ ...props }) {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const apiUrl = `https://mk-be-strapi-production.up.railway.app/api/patients`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Initialize an array to store patient counts for each month
        const patientCounts = Array.from({ length: 12 }, () => 0);

        // Calculate the number of patients enrolled in each month
        data.data.forEach((patient) => {
          const month = new Date(patient.attributes.createdAt).getMonth();
          patientCounts[month]++;
        });

        setPatientData(patientCounts);
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
    aspectRatio: 2,
    scales: {
      y: {
        suggestedMax: Math.max(...patientData) + 10, // Adjust the suggested max based on the maximum patient count
      },
    },
  };

  return (
    <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
      <h1 className="text-medium font-semibold pb-4">Patients Enrolled</h1>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic;
