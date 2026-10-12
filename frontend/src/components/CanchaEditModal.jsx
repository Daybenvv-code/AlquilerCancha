import React, { useState, useEffect } from 'react';

export default function CanchaEditModal({ isOpen, onClose, cancha, onUpdate }) {
  const [nombre, setNombre] = useState('');
  const [tipoDeporte, setTipoDeporte] = useState('');
  const [precioPorHora, setPrecioPorHora] = useState('');
  const [estado, setEstado] = useState('DISPONIBLE');

  useEffect(() => {
    if (cancha) {
      setNombre(cancha.nombre || '');
      setTipoDeporte(cancha.tipoDeporte || '');
      setPrecioPorHora(cancha.precioPorHora ?? '');
      setEstado(cancha.estado || 'DISPONIBLE');
    }
  }, [cancha]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...cancha, nombre, tipoDeporte, precioPorHora: parseFloat(precioPorHora), estado });
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Editar Cancha</h3>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Tipo / Deporte:</label>
            <input type="text" value={tipoDeporte} onChange={(e) => setTipoDeporte(e.target.value)} required style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Precio por Hora (S/):</label>
            <input type="number" step="0.01" value={precioPorHora} onChange={(e) => setPrecioPorHora(e.target.value)} required style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)} style={inputStyle}>
              <option value="DISPONIBLE">Disponible</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
              <option value="OCUPADO">Ocupado</option>
            </select>
          </div>
          <div style={actionsStyle}>
            <button type="submit" style={btnGuardarStyle}>Actualizar</button>
            <button type="button" onClick={onClose} style={btnCancelarStyle}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reutiliza los mismos estilos de arriba
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '100%', maxWidth: '420px' };
const formGroupStyle = { marginBottom: '15px', display: 'flex', flexDirection: 'column' };
const labelStyle = { marginBottom: '5px', fontWeight: '600' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' };
const actionsStyle = { display: 'flex', gap: '10px', marginTop: '20px' };
const btnGuardarStyle = { flex: 1, backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' };
const btnCancelarStyle = { flex: 1, backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' };