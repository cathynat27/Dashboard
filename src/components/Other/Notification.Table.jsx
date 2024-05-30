import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import Navbar from "../Navbar/Index";
import { useAuth } from "../../context/AuthContext";

const NotificationsTable = () => {
  const [sidebarToggle] = useOutletContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monitoringCount, setMonitoringCount] = useState(0);
  const [screeningCount, setScreeningCount] = useState(0);
  const [rftCount, setRftCount] = useState(0);

  const { userNames } = useAuth();
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://mk-be-strapi-production.up.railway.app/api/all-patients`
      );
      const data = await response.json();
      const allPatients = data.map((user) => user.patients).flat();

      // Calculate patients under monitoring, screening, and RFT
      let monitoring = 0;
      let screening = 0;
      let rft = 0;

      allPatients.forEach((patient) => {
        monitoring += patient.monitorings ? patient.monitorings.length : 0;
        screening += patient.renal_histories
          ? patient.renal_histories.length
          : 0;
        rft += patient.rfts ? patient.rfts.length : 0;
      });
      setMonitoringCount(monitoring);
      setScreeningCount(screening);
      setRftCount(rft);

      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalTestsCount = screeningCount + monitoringCount + rftCount;

  return (
    <main className="h-full">
      <Navbar toggle={sidebarToggle} />
      <div className="mainCard">
        <div className="border border-gray-200 bg-white p-4 rounded-md">
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error.message}</div>
          ) : (
            <div>
              <article>
                <h1 className="text-2xl font-bold mb-4 px-6 py-3 text-black-900 uppercase tracking-wider text-center">
                  Critical Patients{" "}
                </h1>
              </article>
              <Notifications
                renalPatientsCount={monitoringCount}
                rftPatientCount={rftCount}
                screeningPatientCount={screeningCount}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default NotificationsTable;
