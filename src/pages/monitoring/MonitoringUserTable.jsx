import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function MonitoringUserTable({
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

  const renderPagination = () => {
    const totalPagesToShow = 5; // Adjust the number of pages to show here
    const pages = [];
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfTotalPagesToShow);
    let endPage = Math.min(pageCount, startPage + totalPagesToShow - 1);

    if (pageCount <= totalPagesToShow) {
      startPage = 1;
      endPage = pageCount;
    } else if (currentPage <= halfTotalPagesToShow) {
      endPage = totalPagesToShow;
    } else if (currentPage + halfTotalPagesToShow >= pageCount) {
      startPage = pageCount - totalPagesToShow + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => navigateToPage(i)}
          className={`mx-1 py-2 px-4 rounded ${
            currentPage === i ? "bg-gray-300" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
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
              const rftDataAvailable = patient.monitorings.length > 0;
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
                    <div className="text-sm text-gray-900">
                      {patient.phoneNumber}
                    </div>
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
        <div className="flex justify-center mt-4">{renderPagination()}</div>
      )}
    </div>
  );
}

export default MonitoringUserTable;
