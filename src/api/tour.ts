import { TourListType } from "@src/types/tour";
import api from "./base";
import { TourType } from "@src/types/base";

export interface TourListDataType {
    data: TourListType[]
}

export interface TourDataType {
    data: TourType
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