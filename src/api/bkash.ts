import { DataResponseType } from "@src/types/base";
import api from "./base";
import { InvoiceCreateReq } from "@src/types/package";

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

export const checkInvoice = ({ invoice_no }: { invoice_no: string }): Promise<DataResponseType> => {
    return api
        .get(`/user/bkash/invoice/${invoice_no}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}
