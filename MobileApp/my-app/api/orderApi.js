// orderApi.js
import axiosClient from './axiosClient';

const orderApi = {
    createOrder: (data) => axiosClient.post('/orders/create-payment', data),
    getMyOrders: () => axiosClient.get('/orders/my'),
    cancelOrder: (id) => axiosClient.post(`/orders/${id}/cancel`)
};

export default orderApi;
