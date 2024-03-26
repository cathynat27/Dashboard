import React, { useState, useEffect } from "react";

function PatientDetails({ match }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const patientId = match.params.id;
      try {
        const response = await fetch(
          `https://your-api-url/patients/${patientId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patient details");
        }
        const data = await response.json();
        setPatient(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Patient Details</h1>
      {patient && (
        <div>
          <h2>{patient.firstName} {patient.lastName}</h2>
          <p>Gender: {patient.gender}</p>
          {/* Other patient information */}
          <h3>Renal Functional Test Results</h3>
          <ul>
            {patient.rfts.map((rft, index) => (
              <li key={index}>
                CKDStage: {rft.rftData.ckdStage}, eGFR: {rft.rftData.eGFR} mmol/L
              </li>
            ))}
          </ul>
          {/* Other test results and medical information */}
        </div>
      )}
    </div>
  );
}

export default PatientDetails;
