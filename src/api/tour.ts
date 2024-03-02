import { TourListType } from "@src/types/tour";
import api from "./base";
import { TourType } from "@src/types/base";

export interface TourListDataType {
    data: TourListType[]
}

export interface TourDataType {
    data: TourType
}

export interface TourPaginatedDataType {
    data: {
        data: TourListType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

export const getUpcomingTours = (): Promise<TourListDataType> => {
    return api
        .get("/guest/tours/upcoming")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getTourBySlug = ({ slug }: { slug: string }): Promise<TourDataType> => {
    return api
        .get(`/guest/tours/${slug}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getTourByPlaceId = ({ id }: { id: number }): Promise<TourListDataType> => {
    return api
        .get(`/guest/tours/place/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getTourByHotelId = ({ id }: { id: number }): Promise<TourListDataType> => {
    return api
        .get(`/guest/tours/hotel/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getTourByOrganizerId = ({ id }: { id: number }): Promise<TourListDataType> => {
    return api
        .get(`/guest/tours/organizer/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getTourList = ({ pageNo, pageSize }: { pageNo: number, pageSize: number }): Promise<TourPaginatedDataType> => {
    return api
        .get("/guest/tours", {
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