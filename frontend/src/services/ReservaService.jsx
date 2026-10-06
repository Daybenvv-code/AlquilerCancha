import { API_BASE_URL } from './Api';

const API_URL = `${API_BASE_URL}/reservas`;

export const obtenerReservas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error("Error al obtener las reservas");
  }
  return await response.json();
};

export const obtenerReservaPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al obtener la reserva con ID ${id}`);
  }
  return await response.json();
};

export const crearReserva = async (reservaData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservaData),
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error("Error al crear la reserva");
  }
  return await response.json();
};

export const actualizarReserva = async (id, reservaData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservaData),
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al actualizar la reserva con ID ${id}`);
  }
  return await response.json();
};

export const eliminarReserva = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al eliminar la reserva con ID ${id}`);
  }
  return true;
};