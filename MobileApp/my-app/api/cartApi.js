import axiosClient from './axiosClient';

const cartApi = {
    getMyCart: (email) => axiosClient.get(`/cart`, { params: { email } }), // render ra cart
    addToCart: (data) => axiosClient.post('/cart/add', data), // Post 
};

export default cartApi;
