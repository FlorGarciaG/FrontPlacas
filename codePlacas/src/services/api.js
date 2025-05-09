import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

export const getPlacas = async () => {
  try {
    const response = await api.get('/getPlacas');
    return response.data; 
  } catch (error) {
    console.error('Error al obtener las placas:', error);
    throw error; 
  }
};

export default api;