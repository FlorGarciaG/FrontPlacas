import axios from 'axios';

const notiApi = axios.create({
  baseURL: 'http://127.0.0.1:3001/api',
});


export const buscarPlaca = async (placa) => {
  try {
    const response = await notiApi.get(`/buscar-placa/${placa}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar la placa:', error);
    
    // Manejo específico de errores
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Placa no encontrada');
      } else {
        throw new Error('Error en el servidor al buscar la placa');
      }
    } else {
      throw new Error('Error de conexión al buscar la placa');
    }
  }
};

export default notiApi;