import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import Navbar from "../Navbar/Index";
import { useAuth } from "../../context/AuthContext";

const NotificationsTable = () => {
  const [sidebarToggle] = useOutletContext();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { updateNotificationCount } = useAuth();

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const renalPatientsCount = patients.length;


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
                <h1 className="text-2xl font-bold p-8 text-center font-extrabold underline underline-offset-1">
                  Critical Patients{" "}
                </h1>
              </article>
              <Notifications renalPatientsCount={renalPatientsCount} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default NotificationsTable;
