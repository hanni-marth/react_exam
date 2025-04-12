import React, { useState } from "react";
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
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}>
                <h4 className="text-center text-dark mb-4 fw-bold">Iniciar Sesión</h4>
                {error && (
                    <div className="alert alert-danger text-center py-2" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex align-items-center">
                        <FaUser className="me-2 text-secondary" />
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo Electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <FaLock className="me-2 text-secondary" />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mt-2">
                        Iniciar Sesión
                    </button>
                </form>
                <p className="text-center mt-3">
                    ¿No tienes cuenta?{" "}
                    <button
                        onClick={onShowRegister}
                        className="btn btn-link text-decoration-none fw-bold text-dark"
                    >
                        Regístrate
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
