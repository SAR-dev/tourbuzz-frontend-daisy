import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import ArticleCard from "@src/components/ArticleCard"
import Carousel from "@src/components/Carousel"
import ImageLoader from "@src/components/ImageLoader"
import MarkdownRenderer from "@src/components/MarkdownRenderer"
import TabList from "@src/components/TabList"
import Title from "@src/components/Title"
import TourPlacecard from "@src/components/TourPlacecard"
import { formatDate, parrseToNDigit, parsePrice } from "@src/functions/helpers";
import { constants } from "@src/stores/constantStore"
import { TourType } from "@src/types/base";
import classNames from "classnames";
import { useState } from "react"
import ReactPlayer from "react-player"
import { Link } from "react-router-dom";
import TourPackage from "./TourPackage";

const TourDetails = ({ tour }: { tour: TourType }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [showHighlights, setShowHighlights] = useState(false)
    const [showPlaces, setShowPlaces] = useState(false)
    const startDate = formatDate(tour.start_at)
    const finishDate = formatDate(tour.finish_at)
    const lateSaleDate = formatDate(tour.last_sell_at)

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
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                                        <InformationCircleIcon className="h-4 w-4" />
                                    </div>
                                    <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 border border-base-300 w-96">
                                        <div tabIndex={0} className="card-body">
                                            <h2 className="card-title">{tour.organizer.verification}</h2>
                                            <p className="text-sm">{constants.ORGANIZER_LEVEL[tour.organizer.verification as keyof typeof constants.ORGANIZER_LEVEL]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card h-[30rem] overflow-hidden">
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

                        {/* Tour Logs */}

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
                                🧐 Frequently Asked Questions
                            </div>
                            <MarkdownRenderer md_text={tour.faq} />
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="title text-2xl font-semibold flex items-center gap-3">
                                <div className="h-full w-2 card bg-accent" />
                                🔖 Ticket Cancellation
                            </div>
                            <MarkdownRenderer md_text={tour.cancel_ins} />
                        </div>
                    </div>

                </div>
                <div className="col-span-1">
                    <div className="flex flex-col gap-10 sticky top-[5rem]">
                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Summary</Title>
                            </div>
                            <div className="border border-base-300 card grid grid-cols-3 divide-y divide-base-300">
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">📅 Start Date</div><div className="p-2 col-span-2">{startDate.month_name} {startDate.day}, {startDate.year} ({startDate.weekday.slice(0, 3)})</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🌐 End Date</div><div className="p-2 col-span-2">{finishDate.month_name} {finishDate.day}, {finishDate.year} ({finishDate.weekday.slice(0, 3)})</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🎫 Ticket Sale End</div><div className="p-2 col-span-2">{lateSaleDate.month_name} {lateSaleDate.day}, {lateSaleDate.year} {parrseToNDigit(lateSaleDate.hour, 2)}:{parrseToNDigit(lateSaleDate.minute, 2)}</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">👥 Group Size</div><div className="p-2 col-span-2">{tour.group_size}</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🤝 Group Info</div><div className="p-2 col-span-2">{tour.group_info}</div>
                                <div className="p-2 col-span-1 font-semibold border-r border-base-300">🚍 Transport</div><div className="p-2 col-span-2">{tour.transports}</div>
                            </div>
                        </div>
                        <div>
                            <div className="pb-5 mb-5 border-b border-base-300">
                                <Title>Packages</Title>
                            </div>
                            <div>
                                <div>
                                    <TabList tabs={tour.packages.map(e => {
                                        return {
                                            name: e.title,
                                            children: <TourPackage pac={e} />
                                        }
                                    })} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                                    <button className="btn btn-accent w-full mt-2">
                                        Purchase Ticket ({parsePrice(tour.packages[selectedIndex].price)} TK)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-10 mt-10 border-t border-base-300 w-full">
                <div className="grid grid-cols-1 gap-16">
                    <div className="w-full">
                        <div className="mb-10">
                            <Title>Articles from Same Author</Title>
                        </div>
                        <div className="grid grid-cols-3 gap-8">
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mb-10">
                            <Title>Similar Articles</Title>
                        </div>
                        <div className="grid grid-cols-3 gap-8">
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetails
