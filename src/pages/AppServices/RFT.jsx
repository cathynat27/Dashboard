import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function UserTable({ loading, dataHeader, data, handleDelete }) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = data.slice(startIndex, startIndex + pageSize);

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <table className="table-fixed w-full">
        <thead>
          <tr>
            {dataHeader.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user) =>
            user.patients.map((patient) => {
              const rftDataAvailable = patient.rfts.length > 0;
              if (!rftDataAvailable) {
                return null; // Skip patients without RFT data
              }
              return (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.sex}</td>
                  <td>
                    <ul>
                      {patient.rfts.map((rft, index) => (
                        <li key={index}>
                          <div>
                            <strong>Weight:</strong> {rft.inspectionData.weight}{" "}
                            kgs
                          </div>
                          <div>
                            <strong>BMI:</strong> {rft.inspectionData.bmi}
                          </div>

                          <div>
                            <strong>Systolic Pressure:</strong>
                            {`${rft.inspectionData.bloodPressure.systolicPressure} mmHg`}
                          </div>
                          <div>
                            <strong>Diastolic Pressure:</strong>
                            {`${rft.inspectionData.bloodPressure.diastolicPressure} mmHg`}
                          </div>
                          <div>
                            <strong>Heart Pluse:</strong>
                            {`${rft.inspectionData.bloodPressure.heartPulse} beats/min`}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {patient.rfts.map((rft, index) => (
                        <li key={index}>
                          {rft.rftData && (
                            <div>
                              <div>
                                <strong>eGFR:</strong> {rft.rftData.eGFR}
                              </div>
                              <div>
                                <strong>Urea:</strong> {rft.rftData.urea} mmol/L
                              </div>
                              <div>
                                <strong>Creatinine:</strong>
                                {rft.rftData.creatinine} mmol/L
                              </div>
                              <div>
                                <strong>Sodium:</strong> {rft.rftData.sodium}
                                mmol/L
                              </div>
                              <div>
                                <strong>CKD Stage:</strong>{" "}
                                {rft.rftData.ckdStage}
                                mmol/L
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td>
                    <Link
                      to={`/auth/master/user/${patient.id}/edit`}
                      className="user-table-button user-table-edit-button inline-flex py-2 px-2 rounded text-sm w-4/12"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Link>
                    <button
                      className="user-table-delete-button inline-flex py-2 px-2 rounded text-sm w-4/12"
                      onClick={() => {
                        handleDelete(patient.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(pageCount)].map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToPage(index + 1)}
              className={`mx-1 py-2 px-4 rounded ${
                currentPage === index + 1 ? "bg-gray-300" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserTable;
