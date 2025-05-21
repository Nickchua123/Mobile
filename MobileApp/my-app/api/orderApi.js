import axiosClient from './axiosClient';

const orderApi = {
    createOrder: (data) => axiosClient.post('/order', data),
};

export default orderApi;
