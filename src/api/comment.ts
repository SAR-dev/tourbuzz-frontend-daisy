import { DataResponseType } from "@src/types/base";
import api from "./base";
import { AddCommentType, ParentCommentType } from "@src/types/comment";

export interface CommentListDataType {
    data: ParentCommentType[]
}

export const getCommentsByArticleId = ({ id, limit }: { id: number, limit: number }): Promise<CommentListDataType> => {
    return api
        .get(`/guest/comments/article/${id}/parents`, {
            params: {
                limit
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const addCommentByArticleId = ({ data }: { data: AddCommentType }): Promise<DataResponseType> => {
    return api
        .post(`/user/comments/article`, data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}