import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerClientePorId, actualizarCliente } from "../services/ClienteService.jsx";
import "../styles/Cliente.css";

function EditarClientePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    dni: "",
    email: "",
  });

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar los datos actuales del cliente al montar el componente
  useEffect(() => {
    if (id) {
      obtenerClientePorId(id)
        .then((data) => {
          setFormData(data);
          setCargando(false);
        })
        .catch((err) => {
          console.error("Error al cargar el cliente:", err);
          setError("No se pudo cargar la información del cliente desde el servidor.");
          setCargando(false);
        });
    }
  }, [id]);

  // Manejador dinámico para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar actualización al backend (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    try {
      await actualizarCliente(id, formData);
      navigate(-1); // Regresa a la vista anterior o lista de clientes
    } catch (err) {
      console.error("Error al actualizar el cliente:", err);
      setError("No se pudo actualizar el cliente. Verifique los datos e intente nuevamente.");
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="container">
        <p className="mensaje-info">Cargando datos del cliente...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Alquiler de Canchas</h1>
      <h2>Editar Cliente</h2>

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
            {guardando ? "Guardando..." : "Actualizar Cliente"}
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

export default EditarClientePage;