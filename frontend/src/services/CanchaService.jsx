import { API_BASE_URL } from './Api';

const API_URL = `${API_BASE_URL}/canchas`;

export const obtenerCanchas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error('Error al obtener las canchas');
  }
  return await response.json();
};

export const obtenerCanchaPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al obtener la cancha con ID ${id}`);
  }
  return await response.json();
};

export const crearCancha = async (canchaData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(canchaData),
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error("Error al crear la cancha");
  }
  return await response.json();
};

export const actualizarCancha = async (id, canchaData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(canchaData),
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al actualizar la cancha con ID ${id}`);
  }
  return await response.json();
};

export const eliminarCancha = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al eliminar la cancha con ID ${id}`);
  }
  return true;
};