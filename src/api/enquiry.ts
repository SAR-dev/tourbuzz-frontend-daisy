import api from "./base";
import { EnquiryType } from "@src/types/base";

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