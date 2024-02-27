import { TourListDataType, getTourByPlaceId } from '@src/api/tour'
import { PlaceType } from '@src/types/base'
import { useQuery } from '@tanstack/react-query'
import Title from './Title'
import ImageLoader from './ImageLoader'
import TourCard from './TourCard'

const PlaceDetails = ({ place }: { place: PlaceType }) => {
    const placeTours = useQuery<TourListDataType, Error>({
        queryKey: ['place-tours', place.id],
        queryFn: () => getTourByPlaceId({ id: place.id })
    })

    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <Title>{place.name}</Title>
                            <div className="flex gap-3">
                                <div>📌 Location: {place.district.name}, {place.district.division.name}</div>
                                <div>🚩 Post Code: {place.postal_code}</div>
                                <div>🔖 Type: {place.type}</div>
                            </div>
                        </div>
                        <div className="card h-[30rem] overflow-hidden">
                            <ImageLoader src={place.avatar?.optimized_url} modalSrc={place.avatar?.source_url} className="card w-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div>
                        <div className="pb-5 mb-5 border-b border-base-300">
                            <Title>Description</Title>
                        </div>
                        <div className='whitespace-pre-line'>
                            {place.description}
                        </div>
                        <div className="mt-5">
                            <a href={place.map_link} target='_blank' className="link">
                                Visit Google Map
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="pb-5 mb-5 border-b border-base-300">
                        <Title>Tours</Title>
                    </div>
                    {placeTours.data && placeTours.data.data.length === 0 && (
                        <div className='text-info'>
                            🥺 No results found
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-5">
                        {placeTours.data && (
                            <section>
                                <div className="grid grid-cols-1 gap-8">
                                    {placeTours.data.data.map((tour, i) => (
                                        <TourCard tour={tour} key={i} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceDetails