import api from "./base";
import { HotelType } from "@src/types/base";

export interface HotelListDataType {
    data: HotelType[]
}

export interface HotelDataType {
    data: HotelType
}

export interface HotelPaginatedDataType {
    data: {
        data: HotelType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

export const getRandomHotels = ({ count }: { count: number }): Promise<HotelListDataType> => {
    return api
        .get(`/guest/hotels/random/${count}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getHotelById = ({ id }: { id: number }): Promise<HotelDataType> => {
    return api
        .get(`/guest/hotels/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getHotelList = ({ pageNo, pageSize }: { pageNo: number, pageSize: number }): Promise<HotelPaginatedDataType> => {
    return api
        .get("/guest/hotels", {
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