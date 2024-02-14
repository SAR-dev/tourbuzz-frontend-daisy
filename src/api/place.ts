import api from "./base";
import { PlaceType } from "@src/types/base";

export interface PlaceListDataType {
    data: PlaceType[]
}

export const getPopularPlaces = ({ count }: { count: number }): Promise<PlaceListDataType> => {
    return api
        .get(`/guest/places/popular/${count}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}