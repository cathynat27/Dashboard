import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import ScreeningUserTable from "./ScreeningUserTable";
import { useNavigate } from "react-router-dom";

function ScreeningTable() {
  const [sidebarToggle] = useOutletContext();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "https://mk-be-strapi-production.up.railway.app/api/all-patients"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPatients(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchPatients();
  }, []);
  

  const dataHeader = [
    {
      key: "id",
      label: "Beneficiary ID",
    },

    {
      key: "gender",
      label: "Gender",
    },

    {
      key: "action",
      label: "Action",
    },
  ];

  const handleDelete = () => {};

// Previous Component (e.g., ScreeningUserTable)
const handleViewDetails = (patient) => {
  navigate(`/screening/${patient.id}`, {
    state: { patient, fetchPatientDetails: async () => { } }, // Pass async function for fetching data
  });
};

  
  

  return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard">
          <div className="border border-gray-200 bg-white p-4 rounded-md">
            {loading ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error.message}</div>
            ) : (
              <div>
                <article>
                  <h1 className="text-2xl font-bold p-8 text-center font-extrabold underline underline-offset-1">
                    Renal Screening Tests
                  </h1>
                </article>
                <ScreeningUserTable
                  dataHeader={dataHeader}
                  data={patients}
                  handleDelete={handleDelete}
                  handleViewDetails={handleViewDetails}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default ScreeningTable;
