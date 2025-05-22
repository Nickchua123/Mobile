// api/addressApi.js
import axiosClient from './axiosClient';

const addressApi = {
    getAll: () => axiosClient.get('/addresses'),
    add: (data) => axiosClient.post('/addresses', data),
};

export default addressApi;
