import { DataResponseType, InvoiceCreateReq } from "@src/types/base";
import api from "./base";

export const initializeInvoice = ({ data }: { data: InvoiceCreateReq }): Promise<DataResponseType> => {
    return api
        .post("/user/bkash/invoice", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}
