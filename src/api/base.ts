import { constants } from "@src/stores/constantStore";
import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem(constants.JWT_KEY);
        if (jwt) {
            config.headers.Authorization = jwt;
            config.baseURL = import.meta.env.VITE_API_URL;
        } else {
            config.baseURL = import.meta.env.VITE_API_URL;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);