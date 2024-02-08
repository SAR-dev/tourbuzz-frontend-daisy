import api from "./base";
import { UserType } from "@src/types/user";

export interface UserDataType {
    data: UserType
}

export const getLoggedInUser = (): Promise<UserDataType> => {
    return api
        .get("/users/me")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}
