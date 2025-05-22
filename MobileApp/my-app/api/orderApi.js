// orderApi.js
import axiosClient from './axiosClient';

const orderApi = {
    createOrder: (data) => axiosClient.post('/orders/create-payment', data),
};

export default orderApi;
