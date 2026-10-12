import React, { useState, useEffect } from "react";
import ReservaCard from "../components/ReservaCard.jsx";
import { ReservaCreateModal } from "../components/ReservaCreateModal.jsx";
import { ReservaEditModal } from "../components/ReservaEditModal.jsx"; // Importa el modal de edición
import { obtenerReservas, crearReserva, actualizarReserva, eliminarReserva } from "../services/ReservaService.jsx";
import { obtenerCanchas } from "../services/CanchaService.jsx";
import { obtenerCliente as obtenerClientes } from "../services/ClienteService.jsx";
import "../styles/Reserva.css";

function ReservaPage() {
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const [resReservas, resCanchas, resClientes] = await Promise.all([
        obtenerReservas(),
        obtenerCanchas(),
        obtenerClientes()
      ]);
      
      setReservas(resReservas);
      setCanchas(resCanchas);
      setClientes(resClientes);
      setMetodosPago([
        { id: 1, nombre: "Efectivo" },
        { id: 2, nombre: "Yape" },
        { id: 3, nombre: "Plin" },
        { id: 4, nombre: "Tarjeta" }
      ]);
      setCargando(false);
    } catch (err) {
      console.error("Error al cargar los datos:", err);
      setError("No se pudo conectar con el servidor o cargar los datos.");
      setCargando(false);
    }
  };

  const handleGuardarReserva = (nuevaReserva) => {
    crearReserva(nuevaReserva)
      .then(() => {
        setIsCreateModalOpen(false);
        cargarDatos();
      })
      .catch((err) => console.error("Error al crear la reserva:", err));
  };

  const handleActualizarReserva = (id, reservaData) => {
    actualizarReserva(id, reservaData)
      .then(() => {
        setIsEditModalOpen(false);
        setReservaSeleccionada(null);
        cargarDatos();
      })
      .catch((err) => console.error("Error al actualizar la reserva:", err));
  };

  const handleEditar = (reserva) => {
    setReservaSeleccionada(reserva);
    setIsEditModalOpen(true);
  };

  const handleEliminar = (id) => {
    eliminarReserva(id)
      .then(() => {
        setReservas((prev) => prev.filter((r) => r.id !== id));
      })
      .catch((err) => console.error("Error al eliminar la reserva:", err));
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Alquiler de Canchas</h1>
          <h2>Reservas</h2>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Crear Reserva
        </button>
      </div>

      {cargando && <p className="mensaje-info">Cargando reservas...</p>}
      {error && <p className="mensaje-error">{error}</p>}

      {!cargando && !error && reservas.length === 0 && (
        <p className="mensaje-info">No hay reservas registradas en la base de datos.</p>
      )}

      {!cargando && !error && reservas.length > 0 && (
        <div className="reservas">
          {reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id || reserva.idReserva}
              reserva={reserva}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}

      {/* Modal de Creación */}
      <ReservaCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleGuardarReserva}
        canchas={canchas}
        clientes={clientes}
        metodosPago={metodosPago}
      />

      {/* Modal de Edición */}
      <ReservaEditModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setReservaSeleccionada(null); }}
        onSave={handleActualizarReserva}
        reserva={reservaSeleccionada}
        canchas={canchas}
        clientes={clientes}
        metodosPago={metodosPago}
      />
    </div>
  );
}

export default ReservaPage;