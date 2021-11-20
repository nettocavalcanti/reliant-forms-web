import axios from 'axios';
import ToastMessage from '../components/ToastMessage';
import Messages from './messages';

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
                ToastMessage.error(`${Messages.SERVER_ERROR} ${msg}`);
            }
        } else if (422 === error.response.status) {
            ToastMessage.error(Messages.FIELD_FORMAT_ERROR);
        } else if (500 === error.response.status) {
            ToastMessage.error(Messages.INTERNAL_SERVER_ERROR);
        }
    } else if (error) {
        ToastMessage.error(Messages.SERVER_COMMUNICATION_FAILURE);
    }
    return Promise.reject(error);
});
  
export default api;
