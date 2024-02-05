import api from "./base";

export const sendMagicLink = ({ email }: { email: string }) => {
    const data = { email }
    return api
        .post("/auth/magic-link", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const verifyToken = ({ magic_token }: { magic_token: string }) => {
    const data = { magic_token }
    return api
        .post("/auth/user-sign-in", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}