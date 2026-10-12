import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearCliente } from "../services/ClienteService.jsx";
import "../styles/Cliente.css";

function NuevoClientePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    dni: "",
    email: "",
  });

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  // Manejador dinámico para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar el nuevo registro al backend (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    try {
      await crearCliente(formData);
      navigate(-1); // Regresa a la vista anterior o lista de clientes
    } catch (err) {
      console.error("Error al registrar el cliente:", err);
      setError("No se pudo registrar el cliente. Verifique los datos e intente nuevamente.");
      setGuardando(false);
    }
  };

  return (
    <div className="container">
      <h1>Alquiler de Canchas</h1>
      <h2>Nuevo Cliente</h2>

      {error && <p className="mensaje-error">{error}</p>}

      <form onSubmit={handleSubmit} className="cliente-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>DNI:</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={guardando} className="btn-guardar">
            {guardando ? "Guardando..." : "Registrar Cliente"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-cancelar"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default NuevoClientePage;