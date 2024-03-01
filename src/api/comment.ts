import { DataResponseType } from "@src/types/base";
import api from "./base";
import { AddCommentType, ParentCommentType, UpdateCommentType } from "@src/types/comment";

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

export const getCommentsByTourId = ({ id, limit }: { id: number, limit: number }): Promise<CommentListDataType> => {
    return api
        .get(`/guest/comments/tour/${id}/parents`, {
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

export const getCommentsByHotelId = ({ id, limit }: { id: number, limit: number }): Promise<CommentListDataType> => {
    return api
        .get(`/guest/comments/hotel/${id}/parents`, {
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

export const getCommentsByPlaceId = ({ id, limit }: { id: number, limit: number }): Promise<CommentListDataType> => {
    return api
        .get(`/guest/comments/place/${id}/parents`, {
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

export const getCommentsByOrganizerId = ({ id, limit }: { id: number, limit: number }): Promise<CommentListDataType> => {
    return api
        .get(`/guest/comments/organizer/${id}/parents`, {
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

export const addCommentByTourId = ({ data }: { data: AddCommentType }): Promise<DataResponseType> => {
    return api
        .post(`/user/comments/tour`, data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const addCommentByHotelId = ({ data }: { data: AddCommentType }): Promise<DataResponseType> => {
    return api
        .post(`/user/comments/hotel`, data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const addCommentByPlaceId = ({ data }: { data: AddCommentType }): Promise<DataResponseType> => {
    return api
        .post(`/user/comments/place`, data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const addCommentByOrganizerId = ({ data }: { data: AddCommentType }): Promise<DataResponseType> => {
    return api
        .post(`/user/comments/organizer`, data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const updateComment = ({ data }: { data: UpdateCommentType }): Promise<DataResponseType> => {
    return api
        .put(`/user/comments`, data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const deleteComment = ({ id }: { id: number }): Promise<DataResponseType> => {
    return api
        .delete(`/user/comments/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}