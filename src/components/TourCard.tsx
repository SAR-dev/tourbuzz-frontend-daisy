import { BookmarkIcon, QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/24/outline"
import classNames from "classnames";

export enum TourCardType {
    PRIMARY,
    SECONDARY
}

const TourCard = ({ type, reversed }: { type: TourCardType, reversed?: boolean }) => {
    return (
        <div className={classNames({
            "bg-primary/10": type === TourCardType.PRIMARY,
            "bg-secondary/10": type === TourCardType.SECONDARY,
        })}>
            <div className="container mx-auto p-5 flex flex-col gap-5">
                <div className="grid grid-cols-2">
                    <img
                        src="https://media.istockphoto.com/id/546763388/photo/the-perfect-vantage-point.jpg?s=170667a&w=0&k=20&c=KcEe8bcUUAheYpdzIJ52Tk2N4ZY3OAtFRBjFCqI7Aq8="
                        className={classNames({
                            "h-96 w-full object-cover": true,
                            "order-last": reversed
                        })}
                        alt=""
                    />
                    <div className="flex flex-col justify-between">
                        <div className="pl-10 flex gap-5 items-start justify-between">
                            <div>
                                <div className="title text-2xl font-semibold">Hong Kong Disneyland Park Tickets</div>
                                <div className="my-2">😎 Organized By: Qrio</div>
                                <div className="flex flex-col gap-1">
                                    <div>🤝 Every group will be consisted of 100 persons</div>
                                    <div>🚩 It will be a 5 day jouney, starting at 5 March, 2024</div>
                                    <div>⌛ Our journey will end on 25 March,2024</div>
                                </div>
                            </div>
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
                        <div className="bg-orange-200 p-10">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col gap-1">
                                    <div>💰 From <b>10000TK</b></div>
                                    <div>🛍️ Already booked <b>265 Persons</b></div>
                                    <div>🚀 Start on <b>12 January, 2020</b></div>
                                    <div>🎯 Targeted places: Dhaka, Sundarban, Cumilla</div>
                                </div>
                                <div>
                                    <div className="mb-1">💯Free Cancellation😉</div>
                                    <button className="btn btn-primary w-full">
                                        Book Now
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