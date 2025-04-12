import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Link,
} from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = ({ onLogin, onShowRegister }) => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!correo || !password) {
            setError("Por favor, ingresa todos los campos.");
            return;
        }

        try {
            const success = await onLogin({ correo, password });
            console.log("Resultado de onLogin:", success);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError("Ocurrió un error. Intenta nuevamente.");
        }
    };

    return (
        <Box
            sx={{
                height: "100vh", // altura total de la pantalla
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent", // color de fondo suave
                padding: 2,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(255, 255, 255, 0.59)",
                    borderRadius: 4,
                    padding: 4,
                    maxWidth: 400,
                    width: "100%",
                    boxShadow: 3,
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ color: "#4e342e", fontWeight: "bold" }}
                >
                    Iniciar Sesión
                </Typography>
                {error && (
                    <Typography color="error" variant="body2" align="center" mb={2}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <FaUser style={{ marginRight: 8, color: "#6d4c41" }} />
                        <TextField
                            fullWidth
                            type="email"
                            label="Correo Electrónico"
                            variant="outlined"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <FaLock style={{ marginRight: 8, color: "#6d4c41" }} />
                        <TextField
                            fullWidth
                            type="password"
                            label="Contraseña"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: "green",
                            "&:hover": {
                                backgroundColor: "green",
                            },
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    ¿No tienes cuenta?{" "}
                    <Link
                        component="button"
                        onClick={onShowRegister}
                        sx={{ color: "#4e342e", fontWeight: "bold" }}
                    >
                        Regístrate
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginForm;