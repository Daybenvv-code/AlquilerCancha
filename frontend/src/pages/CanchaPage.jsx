import React, { useState, useEffect } from "react";
import CanchaCard from "../components/CanchaCard.jsx";
import CanchaCreateModal from '../components/CanchaCreateModal.jsx';
import CanchaEditModal from '../components/CanchaEditModal.jsx';
import {
  obtenerCanchas,
  crearCancha,
  actualizarCancha,
  eliminarCancha,
} from "../services/CanchaService.jsx";
import "../styles/Cancha.css";

function CanchaPage() {
  const [canchas, setCanchas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados separados para cada modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [canchaAEditar, setCanchaAEditar] = useState(null);

  useEffect(() => {
    cargarCanchas();
  }, []);

  const cargarCanchas = () => {
    setCargando(true);
    obtenerCanchas()
      .then((data) => {
        setCanchas(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener las canchas:", err);
        setError("No se pudo conectar con el servidor o cargar los datos.");
        setCargando(false);
      });
  };

  const handleAbrirCrear = () => {
    setIsCreateOpen(true);
  };

  const handleEditar = (cancha) => {
    setCanchaAEditar(cancha);
    setIsEditOpen(true);
  };

  const handleCrearCancha = async (datosFormulario) => {
    try {
      const nuevaCancha = await crearCancha(datosFormulario);
      setCanchas((prev) => [...prev, nuevaCancha]);
      setIsCreateOpen(false);
    } catch (err) {
      console.error("Error al crear la cancha:", err);
      alert("Ocurrió un error al crear la cancha.");
    }
  };

  const handleActualizarCancha = async (datosFormulario) => {
    try {
      const canchaActualizada = await actualizarCancha(canchaAEditar.id, datosFormulario);
      setCanchas((prev) =>
        prev.map((item) => (item.id === canchaAEditar.id ? { ...item, ...canchaActualizada } : item))
      );
      setIsEditOpen(false);
    } catch (err) {
      console.error("Error al actualizar la cancha:", err);
      alert("Ocurrió un error al actualizar la cancha.");
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta cancha?");
    if (!confirmacion) return;

    try {
      await eliminarCancha(id);
      setCanchas((prev) => prev.filter((cancha) => cancha.id !== id));
    } catch (err) {
      console.error("Error al eliminar cancha:", err);
      alert("No se pudo eliminar la cancha.");
    }
  };

  return (
    <div className="container">
      <h1>Alquiler de Canchas</h1>
      <h2>Gestión de Canchas</h2>

      <button onClick={handleAbrirCrear}>Crear Cancha</button>

      {cargando && <p className="mensaje-info">Cargando canchas...</p>}

      {error && <p className="mensaje-error">{error}</p>}

      {!cargando && !error && canchas.length === 0 && (
        <p className="mensaje-info">No hay canchas registradas en la base de datos.</p>
      )}

      {!cargando && !error && canchas.length > 0 && (
        <div className="canchas-grid">
          {canchas.map((cancha) => (
            <CanchaCard
              key={cancha.id}
              cancha={cancha}
              onEditar={handleEditar}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}

      {/* Modal exclusivo para Crear */}
      <CanchaCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCrearCancha}
      />

      {/* Modal exclusivo para Editar */}
      <CanchaEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        cancha={canchaAEditar}
        onUpdate={handleActualizarCancha}
      />
    </div>
  );
}

export default CanchaPage;