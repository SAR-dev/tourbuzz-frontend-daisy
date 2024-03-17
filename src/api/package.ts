import api from "./base";
import { DataResponseType, InvoiceCreateReq } from "@src/types/base";

export const bookInvoice = ({ data }: { data: InvoiceCreateReq }): Promise<DataResponseType> => {
    return api
        .post("/user/packages/book", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}