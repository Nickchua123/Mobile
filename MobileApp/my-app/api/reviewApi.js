import axiosClient from './axiosClient';
import axios from './axiosClient';

const reviewApi = {
    addReview: (review) => axiosClient.post('/reviews', review),
};

export default reviewApi;
