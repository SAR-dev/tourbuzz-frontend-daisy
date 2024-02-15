import NavLayout from "@src/layouts/NavLayout";
import { ArticleDataType, getArticleBySlug } from "@src/api/article";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ArticleDetails from "@src/components/ArticleDetails";
import ErrorPage from "@src/components/ErrorPage";

const Article = () => {
    const { slug = "" } = useParams();
    const article = useQuery<ArticleDataType, Error>({
        queryKey: ['article', slug],
        queryFn: () => getArticleBySlug({ slug })
    })

    if(article.isError){
        return <ErrorPage error={article.error} />
    }

    return (
        <NavLayout>
            {article.data && (
                <ArticleDetails article={article.data.data} />
            )}
        </NavLayout>
    )
}

export default Article;