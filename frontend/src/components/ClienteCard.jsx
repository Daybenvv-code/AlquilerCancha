import React from 'react';

function ClienteCard({ cliente, onEditar, onEliminar }) {
  return (
    <div className="cliente-card">
      <h3>{cliente.nombre}</h3>
      <p><strong>Teléfono:</strong> {cliente.telefono}</p>
      <p><strong>DNI:</strong> {cliente.dni}</p>

      <div className="card-actions">
        <button className="btn-editar" onClick={() => onEditar && onEditar(cliente)}>
          Editar
        </button>
        <button className="btn-eliminar" onClick={() => onEliminar && onEliminar(cliente.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ClienteCard;