import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import HotelCard from "@src/components/HotelCard";
import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import { HotelPaginatedDataType, getHotelList } from "@src/api/hotel";
import NoResultFound from "@src/components/NoResultFound";
import Title from "@src/components/Title";
import ErrorPage from "@src/components/ErrorPage";
import LoaderScreen from "@src/components/LoaderScreen";

const HotelList = () => {
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)

    const hotelListData = useQuery<HotelPaginatedDataType, Error>({
        queryKey: ['hotels', pageNo, pageSize],
        queryFn: () => getHotelList({ pageNo, pageSize })
    })

    if(hotelListData.isError){
        return <ErrorPage error={hotelListData.error} />
    }

    if(hotelListData.isLoading){
        return <LoaderScreen />
    }

    if (!hotelListData.data) return;

    return (
        <NavLayout>
            <div className="container mx-auto px-10 pt-5 pb-16">
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <Title>Discover Your Perfect Stay</Title>
                        <div>Explore a Diverse Collection of Hotels Tailored to Your Travel Needs</div>
                    </div>

                    {hotelListData.data.data.data.length == 0 && (
                        <NoResultFound />
                    )}

                    <div className='grid grid-cols-5 gap-5'>
                        {hotelListData.data.data.data.map((e, i) => (
                            <HotelCard hotel={e} key={i} />
                        ))}
                    </div>

                    <div>
                        <Pagination
                            page_no={hotelListData.data.data.page_no}
                            page_size={hotelListData.data.data.page_size}
                            has_prev={hotelListData.data.data.has_prev}
                            has_next={hotelListData.data.data.has_next}
                            total_result={hotelListData.data.data.total_result}
                            total_pages={hotelListData.data.data.total_pages}
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

export default HotelList