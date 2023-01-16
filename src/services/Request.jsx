import axios from "axios";

export const BASE_URL = 'http://127.0.0.1:8000/api';

export const apiFetch = axios.create({
    baseURL: BASE_URL,
});

apiFetch.interceptors.request.use(config => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers["Authorization"] = token ? `Bearer ${token}` : '';
    return config;
});