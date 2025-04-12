import React, { useState } from "react";
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
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="card shadow p-4"
                style={{ maxWidth: "450px", width: "100%", borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.9)" }}
            >
                <h4 className="text-center fw-bold text-dark mb-4">Editar Usuario</h4>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={updatedUser.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={updatedUser.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <button type="submit" className="btn btn-dark">
                            Actualizar Usuario
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default UserEditForm;
