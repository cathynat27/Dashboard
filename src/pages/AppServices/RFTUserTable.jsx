import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function RenalTable({ loading, dataHeader, data, handleDelete }) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = data.slice(startIndex, startIndex + pageSize);

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {dataHeader.map((header) => (
              <th
                key={header.key}
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visibleData.map((user) =>
            user.patients.map((patient) => {
              const rftDataAvailable = patient.rfts.length > 0;
              if (!rftDataAvailable) {
                return null; // Skip patients without RFT data
              }
              return (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.sex}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {patient.rfts.map((rft, index) => (
                        <li key={index}>
                         
                          <div className="text-sm text-gray-900">
                            <strong>BMI:</strong> {rft.inspectionData.bmi}
                          </div>
                          <div className="text-sm text-gray-900">
                            <strong>Systolic Pressure:</strong>
                            {`${rft.inspectionData.bloodPressure.systolicPressure} mmHg`}
                          </div>
                          <div className="text-sm text-gray-900">
                            <strong>Diastolic Pressure:</strong>
                            {`${rft.inspectionData.bloodPressure.diastolicPressure} mmHg`}
                          </div>
                          <div className="text-sm text-gray-900">
                            <strong>Heart Pluse:</strong>
                            {`${rft.inspectionData.bloodPressure.heartPulse} beats/min`}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {patient.rfts.map((rft, index) => (
                        <li key={index}>
                          {rft.rftData && (
                            <div>
                              <div className="text-sm text-gray-900">
                                <strong>Creatinine:</strong>{" "}
                                {rft.rftData.creatinine} mmol/L
                              </div>
                              <div className="text-sm text-gray-900">
                                <strong>CKDStage:</strong>{" "}
                                {rft.rftData.ckdStage} mmol/L
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/auth/master/user/${patient.id}/edit`}
                      className="text-sky-600 hover:text-sky-900 mr-4"
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

export default RenalTable;
