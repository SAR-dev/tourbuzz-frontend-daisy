import api from "./base";
import { PlaceType } from "@src/types/base";

export interface PlaceListDataType {
    data: PlaceType[]
}

export interface PlaceDataType {
    data: PlaceType
}

export interface PlacePaginatedDataType {
    data: {
        data: PlaceType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
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

export const getPlaceList = ({ pageNo, pageSize }: { pageNo: number, pageSize: number }): Promise<PlacePaginatedDataType> => {
    return api
        .get("/guest/places", {
            params: {
                page_no: pageNo,
                page_size: pageSize
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}