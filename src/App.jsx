import React, { useState, useEffect } from "react";
import useUsers from "./hooks/useUser";
import UsersList from "./components/userList/UserList";
import UserCreateForm from "./components/userList/UserCreateForm";
import UserEditForm from "./components/userList/UserEdit";
import LoginForm from "./components/userList/LoginForm";
import { Button, Menu, MenuItem, Container, Box, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DescriptionIcon from '@mui/icons-material/Description';

const App = () => {
    const { users, loading: loadingUsers, addUser, editUser, deleteUserDetails, checkEmailExists, login } = useUsers();
    const [editingUser, setEditingUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

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
        window.location.href = "http://127.0.0.1:5000/api/docs";
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: 2
            }}
        >
            <Container sx={{ position: 'relative', zIndex: 1 }}>
                {!loggedIn ? (
                    <Box>
                        {!showRegister ? (
                            <LoginForm onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
                        ) : (
                            <Box>
                                <Typography variant="h5" sx={{ color: 'white' }}>Registrarse</Typography>
                                <UserCreateForm onCreate={addUser} checkEmailExists={checkEmailExists} />
                                <Button onClick={() => setShowRegister(false)} variant="text" sx={{ color: 'white' }}>Volver al Login</Button>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <>
                        <Box>
                            {editingUser ? (
                                <UserEditForm
                                    user={editingUser}
                                    onUpdate={editUser}
                                    onCancel={() => setEditingUser(null)}
                                />
                            ) : (
                                <UserCreateForm onCreate={addUser} checkEmailExists={checkEmailExists} />
                            )}
                        </Box>
                        <Box>
                            {loadingUsers ? <Typography variant="body1" sx={{ color: 'white' }}>Cargando usuarios...</Typography> :
                                <UsersList
                                    users={users}
                                    onEdit={(user) => setEditingUser(user)}
                                    onDelete={deleteUserDetails}
                                />
                            }
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                aria-controls="menu"
                                aria-haspopup="true"
                                onClick={handleMenuClick}
                                variant="contained"
                                sx={{ backgroundColor: '#FF6F61', color: 'white', marginTop: 2 }}
                            >
                                Ver más Opciones
                            </Button>
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{ color: 'red', display: 'flex', alignItems: 'center' }} // Estilo para color y alineación
                                >
                                    <ExitToAppIcon sx={{ mr: 1 }} /> {/* Ícono de cerrar sesión */}
                                    Cerrar Sesión
                                </MenuItem>

                                <MenuItem
                                    onClick={redirectToDocs}
                                    sx={{ color: 'blue', display: 'flex', alignItems: 'center' }} // Estilo para color y alineación
                                >
                                    <DescriptionIcon sx={{ mr: 1 }} /> {/* Ícono de documentación */}
                                    Ver Documentación
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default App;