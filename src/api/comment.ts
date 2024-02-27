import api from "./base";
import { CommentType } from "@src/types/comment";

export interface CommentListDataType {
    data: CommentType[]
}

export const getCommentsByArticleId = ({ id }: { id: number }): Promise<CommentListDataType> => {
    return api
        .get(`/guest/comments/article/${id}/parents`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}