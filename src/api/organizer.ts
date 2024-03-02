import api from "./base";
import { OrganizerType } from "@src/types/base";

export interface OrganizerListDataType {
    data: OrganizerType[]
}

export interface OrganizerDataType {
    data: OrganizerType
}

export interface OrganizerPaginatedDataType {
    data: {
        data: OrganizerType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
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

export const getOrganizerList = ({ pageNo, pageSize }: { pageNo: number, pageSize: number }): Promise<OrganizerPaginatedDataType> => {
    return api
        .get("/guest/organizers", {
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