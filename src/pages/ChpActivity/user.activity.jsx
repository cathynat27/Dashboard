import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";
import Navbar from "../../components/Navbar/Index";
import { useAuth } from "../../context/AuthContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UserActivity = () => {
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarToggle] = useOutletContext();
  const { setSelectedUser } = useAuth();

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

  return (
    <div>
      <Navbar toggle={sidebarToggle} />
      <h3 className="flex justify-center font-semibold text-2xl items-center text-sky-500 px-4 py-6">
        USER ACTIVITY
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {usersData.map((user) => (
          <div
            key={user.id}
            className="border border-gray-200 bg-white p-4 rounded-lg drop-shadow-xl"
          >
            <h2 className="px-6 py-3 text-left text-base font-bold text-black-500 uppercase tracking-wider">
              {user.firstName} {user.lastName}
            </h2>
            <p className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Phone Number: {user.username}
            </p>
            <h3 className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
              Number of Patients: {user.numberOfPatients}
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

            {/* <ul>
              {user.patients.map((patient) => (
                <li key={patient.id}>
                  {patient.firstName} {patient.lastName}
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivity;
