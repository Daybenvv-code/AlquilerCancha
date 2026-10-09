export const actualizarCancha = async (id, canchaData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(canchaData),
  });

  if (!response.ok) {
    console.error("Status de la respuesta al actualizar:", response.status);
    throw new Error(`Error al actualizar la cancha con ID ${id}`);
  }

  // Si el servidor responde sin contenido (204) o con cuerpo vacío
  const contentType = response.headers.get("content-type");
  if (response.status === 204 || (!contentType || !contentType.includes("application/json"))) {
    return { id, ...canchaData };
  }

  return await response.json();
};