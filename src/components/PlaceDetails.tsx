import { TourListDataType, getTourByPlaceId } from '@src/api/tour'
import { PlaceType } from '@src/types/base'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Title from './Title'
import ImageLoader from './ImageLoader'
import TourCard from './TourCard'
import NoResultFound from './NoResultFound'
import { useAuthStore } from '@src/stores/authStore';
import { useSignInModalStore } from '@src/stores/signInModalStore';
import { useRef, useState } from 'react';
import { constants } from '@src/stores/constantStore';
import useLocalStorageState from 'use-local-storage-state';
import { CommentListDataType, addCommentByPlaceId, getCommentsByPlaceId } from '@src/api/comment';
import { useDebounceFn } from 'ahooks';
import { AddCommentType } from '@src/types/comment';
import toast from 'react-hot-toast';
import { PlayIcon } from '@heroicons/react/24/outline';
import CommentList from './CommentList';
import TextareaAutosize from 'react-textarea-autosize';

const PlaceDetails = ({ place }: { place: PlaceType }) => {
    const commentsRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const { isLoggedIn } = useAuthStore()
    const { setIsOpenSignIn } = useSignInModalStore();
    const [commentLimit, setCommentLimit] = useState(constants.COMMENT_LIMIT.PLACE)

    const [commentDetails, setCommentDetails] = useLocalStorageState<string>(constants.COMMENT_STORE_KEY.PLACE + place.id, {
        defaultValue: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const placeTours = useQuery<TourListDataType, Error>({
        queryKey: ['place-tours', place.id],
        queryFn: () => getTourByPlaceId({ id: place.id })
    })

    const placeComments = useQuery<CommentListDataType, Error>({
        queryKey: [constants.REACT_QUERY_KEY.COMMENT.PLACE, place.id, commentLimit],
        queryFn: () => getCommentsByPlaceId({ id: place.id, limit: commentLimit })
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
            reference_id: place.id,
            parent_id: 0,
            details: commentDetails
        }
        setIsLoading(true)
        addCommentByPlaceId({ data })
            .then(() => {
                setCommentDetails("")
                queryClient.invalidateQueries({ queryKey: [constants.REACT_QUERY_KEY.COMMENT.PLACE, place.id] })
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
            setCommentLimit(constants.COMMENT_LIMIT.PLACE)
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
                        <div ref={commentsRef}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="title text-2xl font-semibold">
                                    Discussion Threads ({placeComments.data?.data ? placeComments.data.data.length : 0})
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
                            {placeComments.data && (
                                <CommentList 
                                    comments={placeComments.data.data} 
                                    limit={commentLimit} 
                                    toogleLimit={toogleLimit} 
                                    submitReply={addCommentByPlaceId} 
                                    referenceId={place.id} 
                                    queryKey={constants.REACT_QUERY_KEY.COMMENT.PLACE} 
                                />
                            )}
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
                        <NoResultFound />
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