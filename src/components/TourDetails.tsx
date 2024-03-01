import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, PlayIcon } from "@heroicons/react/24/solid";
import Carousel from "@src/components/Carousel"
import ImageLoader from "@src/components/ImageLoader"
import MarkdownRenderer from "@src/components/MarkdownRenderer"
import TabList from "@src/components/TabList"
import Title from "@src/components/Title"
import TourPlacecard from "@src/components/TourPlacecard"
import { formatDate, getTopEmojiReactionsWithSummary, parrseToNDigit, parsePrice } from "@src/functions/helpers";
import { TourType } from "@src/types/base";
import classNames from "classnames";
import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import { Link } from "react-router-dom";
import TourPackage from "./TourPackage";
import TourLogCard from "./TourLogCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactionDataType, addReactionToTour, getReactionToTour } from "@src/api/reaction";
import EmojiDisplay from "./EmojiDisplay";
import { useReaction } from "@src/contexts/Reaction";
import toast from "react-hot-toast";
import OrganizerVerification from "./OrganizerVerification";
import { constants } from "@src/stores/constantStore";
import { useAuthStore } from "@src/stores/authStore";
import { useSignInModalStore } from "@src/stores/signInModalStore";
import { CommentListDataType, addCommentByTourId, getCommentsByToureId } from "@src/api/comment";
import { useDebounceFn } from "ahooks";
import useLocalStorageState from "use-local-storage-state";
import { AddCommentType } from "@src/types/comment";
import CommentList from "./CommentList";
import TextareaAutosize from 'react-textarea-autosize';

const TourDetails = ({ tour }: { tour: TourType }) => {
    const queryClient = useQueryClient();
    const { add } = useReaction()
    const commentsRef = useRef<HTMLDivElement>(null);

    const { isLoggedIn } = useAuthStore()
    const { setIsOpenSignIn } = useSignInModalStore();
    const [commentLimit, setCommentLimit] = useState(constants.COMMENT_LIMIT.TOUR)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [showHighlights, setShowHighlights] = useState(false)
    const [showPlaces, setShowPlaces] = useState(false)

    const [commentDetails, setCommentDetails] = useLocalStorageState<string>(constants.TOUR_COMMENT_STORE_KEY + tour.id, {
        defaultValue: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const startDate = formatDate(tour.start_at)
    const finishDate = formatDate(tour.finish_at)
    const lateSaleDate = formatDate(tour.last_sell_at)

    const tourReactions = useQuery<ReactionDataType, Error>({
        queryKey: ['tour-reactions', tour.id],
        queryFn: () => getReactionToTour({ id: tour.id })
    })

    const tourComments = useQuery<CommentListDataType, Error>({
        queryKey: ['tour-comments', tour.id, commentLimit],
        queryFn: () => getCommentsByToureId({ id: tour.id, limit: commentLimit })
    })

    const reactionSummary = getTopEmojiReactionsWithSummary(tourReactions.data?.data ?? [], 12)

    const handleEmojiSelect = (value: string) => {
        addReactionToTour({ id: tour.id, emoji: value })
            .then((res) => {
                queryClient.invalidateQueries({ queryKey: ['tour-reactions', tour.id] })
                if (res.data.added) {
                    add({ emoji: value })
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }

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
        if(!isLoggedIn()){
            setIsOpenSignIn(true)
            return;
          }
        if (commentDetails.length < 2) return;

        const data: AddCommentType = {
            reference_id: tour.id,
            parent_id: 0,
            details: commentDetails
        }
        setIsLoading(true)
        addCommentByTourId({ data })
            .then(() => {
                setCommentDetails("")
                queryClient.invalidateQueries({ queryKey: ['tour-comments', tour.id] })
                run()
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleReplySubmit = ({ ...props }: {
        parent_id: number,
        setLoading: (props: boolean) => void,
        replyDetails: string,
        setReplyDetails: (props: string) => void,
        setShowReplyEditor: (props: boolean) => void
    }) => {
        if (!isLoggedIn()) {
            setIsOpenSignIn(true)
            return;
        }
        if (props.replyDetails.length < 2) return;

        const data: AddCommentType = {
            reference_id: tour.id,
            parent_id: props.parent_id,
            details: props.replyDetails
        }
        props.setLoading(true)
        addCommentByTourId({ data })
            .then(() => {
                props.setReplyDetails("")
                props.setShowReplyEditor(false)
                queryClient.invalidateQueries({ queryKey: ['tour-comments', tour.id] })
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                props.setLoading(false)
            })
    }

    const toogleLimit = () => {
        if(commentLimit === 0){
            setCommentLimit(constants.COMMENT_LIMIT.ARTICLE)
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
                            <Title>
                                {tour.title}
                            </Title>
                            <div className="flex gap-1 items-center">
                                This tour is organized by
                                <Link to={`/organizers/${tour.organizer.username}`} className="link link-hover">
                                    {tour.organizer.name}
                                </Link>.
                                This organizer is {tour.organizer.verification} verified.
                                <OrganizerVerification organizer={tour.organizer}>
                                    <button className="btn btn-circle btn-ghost btn-xs text-info">
                                        <InformationCircleIcon className="h-4 w-4" />
                                    </button>
                                </OrganizerVerification>
                            </div>
                        </div>
                        <div className="card h-[30rem] border border-gray-300 overflow-hidden">
                            <Carousel>
                                {tour.video_link.length > 0 && (
                                    <div className="carousel-item w-full h-[30rem]">
                                        <ReactPlayer url={tour.video_link} height="30rem" width="100%" controls />
                                    </div>
                                )}
                                {tour.images.map((e, i) => (
                                    <div className="carousel-item w-full h-[30rem]" key={i}>
                                        <ImageLoader src={e.optimized_url} modalSrc={e.source_url} className="w-full object-cover" />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="w-full flex gap-3 items-center">
                            <EmojiDisplay reactionSummary={reactionSummary} handleEmojiSelect={handleEmojiSelect} minimal />
                            {reactionSummary.topReactions.length < 5 && (
                                <div className="text-sm text-base-content/50">Give a reaction to let others know how you feel...</div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                👉 Tour Destination Checklist
                            </div>
                            <div className={classNames({
                                "grid grid-cols-5 gap-5": true,
                                "h-32 overflow-hidden": !showPlaces
                            })}>
                                {tour.places.map((e, i) => (
                                    <TourPlacecard place={e} key={i} />
                                ))}
                            </div>
                            {!showPlaces && tour.places.length > 5 && (
                                <div>
                                    <button className="btn btn-sm" onClick={() => setShowPlaces(true)}>
                                        See {tour.places.length - 5} more places
                                        <ChevronRightIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="bg-orange-200/20 card p-5">
                            <div className={classNames({
                                "line-clamp-5 overflow-hidden": !showHighlights
                            })}>
                                <MarkdownRenderer md_text={tour.highlights} />
                            </div>
                            {!showHighlights && (
                                <div className="mt-3">
                                    <button className="btn btn-sm" onClick={() => setShowHighlights(true)}>
                                        See Full Highlights
                                        <ChevronRightIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                🤔 What to Expect
                            </div>
                            <MarkdownRenderer md_text={tour.md_desc} />
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                📒 Day By Day Itinerary
                            </div>
                            {tour.tour_logs.map((tour_log, i) => (
                                <TourLogCard tour_log={tour_log} start_date={tour.start_at} key={i} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                🧐 Frequently Asked Questions
                            </div>
                            <MarkdownRenderer md_text={tour.faq} />
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                🚙 Pickup Locations and Guidelines
                            </div>
                            <MarkdownRenderer md_text={tour.start_ins} />
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                🤝 Dropoff Locations and Guidelines
                            </div>
                            <MarkdownRenderer md_text={tour.finish_ins} />
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                🔖 Ticket Cancellation
                            </div>
                            <MarkdownRenderer md_text={tour.cancel_ins} />
                        </div>

                        <div ref={commentsRef}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="title text-2xl font-semibold">
                                    Discussion Threads ({tourComments.data?.data ? tourComments.data.data.length : 0})
                                </h2>
                            </div>
                            <div className="mb-6">
                                <TextareaAutosize
                                    rows={6}
                                    className="textarea textarea-bordered w-full custom-scrollbar resize-none"
                                    placeholder="Share your thoughts..."
                                    value={commentDetails}
                                    onChange={e => setCommentDetails(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button className="btn btn-info mt-1" disabled={isLoading} onClick={handleCommentSubmit}>
                                    {isLoading ? (
                                        <div className="loading h-5 w-5" />
                                    ):(
                                        <PlayIcon className='h-5 w-5' />
                                    )}
                                    Start new thread
                                </button>
                            </div>
                            {tourComments.data && (
                                <CommentList comments={tourComments.data.data} limit={commentLimit} toogleLimit={toogleLimit} submitReply={handleReplySubmit} />
                            )}
                        </div>
                    </div>

                </div>
                <div className="col-span-1">
                    <div className="flex flex-col gap-10 sticky top-[5rem]">
                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Summary</Title>
                                <div>Key details regarding the tour</div>
                            </div>
                            <div className="border border-base-300 card grid grid-cols-3 divide-y divide-base-300">
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">📅 Start Date</div><div className="p-2 col-span-2">{startDate.month_name} {startDate.day}, {startDate.year} ({startDate.weekday.slice(0, 3)})</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🌐 End Date</div><div className="p-2 col-span-2">{finishDate.month_name} {finishDate.day}, {finishDate.year} ({finishDate.weekday.slice(0, 3)})</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🎫 Ticket Sale End</div><div className="p-2 col-span-2">{lateSaleDate.month_name} {lateSaleDate.day}, {lateSaleDate.year} {parrseToNDigit(lateSaleDate.hour12, 2)}:{parrseToNDigit(lateSaleDate.minute, 2)} {lateSaleDate.period}</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">👥 Group Size</div><div className="p-2 col-span-2">{tour.group_size}</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🤝 Group Info</div><div className="p-2 col-span-2">{tour.group_info}</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🚍 Transport</div><div className="p-2 col-span-2">{tour.transports}</div>
                            </div>
                        </div>
                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Packages</Title>
                                <div>Unveil Our Range of Enchanting Tour Packages</div>
                            </div>
                            <div>
                                <TabList
                                    tabs={tour.packages.map(e => {
                                        return {
                                            name: e.title,
                                            children: <TourPackage pac={e} />
                                        }
                                    })}
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                />
                                <button className="btn btn-accent w-full mt-2">
                                    Purchase Ticket ({parsePrice(tour.packages[selectedIndex].price)} TK)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetails
