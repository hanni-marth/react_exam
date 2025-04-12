import React, { useState, useEffect } from "react";
import useUsers from "./hooks/useUser";
import UsersList from "./components/userList/UserList";
import UserCreateForm from "./components/userList/UserCreateForm";
import UserEditForm from "./components/userList/UserEdit";
import LoginForm from "./components/userList/LoginForm";
import { FaSignOutAlt, FaFileAlt } from "react-icons/fa";

const App = () => {
    const {
        users,
        loading: loadingUsers,
        addUser,
        editUser,
        deleteUserDetails,
        checkEmailExists,
        login,
    } = useUsers();

    const [editingUser, setEditingUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        const savedSession = localStorage.getItem("loggedIn");
        if (savedSession) {
            setLoggedIn(true);
        }
    }, []);

    const handleLogin = (userCredentials) => {
        login(userCredentials.correo, userCredentials.password)
            .then((result) => {
                if (result) {
                    setLoggedIn(true);
                    localStorage.setItem("loggedIn", true);
                } else {
                    setLoggedIn(false);
                }
            })
            .catch((error) => {
                console.error("Error logging in", error);
                setLoggedIn(false);
            });
    };

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem("loggedIn");
    };

    const redirectToDocs = () => {
        window.location.href = "https://18.221.29.230//api/docs";
    };

    return (
        <div className="min-vh-100 bg-dark text-white py-4">
            <div className="container">
                {!loggedIn ? (
                    <>
                        {!showRegister ? (
                            <LoginForm
                                onLogin={handleLogin}
                                onShowRegister={() => setShowRegister(true)}
                            />
                        ) : (
                            <div className="text-center">
                                <h5 className="text-white mb-3">Registrarse</h5>
                                <UserCreateForm
                                    onCreate={addUser}
                                    checkEmailExists={checkEmailExists}
                                />
                                <button
                                    onClick={() => setShowRegister(false)}
                                    className="btn btn-link text-white mt-2"
                                >
                                    Volver al Login
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="mb-4">
                            {editingUser ? (
                                <UserEditForm
                                    user={editingUser}
                                    onUpdate={editUser}
                                    onCancel={() => setEditingUser(null)}
                                />
                            ) : (
                                <UserCreateForm
                                    onCreate={addUser}
                                    checkEmailExists={checkEmailExists}
                                />
                            )}
                        </div>

                        <div className="mb-4">
                            {loadingUsers ? (
                                <p>Cargando usuarios...</p>
                            ) : (
                                <UsersList
                                    users={users}
                                    onEdit={(user) => setEditingUser(user)}
                                    onDelete={deleteUserDetails}
                                />
                            )}
                        </div>

                        <div className="d-flex flex-column align-items-center">
                            <h6 className="text-white mb-2">Acciones</h6>
                            <div className="d-flex gap-3">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt className="me-2" />
                                    Cerrar Sesión
                                </button>

                                <button
                                    className="btn btn-info"
                                    onClick={redirectToDocs}
                                >
                                    <FaFileAlt className="me-2" />
                                    Ver Documentación
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
