import api from "./base";
import { OrganizerType } from "@src/types/base";

export interface OrganizerListDataType {
    data: OrganizerType[]
}

export interface OrganizerDataType {
    data: OrganizerType
}

export const getRandomOrganizers = ({ count }: { count: number }): Promise<OrganizerListDataType> => {
    return api
        .get(`/guest/organizers/random/${count}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getOrganizerByUsername = ({ username }: { username: string }): Promise<OrganizerDataType> => {
    return api
        .get(`/guest/organizers/${username}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}