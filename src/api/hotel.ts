import api from "./base";
import { HotelType } from "@src/types/base";

export interface HotelListDataType {
    data: HotelType[]
}

export interface HotelDataType {
    data: HotelType
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