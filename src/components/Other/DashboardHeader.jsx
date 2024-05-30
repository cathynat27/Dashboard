import {
  faBars,
  faBell,
  faCog,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function DashboardHeader({ user, avatar, toggle }) {
  const { notificationCount, updateNotificationCount } = useAuth();
  const [patients, setPatients] = useState([]);
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
    <div className="px-3 sm:px-8 pt-9 pb-4 flex flex-wrap w-full justify-between items-center">
      <div className="flex flex-row gap-3">
        <p className="flex-shrink-0 rounded-full block md:hidden border border-sky-400 p-[3px] shadow-lg">
          <img
            className="rounded-full md:h-14 md:w-14 h-10 w-10 border cursor-pointer"
            src={avatar}
            alt="Avatar"
          />
        </p>
        <div id="nameSection">
          <p className="text-sm font-semibold text-gray-500">Welcome back,</p>
          <h1 className="font-medium lg:text-3xl text-2xl text-gray-700">
            {user?.name}
          </h1>
        </div>
      </div>
      <div className="avaterSection flex items-center gap-2 sm:gap-6 text-slate-400">
        <div className="hidden md:flex flex-row gap-4 text-xl">
          <Link to="/">
            <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
          </Link>
          <Link to="/notifcations">
            <span className="relative h-9 w-9 cursor-pointer text-gray-600">
              <FontAwesomeIcon className="text-2xl" icon={faBell} />
              {totalTestsCount > 0 && (
                <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white px-1 text-xs">
                  {totalTestsCount}
                </span>
              )}
            </span>
          </Link>
          <Link to="/chat">
            <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
          </Link>
        </div>
        <p className="rounded-full hidden md:block border border-sky-400 p-[3px] shadow-lg">
          <img
            className="rounded-full md:h-14 md:w-14 h-10 w-10 border cursor-pointer"
            src={avatar}
            alt="Avatar"
          />
        </p>

        <p className="cursor-pointer md:hidden text-2xl" onClick={toggle}>
          <FontAwesomeIcon icon={faBars} />
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;
