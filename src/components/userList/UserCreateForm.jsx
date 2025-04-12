import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Stack
} from "@mui/material";

const UserCreateForm = ({ onCreate, checkEmailExists }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!validatePassword(password)) {
            setError("La contraseña debe tener al menos 10 caracteres, una mayúscula, una minúscula, un número y un símbolo.");
            return;
        }

        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setError("⚠️ Este correo ya está registrado. Por favor, usa otro.");
            return;
        }

        const newUser = { name, email, password };
        onCreate(newUser);

        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <Box
            sx={{
                height: "80vh", // altura total de la pantalla
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent", // color de fondo suave
                padding: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.64)',
                    borderRadius: 4,
                    padding: 4,
                    maxWidth: 450,
                    width: '90%',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#4e342e' }}>
                    Crear Nuevo Usuario
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" align="center" mb={2}>
                        {error}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Nombre"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Correo"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                                Crear Usuario
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleCancel}
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
        </Box>
    );
};

export default UserCreateForm;