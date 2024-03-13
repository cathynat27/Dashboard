import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import DiagnosisUserTable from "./Diagnosis.User.Table";
function DiagnosisTable() {
  const [sidebarToggle] = useOutletContext();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      key: "condition",
      label: "Condition",
    },
    {
      key: "signs",
      label: "Signs and Symptoms",
    },
    {
      key: "date",
      label: "Date of Diagnosis",
    },

    {
      key: "action",
      label: "Action",
    },
  ];

  const handleDelete = () => {};

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
                    Diagnosis Beneficaries
                  </h1>
                </article>
                <DiagnosisUserTable
                  dataHeader={dataHeader}
                  data={patients}
                  handleDelete={handleDelete}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default DiagnosisTable;
