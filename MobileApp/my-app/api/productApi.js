// api/productApi.js
import axiosClient from './axiosClient';

const productApi = {
    getAll: (page = 0, size = 10) =>
        axiosClient.get(`/products?page=${page}&size=${size}`)
};

export default productApi;
