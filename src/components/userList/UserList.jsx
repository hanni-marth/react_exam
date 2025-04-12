import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const UsersList = ({ users, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container py-4">
            <h4 className="text-white mb-3 text-center fw-bold">Lista de Usuarios</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover bg-white rounded shadow">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => onEdit(user)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onDelete(user.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No hay usuarios disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                                <button className="page-link" onClick={() => handleChangePage(1)}>
                                    «
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handleChangePage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                                <button className="page-link" onClick={() => handleChangePage(totalPages)}>
                                    »
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default UsersList;
