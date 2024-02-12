import { EmojiReactionType } from "@src/types/reaction";
import api from "./base";

export interface TourReactionDataType {
    data: EmojiReactionType[]
}

export const addReactionToTour = ({ id, emoji }: { id: number, emoji: string }): Promise<TourReactionDataType> => {
    return api
        .post(`/user/reactions/tours/${id}/${emoji}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getReactionToTour = ({ id }: { id: number }): Promise<TourReactionDataType> => {
    return api
        .get(`/user/reactions/tours/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}