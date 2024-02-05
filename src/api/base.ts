import { constants } from "@src/stores/constantStore";
import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem(constants.JWT_KEY);
        config.baseURL = import.meta.env.VITE_API_URL;
        if (jwt) config.headers.Authorization = jwt;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;