import { BookmarkIcon, FaceSmileIcon, QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/24/outline";
import ImageLoader from "./ImageLoader";
import EmojiSelect from "./EmojiSelect";

const TourCard = () => {
    const handleEmojiSelect = (value: string) => {
        console.log(value)
    }

    return (
        <div className="card p-5 bg-primary/10">
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2">
                    <div className="relative">
                        <ImageLoader
                            src="https://wallpapercave.com/wp/wp11648188.jpg"
                            className="h-96 w-full object-cover card rounded-r-none"
                        />
                        <div className="absolute top-0 left-0 m-2">
                            <div className="bg-primary-content card text-sm font-medium px-2.5 py-0.5 text-primary card">
                                Upcoming Tour
                            </div>
                        </div>
                        <div className="absolute bottom-0 m-2">
                            <div className="flex gap-1">
                                <EmojiSelect
                                    button={
                                        <button className="reaction-badge w-7 p-0">
                                            <FaceSmileIcon className="h-5 w-5" />
                                        </button>
                                    }
                                    setEmoji={handleEmojiSelect}
                                />
                                <button className="reaction-badge">
                                    <span>🚀</span>
                                    <span>3</span>
                                </button>
                                <button className="reaction-badge">
                                    <span>🤗</span>
                                    <span>3</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="px-10 flex gap-5 items-start justify-between">
                            <div>
                                <div className="title text-2xl font-semibold">Hong Kong Disneyland Park Tickets</div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <div>😎 Organized By: Qrio</div>
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
                        <div className="bg-orange-200 text-black p-10 card rounded-l-none rounded-t-none">
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