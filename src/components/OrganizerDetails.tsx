import { TourListDataType, getTourByOrganizerId } from '@src/api/tour';
import { OrganizerType } from '@src/types/base';
import { useQuery } from '@tanstack/react-query'
import Title from './Title'
import ImageLoader from './ImageLoader'
import TourCard from './TourCard'

const OrganizerDetails = ({ organizer }: { organizer: OrganizerType }) => {
    const organizerTours = useQuery<TourListDataType, Error>({
        queryKey: ['organizer-tours', organizer.id],
        queryFn: () => getTourByOrganizerId({ id: organizer.id })
    })

    return (
        <div className="container mx-auto px-10 pt-5 pb-16">
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <Title>{organizer.name}</Title>
                            <div>{organizer.slogan}</div>
                        </div>
                        <div className="card h-[30rem] overflow-hidden">
                            <ImageLoader src={organizer.avatar?.optimized_url} modalSrc={organizer.avatar?.source_url} className="card w-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div>
                        <div className="pb-5 mb-5 border-b border-base-300">
                            <Title>Summary</Title>
                        </div>
                        <div className='whitespace-pre-line'>
                            {organizer.description}
                        </div>
                        <div className="mt-5">
                            <div className="flex flex-col gap-3">
                                {/* email */}
                                {/* verification */}
                                {/* contact no */}
                                <a href={organizer.social_link} target='_blank' className="link">
                                    Visit Social Site
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="pb-5 mb-5 border-b border-base-300">
                        <Title>Tours</Title>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                        {organizerTours.data && (
                            <section>
                                <div className="grid grid-cols-1 gap-8">
                                    {organizerTours.data.data.map((tour, i) => (
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

export default OrganizerDetails