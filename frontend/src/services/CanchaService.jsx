const API_URL = "https://alquilercancha-production-7ea7.up.railway.app/api/canchas";

// Obtener todas las canchas (GET)
export const obtenerCanchas = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener las canchas");
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerCanchas:", error);
    throw error;
  }
};

// Crear una nueva cancha (POST)
export const crearCancha = async (canchaData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(canchaData),
    });

    console.log("Status de la respuesta (Crear):", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error del servidor (${response.status}): ${errorText || 'Error al crear la cancha'}`);
    }

    const textData = await response.text();
    return textData ? JSON.parse(textData) : {};
  } catch (error) {
    console.error("Error en crearCancha:", error);
    throw error;
  }
};

// Actualizar una cancha existente (PUT)
export const actualizarCancha = async (id, canchaData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(canchaData),
    });

    console.log("Status de la respuesta (Actualizar):", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error del servidor (${response.status}): ${errorText || 'Error al actualizar la cancha'}`);
    }

    const textData = await response.text();
    return textData ? JSON.parse(textData) : {};
  } catch (error) {
    console.error("Error en actualizarCancha:", error);
    throw error;
  }
};

// Eliminar una cancha (DELETE)
export const eliminarCancha = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error("Error al eliminar la cancha");
    return true;
  } catch (error) {
    console.error("Error en eliminarCancha:", error);
    throw error;
  }
};