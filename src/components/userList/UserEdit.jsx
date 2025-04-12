import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Stack
} from "@mui/material";
import { motion } from "framer-motion";

const UserEditForm = ({ user, onUpdate, onCancel }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!updatedUser.name || !updatedUser.email) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (onUpdate) {
            onUpdate(updatedUser.id, { ...updatedUser });
            onCancel();
        } else {
            console.error("onUpdate no está definido");
        }
    };

    return (
        <Box>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        backdropFilter: 'blur(6px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.88)',
                        borderRadius: 4,
                        padding: 4,
                        maxWidth: 450,
                        width: '90%',
                    }}
                >
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#4e342e' }}>
                        Editar Usuario
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Nombre"
                                name="name"
                                fullWidth
                                value={updatedUser.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Correo"
                                name="email"
                                type="email"
                                fullWidth
                                value={updatedUser.email}
                                onChange={handleChange}
                            />
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#6d4c41',
                                        '&:hover': { backgroundColor: '#5d4037' },
                                    }}
                                >
                                    Actualizar Usuario
                                </Button>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={onCancel}
                                    sx={{
                                        color: '#6d4c41',
                                        borderColor: '#6d4c41',
                                        '&:hover': {
                                            backgroundColor: '#efebe9',
                                            borderColor: '#5d4037',
                                        },
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default UserEditForm;