import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function PatientDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { patient } = location.state || {};

  useEffect(() => {
    // Simulate data retrieval (replace with your actual logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust timeout as needed
  }, []); // Empty dependency array to run only once after mount

  return (
    <div className="patient-details">
      {isLoading ? (
        <div className="loader">Loading patient details...</div>
      ) : (
        <h2>{patient.firstName} {patient.lastName || "N/A"}</h2>
      )}
    </div>
  );
}

export default PatientDetails;
