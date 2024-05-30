import { faBars, faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../assets/images/avatar.jpg";

function Index({ toggle }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monitoringCount, setMonitoringCount] = useState(0);
  const [screeningCount, setScreeningCount] = useState(0);
  const [rftCount, setRftCount] = useState(0);

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
                      <FontAwesomeIcon className="text-2xl" icon={faMessage} />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/notifcations">
                    <span className="relative h-9 w-9 cursor-pointer text-gray-600">
                      <FontAwesomeIcon className="text-2xl" icon={faBell} />
                      {totalTestsCount > 0 && (
                        <p className="absolute top-0 right-0 rounded-full bg-red-500 text-white px-1 text-xs">
                          {totalTestsCount}
                        </p>
                      )}
                    </span>
                  </Link>
                </li>
                <li>
                  <span>
                    <img
                      className="rounded-full h-9 w-9 border cursor-pointer"
                      src={Avatar}
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
