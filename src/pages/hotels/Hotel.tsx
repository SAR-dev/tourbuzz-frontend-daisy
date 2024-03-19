import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorPage from "@src/components/ErrorPage";
import { HotelDataType, getHotelById } from "@src/api/hotel";
import HotelDetails from "@src/components/HotelDetails";
import LoaderScreen from "@src/components/LoaderScreen";

const Hotel = () => {
    const { id = "" } = useParams();
    const hotel = useQuery<HotelDataType, Error>({
        queryKey: ['hotel', Number(id)],
        queryFn: () => getHotelById({ id: Number(id) })
    })

    if(hotel.isError){
        return <ErrorPage error={hotel.error} />
    }

    if(hotel.isLoading){
        return <LoaderScreen />
    }

    return (
        <NavLayout>
            {hotel.data && (
                <HotelDetails hotel={hotel.data.data} />
            )}
        </NavLayout>
    )
}

export default Hotel;