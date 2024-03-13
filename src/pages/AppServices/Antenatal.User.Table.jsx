import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function DiagnosisUserTable({ loading, dataHeader, data, handleDelete }) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter patients with antenatal data
  const patientsWithAntenatals = data.flatMap((user) =>
    user.patients.filter((patient) => patient.antenantals.length > 0)
  );

  const pageCount = Math.ceil(patientsWithAntenatals.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = patientsWithAntenatals.slice(startIndex, startIndex + pageSize);

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Table Header */}
      <table className="table-fixed w-full">
        <thead>
          <tr>
            {dataHeader.map((header) => (
              <th
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={header.key}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {visibleData.map((patient) => (
            <tr key={patient.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {patient.firstName} {patient.lastName}
                </div>
              </td>
              {/* Render antenatal data */}
              <td className="px-6 py-4 whitespace-nowrap">
                <ul>
                  {patient.antenantals.map((antenatal, index) => (
                    <li key={index}>
                      <div className="text-sm text-gray-900">{antenatal.pregnancyStatus}</div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ul>
                  {patient.antenantals.map((antenatal, index) => (
                    <li key={index}>
                      <div className="text-sm text-gray-900">
                        {new Date(antenatal.expectedDateOfDelivery).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* Edit and Delete buttons */}
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
          ))}
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

export default DiagnosisUserTable;
