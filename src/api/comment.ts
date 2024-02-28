import api from "./base";
import { CommentType } from "@src/types/comment";

export interface CommentListDataType {
    data: CommentType[]
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