import { TourDataType, getTourBySlug } from "@src/api/tour"
import ErrorPage from "@src/components/ErrorPage";
import TourDetails from "@src/components/TourDetails";
import NavLayout from "@src/layouts/NavLayout"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";

const Tour = () => {
    const { slug = "" } = useParams();
    const tour = useQuery<TourDataType, Error>({
        queryKey: ['tour', slug],
        queryFn: () => getTourBySlug({ slug })
    })

    if(tour.isError){
        return <ErrorPage error={tour.error} />
    }

    return (
        <NavLayout>
            {tour.data && (
                <TourDetails tour={tour.data.data} />
            )}
        </NavLayout>
    )
}

export default Tour
