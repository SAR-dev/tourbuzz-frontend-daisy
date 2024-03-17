import api from "./base";
import { TicketType } from "@src/types/base";

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