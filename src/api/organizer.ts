import api from "./base";
import { OrganizerType } from "@src/types/base";

export interface OrganizerListDataType {
    data: OrganizerType[]
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