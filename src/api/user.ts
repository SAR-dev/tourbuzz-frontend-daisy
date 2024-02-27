import { DataResponseType } from "@src/types/base";
import api from "./base";
import { UserType, UserUpdateType } from "@src/types/user";

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

export const updateLoggedInUser = (data : UserUpdateType ): Promise<DataResponseType> => {
    return api
        .put("/users/me", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}
