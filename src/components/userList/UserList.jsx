import React, { useState } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Typography,Box,Pagination,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersList = ({ users, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleChangePage = (_, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" sx={{color:'white'}} gutterBottom>
                Lista de Usuarios
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: 'rgba(255, 255, 255, 0.67)'}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#6F4E37' }}>
                            <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                            <TableCell sx={{ color: "white" }}>Email</TableCell>
                            <TableCell sx={{ color: "white" }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1}>
                                            <IconButton
                                                onClick={() => onEdit(user)}
                                                size="small"
                                                sx={{ padding: 0 }}
                                                aria-label="editar"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => onDelete(user.id)}
                                                size="small"
                                                sx={{ padding: 0 }}
                                                aria-label="eliminar"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No hay usuarios disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={2} SX={{
                        backgroundColor:'white',
                        color:'white'
                    }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    SX={{
                        backgroundColor:'white',
                        color:'white'
                    }}
                />
            </Box>
        </Box>
    );
};

export default UsersList;