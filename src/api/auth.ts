import { DataResponseType } from "@src/types/base";
import api from "./base";

export const sendMagicLink = ({ email }: { email: string }): Promise<DataResponseType> => {
    const data = { email }
    return api
        .post("/auth/magic-link", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { data: err, error: err || true };
        });
}

export const verifyToken = ({ magic_token }: { magic_token: string }): Promise<DataResponseType> => {
    const data = { magic_token }
    return api
        .post("/auth/user-sign-in-token", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { data: err, error: err || true };
        });
}

export const verifyKey = ({ email, magic_key }: { email: string, magic_key: string }): Promise<DataResponseType> => {
    const data = { email, magic_key }
    return api
        .post("/auth/user-sign-in-key", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { data: err, error: err || true };
        });
}