import { DataResponseType, InvoiceCreateReq } from "@src/types/base";
import api from "./base";

export const getPaymentLink = ({ data }: { data: InvoiceCreateReq }): Promise<DataResponseType> => {
    return api
        .post("/user/bkash/payment-link", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}
