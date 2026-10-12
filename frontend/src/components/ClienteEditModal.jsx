import React, { useState, useEffect } from 'react';

export default function ClienteEditModal({ isOpen, onClose, cliente, onUpdate }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre || '');
      setTelefono(cliente.telefono || '');
      setDni(cliente.dni || '');
    }
  }, [cliente]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...cliente, nombre, telefono, dni });
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Editar Cliente</h3>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Teléfono:</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>DNI:</label>
            <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} required style={inputStyle} />
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

const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' };
const formGroupStyle = { marginBottom: '15px', display: 'flex', flexDirection: 'column' };
const labelStyle = { marginBottom: '5px', fontWeight: '600', color: '#333', fontSize: '0.9rem' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.95rem', outline: 'none' };
const actionsStyle = { display: 'flex', gap: '10px', marginTop: '20px' };
const btnGuardarStyle = { flex: 1, backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' };
const btnCancelarStyle = { flex: 1, backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' };