import { BookmarkIcon, QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/24/outline";
import ImageLoader from "./ImageLoader";
import { Link } from "react-router-dom";
import { TourListType } from "@src/types/tour";
import { countDaysAndNights, formatDate, getTopEmojiReactionsWithSummary, parsePrice, splitUniqueList } from "@src/functions/helpers";
import { TourReactionDataType, addReactionToTour, getReactionToTour } from "@src/api/reaction";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import toast from "react-hot-toast";
import { useReaction } from "@src/contexts/Reaction";
import EmojiDisplay from "./EmojiDisplay";

const TourCard = ({ tour }: { tour: TourListType }) => {
    const queryClient = useQueryClient();
    const { add } = useReaction()

    const daysAndNights = countDaysAndNights(tour.start_at, tour.finish_at);
    const startAt = formatDate(tour.start_at);
    const finishAt = formatDate(tour.finish_at);
    const districtNames = splitUniqueList(tour.district_names_list, 3)

    const tourReactions = useQuery<TourReactionDataType, Error>({
        queryKey: ['tour-reactions', tour.id],
        queryFn: () => getReactionToTour({ id: tour.id })
    })

    const reactionSummary = getTopEmojiReactionsWithSummary(tourReactions.data?.data ?? [], 8)

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

    return (
        <div className="card border border-base-300">
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2">
                    <div className="relative">
                        <ImageLoader
                            src={tour.avatar.source_url}
                            className="h-96 w-full object-cover card rounded-r-none"
                        />
                        <div className="absolute top-0 left-0 m-2">
                            <div className="bg-primary-content card text-sm font-medium px-2.5 py-0.5 text-primary card">
                                {tour.tour_type_name}
                            </div>
                        </div>
                        <div className="absolute bottom-0 m-2">
                            <EmojiDisplay reactionSummary={reactionSummary} handleEmojiSelect={handleEmojiSelect} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="card flex-row px-10 py-5">
                            <div className="w-full">
                                <div className="flex items-start">
                                    <Link to={`/tours/${tour.slug}`} className="title text-2xl font-semibold line-clamp-2 hover:text-info">
                                        {tour.title}
                                    </Link>
                                    <div className="flex items-center font-semibold">
                                        <button className="btn btn-ghost btn-sm w-8 h-8 p-0">
                                            <BookmarkIcon className="h-5 w-5" />
                                        </button>
                                        <button className="btn btn-ghost btn-sm w-8 h-8 p-0">
                                            <StarIcon className="h-5 w-5" />
                                        </button>
                                        <button className="btn btn-ghost btn-sm w-8 h-8 p-0">
                                            <QuestionMarkCircleIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <div>😎 Organized By: <b>{tour.organizer_name}</b></div>
                                    <div>🤝 {tour.group_size}. {tour.group_info}</div>
                                    <div>🚩 It will be a <b>{daysAndNights.days} days</b>, <b>{daysAndNights.nights} nights</b> jouney, starting at <b>{startAt.day} {startAt.month_name}, {startAt.year}</b></div>
                                    <div>⌛ Our journey will end on <b>{finishAt.day} {finishAt.month_name}, {finishAt.year}</b></div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-base-300 w-full"></div>
                        <div className="card justify-center px-10 py-5">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-1">
                                    <div>💰 Starting from <b>{parsePrice(Math.min.apply(Math, tour.package_prices_list))} TK</b>. {tour.package_prices_list.length} packages available.</div>
                                    <div>🛍️ Already booked by <b>265 Persons</b></div>
                                    <div>🚀 Start on <b>12 January, 2020</b></div>
                                    <div>🎯 Districts: <b>{districtNames.show.join(", ")}</b> {districtNames.hide.length > 0 ? `and ${districtNames.hide.length} more.` : "."}</div>
                                </div>
                                <div>
                                    <div className="mb-1">💯Free Cancellation😉</div>
                                    <button className={classNames({
                                        "btn btn-primary w-full": true,
                                        "btn-disabled": tour.expired
                                    })}>
                                        Book Now 🐱
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourCard;