import React, { useState, useEffect } from 'react';

export default function CanchaModal({ isOpen, onClose, cancha, onSave }) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [precioHora, setPrecioHora] = useState('');
  const [estado, setEstado] = useState('DISPONIBLE');

  useEffect(() => {
    if (cancha) {
      setNombre(cancha.nombre || '');
      setTipo(cancha.tipo || '');
      setPrecioHora(cancha.precioHora || '');
      setEstado(cancha.estado || 'DISPONIBLE');
    } else {
      setNombre('');
      setTipo('');
      setPrecioHora('');
      setEstado('DISPONIBLE');
    }
  }, [cancha]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      nombre,
      tipo,
      precioHora: parseFloat(precioHora),
      estado
    };

    if (cancha && cancha.id) {
      payload.id = cancha.id;
    }

    onSave(payload);
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>
          {cancha ? 'Editar Cancha' : 'Nueva Cancha'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Nombre de la Cancha:</label>
            <input 
              type="text" 
              placeholder="Ej. Cancha de grass"
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Tipo / Deporte:</label>
            <input 
              type="text" 
              placeholder="Ej. Voley"
              value={tipo} 
              onChange={(e) => setTipo(e.target.value)} 
              required 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Precio por Hora (S/):</label>
            <input 
              type="number" 
              step="0.01"
              placeholder="Ej. 45"
              value={precioHora} 
              onChange={(e) => setPrecioHora(e.target.value)} 
              required 
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Estado:</label>
            <select 
              value={estado} 
              onChange={(e) => setEstado(e.target.value)} 
              style={inputStyle}
            >
              <option value="DISPONIBLE">Disponible</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
              <option value="OCUPADO">Ocupado</option>
            </select>
          </div>

          <div style={actionsStyle}>
            <button type="submit" style={btnGuardarStyle}>Guardar</button>
            <button type="button" onClick={onClose} style={btnCancelarStyle}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '10px',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
};

const formGroupStyle = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '5px',
  fontWeight: '600',
  color: '#333',
  fontSize: '0.9rem',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '0.95rem',
  outline: 'none',
};

const actionsStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
};

const btnGuardarStyle = {
  flex: 1,
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
};

const btnCancelarStyle = {
  flex: 1,
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '6px',
  fontWeight: '600',
  cursor: 'pointer',
};