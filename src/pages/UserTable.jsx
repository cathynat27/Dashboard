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
      <table className="table-auto w-full">
        <thead>
          <tr>
            {dataHeader.map((headerItem, index) => (
              <th key={index}>{headerItem.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={dataHeader.length + 1} className="text-center font-bold">
                Loading...
              </td>
            </tr>
          ) : (
            visibleData.map((user) => (
              <React.Fragment key={user.id}>
                {user.patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.lastName} {patient.firstName}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.sex}</td>


                    <td>
                      <Link
                        to={`/auth/master/user/${patient.id}/edit`}
                        className="user-table-button user-table-edit-button inline-flex py-2 px-2 rounded text-sm"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </Link>
                      <button
                        className="user-table-delete-button inline-flex py-2 px-2 rounded text-sm"
                        onClick={() => {
                          handleDelete(patient.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
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
