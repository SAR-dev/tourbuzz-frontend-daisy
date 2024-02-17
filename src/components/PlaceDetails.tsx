import { TourListDataType, getTourByPlaceId } from '@src/api/tour'
import { PlaceType } from '@src/types/base'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
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
            <div className="grid grid-cols-1 gap-8">
                <section className="flex gap-5">
                    <div className="w-72 h-48 card flex-shrink-0 overflow-hidden">
                        <ImageLoader src={place.avatar?.optimized_url} modalSrc={place.avatar?.source_url} className='w-full h-48 object-cover' />
                    </div>
                    <div>
                        <Title>{place.name}</Title>
                        <div className='mt-3 flex flex-col gap-2'>
                            <div>📌 Location: {place.district.name}, {place.district.division.name}</div>
                            <div>🚩 Post Code: {place.postal_code}</div>
                            <div>🔖 Type: {place.type}</div>
                            <div>🔰 Map: <a className='link-hover' href={place.map_link} target='_blank'>{place.map_link}</a></div>
                        </div>
                    </div>
                </section>
                {placeTours.data && (
                    <section>
                        <div className="mb-10">
                            <Title to="/tours">Related Tours</Title>
                        </div>
                        <div className="grid grid-cols-1 gap-8">
                            {placeTours.data.data.map((tour, i) => (
                                <TourCard tour={tour} key={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}

export default PlaceDetails