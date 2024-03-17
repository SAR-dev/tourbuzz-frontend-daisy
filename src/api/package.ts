import { BookCreateReq } from "@src/types/package";
import api from "./base";
import { DataResponseType } from "@src/types/base";

export const bookInvoice = ({ data }: { data: BookCreateReq }): Promise<DataResponseType> => {
    return api
        .post("/user/packages/book", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}