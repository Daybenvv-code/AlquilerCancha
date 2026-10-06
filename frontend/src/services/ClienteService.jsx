import { API_BASE_URL } from './Api';

const API_URL = `${API_BASE_URL}/clientes`;

export const obtenerCliente = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error('Error al obtener los clientes');
  }
  return await response.json();
};

export const obtenerClientePorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al obtener el cliente con ID ${id}`);
  }
  return await response.json();
};

export const crearCliente = async (clienteData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteData),
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error("Error al crear el cliente");
  }
  return await response.json();
};

export const actualizarCliente = async (id, clienteData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clienteData),
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al actualizar el cliente con ID ${id}`);
  }
  return await response.json();
};

export const eliminarCliente = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error("Status de la respuesta:", response.status);
    throw new Error(`Error al eliminar el cliente con ID ${id}`);
  }
  return true;
};