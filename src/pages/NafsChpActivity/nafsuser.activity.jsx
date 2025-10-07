import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt, faSpinner, faUsers, faUser, faStethoscope, faSyringe, faBaby } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Index";
import { useAuth } from "../../context/AuthContext";

const NafsUserActivity = () => {
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarToggle] = useOutletContext();
  const { setSelectedUser } = useAuth();
  
  // Define the date range: October 7, 2024 to May 1, 2025
  const cutOffDate = new Date("2024-10-07T00:00:00Z");
  const endDate = new Date("2025-05-01T23:59:59Z");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mk-be-strapi-production.up.railway.app/api/all-patients`
        );
        if (response.status >= 200 && response.status < 300) {
          // Process the data
          const updatedUsersData = response.data
            .map((user) => {
              // Filter patients based on date range (Oct 2024 - May 2025)
              const filteredPatients = user.patients.filter(patient => {
                const patientDate = new Date(patient.createdAt);
                return patientDate >= cutOffDate && patientDate <= endDate;
              });
  
              // Utility function to count items added within the date range
              const countItemsInDateRange = (patients, field) => {
                return patients.reduce((total, patient) => {
                  const filteredItems = patient[field].filter(item => {
                    const itemDate = new Date(item.createdAt);
                    return itemDate >= cutOffDate && itemDate <= endDate;
                  });
                  return total + filteredItems.length;
                }, 0);
              };
  
              // Count for each category within the date range
              const totalDiagnoses = countItemsInDateRange(user.patients, 'diagnoses');
              const totalAntenantals = countItemsInDateRange(user.patients, 'antenantals');
              const totalVaccinations = countItemsInDateRange(user.patients, 'vaccinations');
              const totalRenalHistories = countItemsInDateRange(user.patients, 'renal_histories');
              const totalRfts = countItemsInDateRange(user.patients, 'rfts');
              const totalMonitorings = countItemsInDateRange(user.patients, 'monitorings');
              const totalDrugs = countItemsInDateRange(user.patients, 'drugs');
  
              return {
                ...user,
                numberOfPatients: filteredPatients.length,
                numberOfDiagnoses: totalDiagnoses,
                numberOfAntenantals: totalAntenantals,
                numberOfVaccinations: totalVaccinations,
                numberOfRenalHistories: totalRenalHistories,
                numberOfRfts: totalRfts,
                numberOfMonitorings: totalMonitorings,
                numberOfDrugs: totalDrugs,
              };
            })
            // Filter out users with no patients within the date range
            .filter(user => user.numberOfPatients > 0);
  
          setUsersData(updatedUsersData);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );

  // Calculate totals for summary cards
  const totalPatients = usersData.reduce((sum, user) => sum + user.numberOfPatients, 0);
  const totalVaccinations = usersData.reduce((sum, user) => sum + user.numberOfVaccinations, 0);
  const totalDiagnoses = usersData.reduce((sum, user) => sum + user.numberOfDiagnoses, 0);
  const totalAntenantals = usersData.reduce((sum, user) => sum + user.numberOfAntenantals, 0);

  return (
    <div>
      <Navbar toggle={sidebarToggle} />
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <img 
              src="/logow.jpg" 
              alt="NAFS Logo" 
              className="h-28 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            <FontAwesomeIcon icon={faUsers} className="mr-3 text-sky-500" />
            NASF PROJECT
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-3xl text-green-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faSyringe} className="text-3xl text-orange-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vaccinations</p>
                <p className="text-2xl font-bold text-gray-900">{totalVaccinations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faStethoscope} className="text-3xl text-red-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Diagnoses</p>
                <p className="text-2xl font-bold text-gray-900">{totalDiagnoses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBaby} className="text-3xl text-purple-600 mr-4" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Antenatals</p>
                <p className="text-2xl font-bold text-gray-900">{totalAntenantals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usersData.map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 bg-white p-4 rounded-lg drop-shadow-xl"
          >
            <h2 className="px-6 py-3 text-left text-base font-bold text-black-500 uppercase tracking-wider">
              {user.firstName} {user.lastName}
            </h2>
           
            <h3 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              New Patients: {user.numberOfPatients}
            </h3>
            <h3 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Diagnoses: {user.numberOfDiagnoses}
            </h3>
            <h3 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Antenantals: {user.numberOfAntenantals}
            </h3>
            <h3 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Vaccinations: {user.numberOfVaccinations}
            </h3>
           
            <Link
              className="flex p-6"
              to="/chat"
              onClick={() => setSelectedUser(user)}
            >
              <button className="hover:bg-sky-600 focus:outline-none bg-sky-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
                Chat with CHP
              </button>
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default NafsUserActivity;
