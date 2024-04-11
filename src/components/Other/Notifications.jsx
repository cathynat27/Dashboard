import React from "react";
import { Link } from "react-router-dom";

const Notifications = ({
  renalPatientsCount,
  rftPatientCount,
  screeningPatientCount,
}) => {
  return (
    <div>
      <Link to="/monitoring">
        <p className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
          Number of Monitoring patients: {renalPatientsCount}
        </p>
      </Link>

      <Link to="/renal">
        <p className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
          Number of Renal patients: {rftPatientCount}
        </p>
      </Link>

      <Link to="/screening">
        <p className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
          Number of Renal patients: {screeningPatientCount}
        </p>
      </Link>

      <div className="flex justify-center">
        <button className="bg-sky-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm">
          Chat with the CHP{" "}
        </button>
      </div>
    </div>
  );
};

export default Notifications;
