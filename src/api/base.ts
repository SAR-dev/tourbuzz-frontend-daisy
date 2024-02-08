import { constants } from "@src/stores/constantStore";
import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem(constants.JWT_AUTH_KEY);
        config.baseURL = import.meta.env.VITE_API_URL;
        if (jwt) {
            const parsed = JSON.parse(jwt);
            if (parsed.state.token) {
                config.headers.Authorization = parsed.state.token
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;