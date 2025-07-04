import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',  // point to your Laravel backend
});

// Automatically attach the token from localStorage
api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
