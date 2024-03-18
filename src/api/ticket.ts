import { BookCancelReq, BookCreateReq } from "@src/types/package";
import api from "./base";
import { DataResponseType, TicketType } from "@src/types/base";

export interface TicketListDataType {
    data: TicketType[]
}

export const getTickets = (): Promise<TicketListDataType> => {
    return api
        .get("/user/tickets")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const bookInvoice = ({ data }: { data: BookCreateReq }): Promise<DataResponseType> => {
    return api
        .post("/user/tickets/book", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const cancelInvoice = ({ data }: { data: BookCancelReq }): Promise<DataResponseType> => {
    return api
        .post("/user/tickets/cancel", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}