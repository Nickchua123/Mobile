// api/productApi.js
import axiosClient from './axiosClient';

const productApi = {
    getAll: (page = 0, size = 4) =>
        axiosClient.get(`/products?page=${page}&size=${size}`),
    getById: (id) => axiosClient.get(`/products/${id}`)

};

export default productApi;
