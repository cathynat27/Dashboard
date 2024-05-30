import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function VaccinationTable({
  loading,
  dataHeader,
  data,
  handleDelete,
  handleViewDetails,
}) {
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
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={header.key}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visibleData.map((user) =>
            user.patients.map((patient) => {
              const rftDataAvailable = patient.vaccinations.length > 0;
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
                    <ul>
                      {patient.vaccinations.map((rft, index) => (
                        <li key={index}>
                          <div className="text-sm text-gray-900">
                            {rft.vaccineName}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {patient.vaccinations.map((rft, index) => (
                        <li key={index}>
                          <div className="text-sm text-gray-900">
                            {rft.dose}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {patient.vaccinations.map((rft, index) => (
                        <li key={index}>
                          <div className="text-sm text-gray-900">
                            {new Date(
                              rft.dateOfVaccination
                            ).toLocaleDateString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className=" py-4 whitespace-nowrap text-sm font-medium text-sky-600 underline underline-offset-1">
                    <Link
                      to={`/patient/${patient.id}`}
                      onClick={() => handleViewDetails(patient)}
                    >
                      View Details
                    </Link>
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

export default VaccinationTable;
