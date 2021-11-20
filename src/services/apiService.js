import axios from 'axios';
import ToastMessage from '../components/ToastMessage';

const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1'
});

// Treatment for generic HTTP response codes
api.interceptors.response.use(async response => {
    return response;
}, async error => {
    if (error.response) {
        if (400 === error.response.status) {
            const msg = error.response.data.error;
            if (msg) {
                ToastMessage.error(`Problemas no servidor: ${msg}`);
            }
        } else if (422 === error.response.status) {
            ToastMessage.error('Erro de formatação ou campos obrigatórios');
        } else if (500 === error.response.status) {
            ToastMessage.error('Erro interno no servidor');
        }
    } else if (error) {
        ToastMessage.error('Problemas de comunicação com o servidor');
    }
    return Promise.reject(error);
});
  
export default api;
