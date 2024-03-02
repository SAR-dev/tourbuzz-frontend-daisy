import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import NoResultFound from "@src/components/NoResultFound";
import Title from "@src/components/Title";
import { TourPaginatedDataType, getTourList } from "@src/api/tour";
import TourCard from "@src/components/TourCard";

const TourList = () => {
    const [pageSize, setPageSize] = useState(10)
    const [pageNo, setPageNo] = useState(1)

    const tourListData = useQuery<TourPaginatedDataType, Error>({
        queryKey: ['tours', pageNo, pageSize],
        queryFn: () => getTourList({ pageNo, pageSize })
    })

    if (tourListData.isLoading || tourListData.error || !tourListData.data) return;

    return (
        <NavLayout>
            <div className="container mx-auto px-10 pt-5 pb-16">
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <Title>Explore Your Next Adventure</Title>
                        <div>Discover Unforgettable Experiences with Our Curated List of Travel Plans and Destinations</div>
                    </div>

                    {tourListData.data.data.data.length == 0 && (
                        <NoResultFound />
                    )}

                    <div className='grid grid-cols-1 gap-5'>
                        {tourListData.data.data.data.map((e, i) => (
                            <TourCard tour={e} key={i} />
                        ))}
                    </div>

                    <div>
                        <Pagination
                            page_no={tourListData.data.data.page_no}
                            page_size={tourListData.data.data.page_size}
                            has_prev={tourListData.data.data.has_prev}
                            has_next={tourListData.data.data.has_next}
                            total_result={tourListData.data.data.total_result}
                            total_pages={tourListData.data.data.total_pages}
                            setPageSize={setPageSize}
                            setPageNo={setPageNo}
                            page_sizes={[10, 20, 30]}
                        />
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default TourList