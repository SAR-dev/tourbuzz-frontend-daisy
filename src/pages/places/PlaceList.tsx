import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import NoResultFound from "@src/components/NoResultFound";
import Title from "@src/components/Title";
import { PlacePaginatedDataType, getPlaceList } from "@src/api/place";
import PlaceCard from "@src/components/PlaceCard";
import ErrorPage from "@src/components/ErrorPage";
import LoaderScreen from "@src/components/LoaderScreen";

const PlaceList = () => {
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)

    const placeListData = useQuery<PlacePaginatedDataType, Error>({
        queryKey: ['places', pageNo, pageSize],
        queryFn: () => getPlaceList({ pageNo, pageSize })
    })

    if(placeListData.isError){
        return <ErrorPage error={placeListData.error} />
    }

    if(placeListData.isLoading){
        return <LoaderScreen />
    }

    if (!placeListData.data) return;

    return (
        <NavLayout>
            <div className="container mx-auto px-10 pt-5 pb-16">
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <Title>A Bucket List of Must-See Places</Title>
                        <div>Explore diverse destinations, from bustling cities to serene natural wonders</div>
                    </div>

                    {placeListData.data.data.data.length == 0 && (
                        <NoResultFound />
                    )}

                    <div className='grid grid-cols-5 gap-5'>
                        {placeListData.data.data.data.map((e, i) => (
                            <PlaceCard place={e} key={i} />
                        ))}
                    </div>

                    <div>
                        <Pagination
                            page_no={placeListData.data.data.page_no}
                            page_size={placeListData.data.data.page_size}
                            has_prev={placeListData.data.data.has_prev}
                            has_next={placeListData.data.data.has_next}
                            total_result={placeListData.data.data.total_result}
                            total_pages={placeListData.data.data.total_pages}
                            setPageSize={setPageSize}
                            setPageNo={setPageNo}
                            page_sizes={[30, 60, 100]}
                        />
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default PlaceList