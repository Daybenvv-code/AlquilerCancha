import React from 'react';

function CanchaCard({ cancha, onEditar, onEliminar }) {
  if (!cancha) return null;

  const estadoNormalizado = (cancha.estado || 'DISPONIBLE').toLowerCase();
  const tipo = cancha.tipo || cancha.tipoDeporte || 'No especificado';
  const precio = cancha.precioHora ?? cancha.precioPorHora ?? 0;

  return (
    <div className="cancha-card">
      <h3>{cancha.nombre || 'Cancha sin nombre'}</h3>
      <p><strong>Tipo / Deporte:</strong> {tipo}</p>
      <p><strong>Precio por Hora:</strong> S/ {precio}</p>
      <p>
        <strong>Estado:</strong>{' '}
        <span className={`estado ${estadoNormalizado}`}>
          {estadoNormalizado.charAt(0).toUpperCase() + estadoNormalizado.slice(1)}
        </span>
      </p>

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