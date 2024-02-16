import { AddEnquiryType } from "@src/types/enquiry";
import api from "./base";
import { DataResponseType, EnquiryType } from "@src/types/base";

export interface EnquiryListDataType {
    data: EnquiryType[]
}

export const getUserEnquiries = (): Promise<EnquiryListDataType> => {
    return api
        .get("/user/enquiries")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const postUserEnquiry = ({ ...props }: AddEnquiryType): Promise<DataResponseType> => {
    const data = { ...props }
    return api
        .post("/user/enquiries", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}