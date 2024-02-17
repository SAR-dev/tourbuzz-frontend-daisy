import api from "./base";
import { PlaceType } from "@src/types/base";

export interface PlaceListDataType {
    data: PlaceType[]
}

export interface PlaceDataType {
    data: PlaceType
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

export const getPlaceById = ({ id }: { id: number }): Promise<PlaceDataType> => {
    return api
        .get(`/guest/places/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}