import { EmojiReactionType } from "@src/types/reaction";
import api from "./base";

export interface ReactionDataType {
    data: EmojiReactionType[]
}

export interface ReactionAddDataType {
    data: {
        added: boolean;
        removed: boolean;
    }
}

export const addReactionToTour = ({ id, emoji }: { id: number, emoji: string }): Promise<ReactionAddDataType> => {
    return api
        .post(`/guest/reactions/tours/${id}/${emoji}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const addReactionToArticle = ({ id, emoji }: { id: number, emoji: string }): Promise<ReactionAddDataType> => {
    return api
        .post(`/guest/reactions/articles/${id}/${emoji}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getReactionToTour = ({ id }: { id: number }): Promise<ReactionDataType> => {
    return api
        .get(`/guest/reactions/tours/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getReactionToArticle = ({ id }: { id: number }): Promise<ReactionDataType> => {
    return api
        .get(`/guest/reactions/articles/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}