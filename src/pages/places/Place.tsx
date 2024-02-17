import NavLayout from "@src/layouts/NavLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorPage from "@src/components/ErrorPage";
import { PlaceDataType, getPlaceById } from "@src/api/place";
import PlaceDetails from "@src/components/PlaceDetails";

const Place = () => {
    const { id = "" } = useParams();
    const place = useQuery<PlaceDataType, Error>({
        queryKey: ['place', Number(id)],
        queryFn: () => getPlaceById({ id: Number(id) })
    })

    if(place.isError){
        return <ErrorPage error={place.error} />
    }

    return (
        <NavLayout>
            {place.data && (
                <PlaceDetails place={place.data.data} />
            )}
        </NavLayout>
    )
}

export default Place;