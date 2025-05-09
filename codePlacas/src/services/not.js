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
  }
};

export default notiApi;