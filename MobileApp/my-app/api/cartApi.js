import axiosClient from './axiosClient';

const cartApi = {
    // getMyCart: (email) => axiosClient.get(`/cart`, { params: { email } }), // render ra cart
    getMyCart: () => axiosClient.get('/cart'), // JWT xác định user

    addToCart: (data) => axiosClient.post('/cart/add', data), // Post 
    deleteCartItem: (productId) => axiosClient.delete(`/cart/${productId}`),

};

export default cartApi;
