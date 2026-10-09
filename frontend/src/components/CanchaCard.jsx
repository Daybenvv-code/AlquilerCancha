import React from 'react';

function CanchaCard({ cancha, onEditar, onEliminar }) {
  // Validación de seguridad para evitar pantallas en blanco si el objeto llega indefinido
  if (!cancha) return null;

  // Normalizamos el estado a minúsculas para comparar fácilmente ("disponible", "ocupado", "mantenimiento")
  const estadoNormalizado = (cancha.estado || 'disponible').toLowerCase();

  return (
    <div className="cancha-card">
      <h3>{cancha.nombre || 'Cancha sin nombre'}</h3>
      <p><strong>Tipo / Deporte:</strong> {cancha.tipoDeporte || 'No especificado'}</p>
      <p><strong>Precio por Hora:</strong> S/ {cancha.precioPorHora || 0}</p>
      <p>
        <strong>Estado:</strong>{' '}
        <span className={`estado ${estadoNormalizado}`}>
          {/* Capitalizamos la primera letra para mostrarlo bonito */}
          {estadoNormalizado.charAt(0).toUpperCase() + estadoNormalizado.slice(1)}
        </span>
      </p>

      {/* Botones de acción */}
      <div className="card-actions">
        <button className="btn-editar" onClick={() => onEditar && onEditar(cancha)}>
          Editar
        </button>
        <button className="btn-eliminar" onClick={() => onEliminar && onEliminar(cancha.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CanchaCard;