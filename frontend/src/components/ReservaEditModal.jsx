import React, { useState, useEffect } from "react";

export const ReservaEditModal = ({ isOpen, onClose, onSave, reserva, canchas, clientes, metodosPago }) => {
  const [formData, setFormData] = useState({
    fecha: "",
    horaInicio: "",
    horaFin: "",
    total: "",
    estado: "PAGADO",
    idCancha: "",
    idCliente: "",
    idMetodoPago: ""
  });

  useEffect(() => {
    if (reserva) {
      setFormData({
        fecha: reserva.fecha || "",
        horaInicio: reserva.horaInicio ? reserva.horaInicio.substring(0, 5) : "",
        horaFin: reserva.horaFin ? reserva.horaFin.substring(0, 5) : "",
        total: reserva.total || "",
        estado: reserva.estado || "PAGADO",
        idCancha: reserva.cancha?.id || "",
        idCliente: reserva.cliente?.id || "",
        idMetodoPago: reserva.metodoPago?.id || ""
      });
    }
  }, [reserva]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Asegurar formato de fecha YYYY-MM-DD para que Java/Spring Boot no falle
    let fechaFormateada = formData.fecha;
    if (fechaFormateada.includes('/')) {
      const partes = fechaFormateada.split('/');
      if (partes.length === 3) {
        fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
    }

    const payload = {
      fecha: fechaFormateada,
      horaInicio: formData.horaInicio.length === 5 ? `${formData.horaInicio}:00` : formData.horaInicio,
      horaFin: formData.horaFin.length === 5 ? `${formData.horaFin}:00` : formData.horaFin,
      total: parseFloat(formData.total),
      estado: formData.estado,
      cancha: { id: parseInt(formData.idCancha) },
      cliente: { id: parseInt(formData.idCliente) },
      metodoPago: formData.idMetodoPago ? { id: parseInt(formData.idMetodoPago) } : null
    };
    onSave(reserva.id, payload);
  };

  return (
    <div style={modalStyles.backdrop}>
      <div style={modalStyles.content}>
        <h3>Editar Reserva #{reserva?.id}</h3>
        <form onSubmit={handleSubmit}>
          <div style={modalStyles.field}>
            <label>Cliente:</label>
            <select 
              required 
              value={formData.idCliente} 
              onChange={e => setFormData({...formData, idCliente: e.target.value})}
              style={modalStyles.input}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nombre} - DNI: {c.dni}
                </option>
              ))}
            </select>
          </div>

          <div style={modalStyles.field}>
            <label>Cancha:</label>
            <select 
              required 
              value={formData.idCancha} 
              onChange={e => setFormData({...formData, idCancha: e.target.value})}
              style={modalStyles.input}
            >
              <option value="">Seleccione una cancha</option>
              {canchas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>

          <div style={modalStyles.field}>
            <label>Fecha:</label>
            <input 
              type="date" 
              required 
              value={formData.fecha} 
              onChange={e => setFormData({...formData, fecha: e.target.value})} 
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.field}>
            <label>Hora Inicio:</label>
            <input 
              type="time" 
              required 
              value={formData.horaInicio} 
              onChange={e => setFormData({...formData, horaInicio: e.target.value})} 
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.field}>
            <label>Hora Fin:</label>
            <input 
              type="time" 
              required 
              value={formData.horaFin} 
              onChange={e => setFormData({...formData, horaFin: e.target.value})} 
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.field}>
            <label>Total (S/):</label>
            <input 
              type="number" 
              step="0.01" 
              required 
              value={formData.total} 
              onChange={e => setFormData({...formData, total: e.target.value})} 
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.field}>
            <label>Método de Pago:</label>
            <select 
              required 
              value={formData.idMetodoPago} 
              onChange={e => setFormData({...formData, idMetodoPago: e.target.value})}
              style={modalStyles.input}
            >
              <option value="">Seleccione método de pago</option>
              {metodosPago?.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={onClose} style={modalStyles.cancelButton}>Cancelar</button>
            <button type="submit" style={modalStyles.saveButton}>Actualizar Reserva</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const modalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  },
  content: {
    backgroundColor: '#fff', padding: '25px', borderRadius: '8px',
    width: '400px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', color: '#333'
  },
  field: { marginBottom: '12px', display: 'flex', flexDirection: 'column' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px' },
  saveButton: { padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  cancelButton: { padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};