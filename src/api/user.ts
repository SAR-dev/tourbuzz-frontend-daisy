import { DataResponseType } from "@src/types/base";
import api from "./base";

export const getLoggedInUser = (): Promise<DataResponseType> => {
    return api
        .get("/users/me")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { data: err, error: err || true };
        });
}
