import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const UserActivity = () => {
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mk-be-strapi-production.up.railway.app/api/all-patients`
        );
        if (response.status >= 200 && response.status < 300) {
          setUsersData(response.data);
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
      {usersData.map((user) => (
        <div key={user.id}>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.username}</p>
          <h3>Number of Patients: {user.patients.length}</h3>
          <ul>
            {user.patients.map((patient) => (
              <li key={patient.id}>
                {patient.firstName} {patient.lastName}
                <ul>
                  {patient.vaccinations.map((rft, index) => (
                    <li key={index}>
                      <div className="text-sm text-gray-900">
                      {rft.vaccinations.length()}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserActivity;
