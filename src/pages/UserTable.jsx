import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Datatables from "../components/Datatables/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function UserTable({ loading, dataHeader, data, handleDelete }) {
  const navigate = useNavigate();

  return (
    <div>
      <Datatables loading={loading} dataHeader={dataHeader}>
        {data.map((row) => (
          <tr key={row.id}>
            <td className="w-4/12">
              <p className="font-normal text-sm text-gray-500 ">{row.email}</p>
            </td>
            <td className="w-4/12">
              <p className="font-normal text-sm text-gray-500">
                {row.username}
              </p>
            </td>
            <td>
              <Link
                to={`/auth/master/user/${row.id}/edit`}
                className="user-table-button user-table-edit-button inline-flex py-2 px-2 rounded text-sm w-4/12"
              >
                <FontAwesomeIcon icon={faPencil} />
              </Link>
              <button
                className=" user-table-delete-button inline-flex py-2 px-2 rounded text-sm w-4/12"
                onClick={() => {
                  handleDelete(row.id);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        ))}
      </Datatables>
    </div>
  );
}

export default UserTable;
