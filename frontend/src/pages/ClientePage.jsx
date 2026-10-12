import React, { useState, useEffect } from "react";
import ClienteCard from "../components/ClienteCard.jsx";
import ClienteCreateModal from "../components/ClienteCreateModal.jsx";
import ClienteEditModal from "../components/ClienteEditModal.jsx";
import {
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "../services/ClienteService.jsx";
import "../styles/Cliente.css";

function ClientePage() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [clienteAEditar, setClienteAEditar] = useState(null);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    setCargando(true);
    obtenerCliente()
      .then((data) => {
        setClientes(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener los clientes:", err);
        setError("No se pudo conectar con el servidor o cargar los datos.");
        setCargando(false);
      });
  };

  const handleAbrirCrear = () => {
    setIsCreateOpen(true);
  };

  const handleEditar = (cliente) => {
    setClienteAEditar(cliente);
    setIsEditOpen(true);
  };

  const handleCrearCliente = async (datosFormulario) => {
    try {
      const nuevoCliente = await crearCliente(datosFormulario);
      setClientes((prev) => [...prev, nuevoCliente]);
      setIsCreateOpen(false);
    } catch (err) {
      console.error("Error al crear el cliente:", err);
      alert("Ocurrió un error al crear el cliente.");
    }
  };

  const handleActualizarCliente = async (datosFormulario) => {
    try {
      const clienteActualizado = await actualizarCliente(clienteAEditar.id, datosFormulario);
      setClientes((prev) =>
        prev.map((item) => (item.id === clienteAEditar.id ? { ...item, ...clienteActualizado } : item))
      );
      setIsEditOpen(false);
    } catch (err) {
      console.error("Error al actualizar el cliente:", err);
      alert("Ocurrió un error al actualizar el cliente.");
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este cliente?");
    if (!confirmacion) return;

    try {
      await eliminarCliente(id);
      setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
      alert("No se pudo eliminar el cliente.");
    }
  };

  return (
    <div className="container">
      <h1>Alquiler de Canchas</h1>
      <h2>Clientes</h2>

      <button onClick={handleAbrirCrear} style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
        Crear Cliente
      </button>

      {cargando && <p className="mensaje-info">Cargando clientes...</p>}

      {error && <p className="mensaje-error">{error}</p>}

      {!cargando && !error && clientes.length === 0 && (
        <p className="mensaje-info">No hay clientes registrados en la base de datos.</p>
      )}

      {!cargando && !error && clientes.length > 0 && (
        <div className="clientes">
          {clientes.map((cliente) => (
            <ClienteCard
              key={cliente.id}
              cliente={cliente}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}

      <ClienteCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCrearCliente}
      />

      <ClienteEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        cliente={clienteAEditar}
        onUpdate={handleActualizarCliente}
      />
    </div>
  );
}

export default ClientePage;