import { HotelType } from '@src/types/base';
import Title from './Title'
import ImageLoader from './ImageLoader'
import { TourListDataType, getTourByHotelId } from '@src/api/tour';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import NoResultFound from './NoResultFound';
import TourCard from './TourCard';
import { useAuthStore } from '@src/stores/authStore';
import { useSignInModalStore } from '@src/stores/signInModalStore';
import { useRef, useState } from 'react';
import { constants } from '@src/stores/constantStore';
import useLocalStorageState from 'use-local-storage-state';
import { CommentListDataType, addCommentByHotelId, getCommentsByHotelId } from '@src/api/comment';
import { useDebounceFn } from 'ahooks';
import { AddCommentType } from '@src/types/comment';
import toast from 'react-hot-toast';
import { PlayIcon } from '@heroicons/react/24/outline';
import CommentList from './CommentList';
import TextareaAutosize from 'react-textarea-autosize';

const HotelDetails = ({ hotel }: { hotel: HotelType }) => {
    const commentsRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const { isLoggedIn } = useAuthStore()
    const { setIsOpenSignIn } = useSignInModalStore();
    const [commentLimit, setCommentLimit] = useState(constants.COMMENT_LIMIT.HOTEL)

    const [commentDetails, setCommentDetails] = useLocalStorageState<string>(constants.COMMENT_STORE_KEY.HOTEL + hotel.id, {
        defaultValue: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const hotelTours = useQuery<TourListDataType, Error>({
        queryKey: ['hotel-tours', hotel.id],
        queryFn: () => getTourByHotelId({ id: hotel.id })
    })

    const hotelComments = useQuery<CommentListDataType, Error>({
        queryKey: [constants.REACT_QUERY_KEY.COMMENT.HOTEL, hotel.id, commentLimit],
        queryFn: () => getCommentsByHotelId({ id: hotel.id, limit: commentLimit })
    })

    const { run } = useDebounceFn(
        () => {
            if (commentsRef.current) {
                commentsRef.current.scrollIntoView({ behavior: "smooth", block: commentLimit === 0 ? "start" : "end", inline: "end" });
            }
        },
        {
            wait: 500,
        },
    );

    const handleCommentSubmit = () => {
        if (!isLoggedIn()) {
            setIsOpenSignIn(true)
            return;
        }
        if (commentDetails.length < 2) return;

        const data: AddCommentType = {
            reference_id: hotel.id,
            parent_id: 0,
            details: commentDetails
        }
        setIsLoading(true)
        addCommentByHotelId({ data })
            .then(() => {
                setCommentDetails("")
                queryClient.invalidateQueries({ queryKey: [constants.REACT_QUERY_KEY.COMMENT.HOTEL, hotel.id] })
                run()
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toogleLimit = () => {
        if (commentLimit === 0) {
            setCommentLimit(constants.COMMENT_LIMIT.HOTEL)
            run()
        } else {
            setCommentLimit(0)
            run()
        }
    }

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
                        <div ref={commentsRef}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="title text-2xl font-semibold">
                                    Discussion Threads ({hotelComments.data?.data ? hotelComments.data.data.length : 0})
                                </h2>
                            </div>
                            <div className="mb-6">
                                <TextareaAutosize
                                    minRows={6}
                                    className="textarea textarea-bordered w-full custom-scrollbar resize-none"
                                    placeholder="Share your thoughts..."
                                    value={commentDetails}
                                    onChange={e => setCommentDetails(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button className="btn btn-info mt-1" disabled={isLoading} onClick={handleCommentSubmit}>
                                    {isLoading ? (
                                        <div className="loading h-5 w-5" />
                                    ) : (
                                        <PlayIcon className='h-5 w-5' />
                                    )}
                                    Start new thread
                                </button>
                            </div>
                            {hotelComments.data && (
                                <CommentList
                                    comments={hotelComments.data.data}
                                    limit={commentLimit}
                                    toogleLimit={toogleLimit}
                                    submitReply={addCommentByHotelId}
                                    referenceId={hotel.id}
                                    queryKey={constants.REACT_QUERY_KEY.COMMENT.HOTEL}
                                    admins={hotel.admins}
                                    staffs={hotel.staffs}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className='grid grid-cols-1 gap-5'>
                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Review</Title>
                            </div>
                            <div className='whitespace-pre-line'>
                                {hotel.review}
                            </div>
                        </div>
                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Managers</Title>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {hotel.admins.filter(c => c.name?.length > 0).map((e, i) => (
                                    <div className='card border border-base-300 flex-row py-2 px-4 bg-info/20 items-center' key={i}>
                                        <div className='font-medium'>{e.name}</div>
                                        <div className='ml-auto card text-xs bg-primary/20 px-2 justify-center'>ADMIN</div>
                                    </div>
                                ))}
                                {hotel.staffs.filter(c => c.name?.length > 0).map((e, i) => (
                                    <div className='card border border-base-300 flex-row py-2 px-4 bg-info/20 items-center' key={i}>
                                        <div className='font-medium'>{e.name}</div>
                                        <div className='ml-auto card text-xs bg-secondary/20 px-2 justify-center'>STAFF</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-5">
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