import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Index";

const UserActivity = () => {
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarToggle] = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mk-be-strapi-production.up.railway.app/api/all-patients`
        );
        if (response.status >= 200 && response.status < 300) {
          // Count number of patients for each user
          const updatedUsersData = response.data.map((user) => ({
            ...user,
            numberOfPatients: user.patients.length,
          }));
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar toggle={sidebarToggle} />
      <h3 className=" flex justify-center font-semibold text-2xl items-center text-sky-500 px-4 py-6">
        USER ACTIVITY{" "}
      </h3>
      {usersData.map((user) => (
        <div key={user.id} className="mainCard">
          <div className="border border-gray-200 bg-white p-4 rounded-md">
            <h2 className="px-6 py-3 text-left text-base font-bold text-black-500 uppercase tracking-wider">
              {user.firstName} {user.lastName}
            </h2>
            <p className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Phone Number: {user.username}
            </p>
            <h3 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Number of Patients: {user.numberOfPatients}
            </h3>
            {/* <ul>
              {user.patients.map((patient) => (
                <li key={patient.id}>
                  {patient.firstName} {patient.lastName}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserActivity;
