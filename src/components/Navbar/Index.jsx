import { faBars, faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Index({ toggle }) {
  const avatar =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const { notificationCount, updateNotificationCount } = useAuth();
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
  updateNotificationCount(renalPatientsCount);

  return (
    <>
      <header className="">
        <div className="shadow-sm">
          <div className="relative bg-white flex w-full items-center px-5 py-2.5">
            <div className="flex-1">
              <p className="block md:hidden cursor-pointer">
                <FontAwesomeIcon icon={faBars} onClick={toggle} />
              </p>
            </div>
            <div className="">
              <ul className="flex flex-row gap-4 items-center">
                <li>
                  <Link to="/chat">
                    {" "}
                    <span className="h-9 w-9 cursor-pointer text-gray-600">
                      <FontAwesomeIcon icon={faMessage} />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/notifications">
                    <span className="relative h-9 w-9 cursor-pointer text-gray-600">
                      <FontAwesomeIcon className="text-lg" icon={faBell} />
                      {notificationCount > 0 && (
                        <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white px-1 text-xs">
                          {notificationCount}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
                <li>
                  <span>
                    <img
                      className="rounded-full h-9 w-9 border cursor-pointer"
                      src={avatar}
                      alt="Avatar"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Index;
