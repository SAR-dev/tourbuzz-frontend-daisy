import api from "./base";
import { ArticleType } from "@src/types/base";

export interface ArticleListDataType {
    data: ArticleType[]
}

export interface ArticleDataType {
    data: ArticleType
}

export interface ArticlePaginatedDataType {
    data: {
        data: ArticleType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
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

export const getArticleList = ({ pageNo, pageSize }: { pageNo: number, pageSize: number }): Promise<ArticlePaginatedDataType> => {
    return api
        .get("/guest/articles", {
            params: {
                page_no: pageNo,
                page_size: pageSize
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}