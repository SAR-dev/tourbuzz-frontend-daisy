import { TourListType } from "@src/types/tour";
import api from "./base";

export interface TourListDataType {
    data: TourListType[]
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