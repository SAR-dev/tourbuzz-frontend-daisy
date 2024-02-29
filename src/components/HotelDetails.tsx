import { HotelType } from '@src/types/base';
import Title from './Title'
import ImageLoader from './ImageLoader'
import { TourListDataType, getTourByHotelId } from '@src/api/tour';
import { useQuery } from '@tanstack/react-query';
import NoResultFound from './NoResultFound';
import TourCard from './TourCard';

const HotelDetails = ({ hotel }: { hotel: HotelType }) => {
    const hotelTours = useQuery<TourListDataType, Error>({
        queryKey: ['hotel-tours', hotel.id],
        queryFn: () => getTourByHotelId({ id: hotel.id })
    })

    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <Title>{hotel.name}</Title>
                            <div className="flex gap-3">
                                <div>📌 Location: {hotel.district.name}, {hotel.district.division.name}</div>
                            </div>
                        </div>
                        <div className="card h-[30rem] overflow-hidden">
                            <ImageLoader src={hotel.avatar?.optimized_url} modalSrc={hotel.avatar?.source_url} className="card w-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div>
                        <div className="pb-5 mb-5 border-b border-base-300">
                            <Title>Review</Title>
                        </div>
                        <div className='whitespace-pre-line'>
                            {hotel.review}
                        </div>
                        <div className="flex gap-5 mt-5">
                            <a href={hotel.map_link} target='_blank' className="link">
                                Visit Google Map
                            </a>
                            <a href={hotel.website} target='_blank' className="link">
                                Visit Website
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="pb-5 mb-5 border-b border-base-300">
                        <Title>Tours</Title>
                    </div>
                    {hotelTours.data && hotelTours.data.data.length === 0 && (
                        <NoResultFound />
                    )}
                    <div className="grid grid-cols-1 gap-5">
                        {hotelTours.data && (
                            <section>
                                <div className="grid grid-cols-1 gap-8">
                                    {hotelTours.data.data.map((tour, i) => (
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

export default HotelDetails