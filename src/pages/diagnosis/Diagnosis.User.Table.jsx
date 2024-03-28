import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function DiagnosisUserTable({ loading, dataHeader, data, handleDelete }) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter patients with diagnoses data
  const patientsWithDiagnoses = data.flatMap((user) =>
    user.patients.filter((patient) => patient.diagnoses.length > 0)
  );

  const pageCount = Math.ceil(patientsWithDiagnoses.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = patientsWithDiagnoses.slice(startIndex, startIndex + pageSize);

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
          {visibleData.map((patient) => (
            <tr key={patient.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {patient.firstName} {patient.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ul className="divide-y divide-gray-200">
                  {patient.diagnoses.map((diagnosis, index) => (
                    <li key={index} className="py-1">
                      <div className="text-sm text-gray-900">{diagnosis.condition}</div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ul className="divide-y divide-gray-200">
                  {patient.diagnoses.map((diagnosis, index) => (
                    <li key={index} className="py-1">
                      <div className="text-sm text-gray-900">{diagnosis.impression}</div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ul className="divide-y divide-gray-200">
                  {patient.diagnoses.map((diagnosis, index) => (
                    <li key={index} className="py-1">
                      <div className="text-sm text-gray-900">{diagnosis.dateOfDiagnosis}</div>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/auth/master/user/${patient.id}/edit`}
                  className="text-sky-600 hover:text-sky-900 mr-4"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </Link>
                <button
                  className="text-red-600 hover:text-red-900"
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
