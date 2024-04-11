import React from "react";

const Notifications = ({ renalPatientsCount }) => {
  return (
    <div>
      <h2>Notifications</h2>
      <p>Number of renal patients: {renalPatientsCount}</p>
    </div>
  );
};

export default Notifications;
