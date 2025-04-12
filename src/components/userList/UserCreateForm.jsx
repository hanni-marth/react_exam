import React, { useState } from "react";

const UserCreateForm = ({ onCreate, checkEmailExists }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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

        setName("");
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleCancel = () => {
        setName("");
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "1rem" }}>
                <h4 className="text-center text-dark fw-bold mb-4">Crear Nuevo Usuario</h4>

                {error && (
                    <div className="alert alert-danger text-center py-2" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <button type="submit" className="btn btn-dark">
                            Crear Usuario
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserCreateForm;
