import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import NoResultFound from "@src/components/NoResultFound";
import Title from "@src/components/Title";
import { ArticlePaginatedDataType, getArticleList } from "@src/api/article";
import ArticleCard from "@src/components/ArticleCard";

const ArticleList = () => {
    const [pageSize, setPageSize] = useState(9)
    const [pageNo, setPageNo] = useState(1)

    const articleListData = useQuery<ArticlePaginatedDataType, Error>({
        queryKey: ['articles', pageNo, pageSize],
        queryFn: () => getArticleList({ pageNo, pageSize })
    })

    if (articleListData.isLoading || articleListData.error || !articleListData.data) return;

    return (
        <NavLayout>
            <div className="container mx-auto px-10 pt-5 pb-16">
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <Title>Your Ultimate Tour Guide</Title>
                        <div>Discover Hidden Gems and Must-Visit Destinations with Our Curated List of Travel Adventures</div>
                    </div>

                    {articleListData.data.data.data.length == 0 && (
                        <NoResultFound />
                    )}

                    <div className='grid grid-cols-3 gap-5'>
                        {articleListData.data.data.data.map((e, i) => (
                            <ArticleCard article={e} key={i} />
                        ))}
                    </div>

                    <div>
                        <Pagination
                            page_no={articleListData.data.data.page_no}
                            page_size={articleListData.data.data.page_size}
                            has_prev={articleListData.data.data.has_prev}
                            has_next={articleListData.data.data.has_next}
                            total_result={articleListData.data.data.total_result}
                            total_pages={articleListData.data.data.total_pages}
                            setPageSize={setPageSize}
                            setPageNo={setPageNo}
                            page_sizes={[9, 18, 27]}
                        />
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default ArticleList