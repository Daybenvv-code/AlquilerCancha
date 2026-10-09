import React, { useState, useEffect } from "react";
import CanchaCard from "../components/CanchaCard.jsx";
import CanchaModal from "../components/CanchaModal.jsx";
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

  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para guardar la cancha que se enviará a editar (null si se va a crear)
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

  // PASO 2.1: Abrir modal para Crear
  const handleAbrirCrear = () => {
    setCanchaAEditar(null); // Nos aseguramos que no haya datos cargados de edición
    setIsModalOpen(true);
  };

  // PASO 2.2: Abrir modal para Editar
  const handleEditar = (cancha) => {
    setCanchaAEditar(cancha); // Pasamos el objeto cancha completo al estado
    setIsModalOpen(true);
  };

  // PASO 2.3: Guardar (Detecta si es POST o PUT)
  const handleGuardarCancha = async (datosFormulario) => {
    if (canchaAEditar) {
      // Petición PUT al Backend
      const canchaActualizada = await actualizarCancha(canchaAEditar.id, datosFormulario);
      
      // Actualizamos el arreglo local reemplazando solo el registro editado
      setCanchas((prev) =>
        prev.map((item) => (item.id === canchaAEditar.id ? canchaActualizada : item))
      );
    } else {
      // Petición POST al Backend
      const nuevaCancha = await crearCancha(datosFormulario);
      
      // Añadimos la nueva cancha al arreglo local
      setCanchas((prev) => [...prev, nuevaCancha]);
    }
  };

  // PASO 2.4: Petición DELETE al backend
  const handleEliminar = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta cancha?");
    if (!confirmacion) return;

    try {
      await eliminarCancha(id);
      
      // Filtramos la lista para remover la cancha eliminada sin recargar la página
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

      {/* Componente Modal */}
      <CanchaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleGuardarCancha}
        canchaEditar={canchaAEditar}
      />
    </div>
  );
}

export default CanchaPage;