import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import NoResultFound from "@src/components/NoResultFound";
import Title from "@src/components/Title";
import { OrganizerPaginatedDataType, getOrganizerList } from "@src/api/organizer";
import OrganizerCard from "@src/components/OrganizerCard";

const OrganizerList = () => {
    const [pageSize, setPageSize] = useState(9)
    const [pageNo, setPageNo] = useState(1)

    const organizerListData = useQuery<OrganizerPaginatedDataType, Error>({
        queryKey: ['organizers', pageNo, pageSize],
        queryFn: () => getOrganizerList({ pageNo, pageSize })
    })

    if (organizerListData.isLoading || organizerListData.error || !organizerListData.data) return;

    return (
        <NavLayout>
            <div className="container mx-auto px-10 pt-5 pb-16">
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <Title>Trusted Tour Organizers</Title>
                        <div>Plan Your Dream Trip: Discover the Best Tour Organizers to Turn Your Travel Dreams into Reality</div>
                    </div>

                    {organizerListData.data.data.data.length == 0 && (
                        <NoResultFound />
                    )}

                    <div className='grid grid-cols-3 gap-8 mt-5'>
                        {organizerListData.data.data.data.map((e, i) => (
                            <OrganizerCard organizer={e} key={i} />
                        ))}
                    </div>

                    <div>
                        <Pagination
                            page_no={organizerListData.data.data.page_no}
                            page_size={organizerListData.data.data.page_size}
                            has_prev={organizerListData.data.data.has_prev}
                            has_next={organizerListData.data.data.has_next}
                            total_result={organizerListData.data.data.total_result}
                            total_pages={organizerListData.data.data.total_pages}
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

export default OrganizerList