import { dateDifferenceInDays, formatDate, parrseToNDigit } from '@src/functions/helpers'
import { TourLogType } from '@src/types/base'
import ImageLoader from './ImageLoader'
import Carousel from './Carousel'
import { useState } from 'react'
import classNames from 'classnames'
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom'

const TourLogCard = ({ tour_log, start_date }: { tour_log: TourLogType, start_date: Date }) => {
    const [isOpen, setIsOpen] = useState(false)
    const date = formatDate(tour_log.date)

    return (
        <div className='card p-3 gap-3 border border-base-300'>
            <div className="flex gap-5">
                <div className="card h-52 w-64 flex-shrink-0 overflow-hidden">
                    <Carousel smallButton>
                        {tour_log.images.map((image, i) => (
                            <div className="carousel-item h-full w-full" key={i}>
                                <ImageLoader src={image.optimized_url} modalSrc={image.source_url} className='h-full w-full object-cover' />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <div className="flex justify-between text-base-content/75">
                        <div>Day {parrseToNDigit(dateDifferenceInDays(start_date, tour_log.date), 2)}</div> 
                        <div>{parrseToNDigit(date.day, 2)} {date.month_name.slice(0, 3)}, {date.year}</div>
                    </div>
                    <div className="font-semibold title">{tour_log.title}</div>
                    <div className={classNames({
                        'whitespace-pre-line': true,
                        'line-clamp-4': !isOpen
                    })}>
                        {tour_log.description}
                    </div>
                    {isOpen && (
                        <>
                            <div className="mt-3">
                                <div className="font-semibold title">Destinations</div>
                                <div className="flex gap-3 mt-1">
                                    {tour_log.places.map((place, i) => (
                                        <Link className='btn btn-sm' to={`/places/${place.id}`} key={i}>📍 {place.name}</Link>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="font-semibold title">Hotel</div>
                                <Link to={`/hotels/${tour_log.hotel.id}`} className="btn btn-sm text-sm">
                                    🛏️ {tour_log.hotel.name}
                                </Link>
                            </div>
                        </>
                    )}
                    {!isOpen && (
                        <button className="btn btn-sm" onClick={() => setIsOpen(true)}>
                            Expand
                            <ChevronDownIcon className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TourLogCard