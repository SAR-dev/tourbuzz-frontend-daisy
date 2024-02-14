import api from "./base";
import { ArticleType } from "@src/types/base";

export interface ArticleListDataType {
    data: ArticleType[]
}

export interface ArticleDataType {
    data: ArticleType
}

export const getLatestArticles = ({ count }: { count: number }): Promise<ArticleListDataType> => {
    return api
        .get(`/guest/articles/latest/${count}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}

export const getArticleBySlug = ({ slug }: { slug: string }): Promise<ArticleDataType> => {
    return api
        .get(`/guest/articles/${slug}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}