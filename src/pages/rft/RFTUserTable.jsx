// import Pagination from "./Pagination";
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
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  function getCKDStageColor(eGFR) {
    if (eGFR >= 90) {
      return "green";
    } else if (eGFR >= 60) {
      return "orange";
    } else {
      return "red";
    }
  }

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
                return null;
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
                          {rft.rftData && (
                            <div>
                              <div className="text-sm text-gray-900">
                                <strong>CKDStage:</strong>{" "}
                                <span
                                  style={{
                                    color: getCKDStageColor(rft.rftData.eGFR),
                                  }}
                                >
                                  {rft.rftData.ckdStage} mmol/L
                                </span>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/auth/master/user/${patient.id}/edit`}
                      className="text-sky-600 hover:text-sky-900"
                    >
                      <div className="text-sm text-text-sky-600 underline">
                        Details
                      </div>
                    </Link>
                    <button className="text-sm text-text-sky-600 underline">
                      Details
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RenalTable;
