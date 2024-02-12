import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { TourDataType, getTourBySlug } from "@src/api/tour"
import ArticleCard from "@src/components/ArticleCard"
import Carousel from "@src/components/Carousel"
import ImageLoader from "@src/components/ImageLoader"
import MarkdownRenderer from "@src/components/MarkdownRenderer"
import TabList from "@src/components/TabList"
import Title from "@src/components/Title"
import TourPlacecard from "@src/components/TourPlacecard"
import NavLayout from "@src/layouts/NavLayout"
import { constants } from "@src/stores/constantStore"
import { useQuery } from "@tanstack/react-query"
import classNames from "classnames";
import { useState } from "react"
import ReactPlayer from "react-player"
import { Link, useParams } from "react-router-dom"

const categories = [
    { name: 'Economy' },
    { name: 'Delux' },
    { name: 'Super Delux' },
];

const categoryDesc = () => (
    <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item">
            <input type="radio" checked />
            <div className="collapse-title font-semibold">
                🛎️ Included Services
            </div>
            <div className="collapse-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Harum sed voluptates exercitationem rem unde corrupti,
                in molestias? Enim ab, in, recusandae, animi eligendi
                aperiam neque natus sint eos delectus velit.
            </div>
        </div>
        <div className="collapse collapse-arrow join-item">
            <input type="radio" />
            <div className="collapse-title font-semibold">
                🙅🏻 Excluded Services
            </div>
            <div className="collapse-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Harum sed voluptates exercitationem rem unde corrupti,
                in molestias? Enim ab, in, recusandae, animi eligendi
                aperiam neque natus sint eos delectus velit.
            </div>
        </div>
        <div className="collapse collapse-arrow join-item">
            <input type="radio" />
            <div className="collapse-title font-semibold">
                📑 Conditions
            </div>
            <div className="collapse-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Harum sed voluptates exercitationem rem unde corrupti,
                in molestias? Enim ab, in, recusandae, animi eligendi
                aperiam neque natus sint eos delectus velit.
            </div>
        </div>
    </div>
)

const Tour = () => {
    const { slug = "" } = useParams();
    const tour = useQuery<TourDataType, Error>({
        queryKey: ['tour', slug],
        queryFn: () => getTourBySlug({ slug })
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [showHighlights, setShowHighlights] = useState(false)
    const [showPlaces, setShowPlaces] = useState(false)

    return (
        <NavLayout>
            {tour.data && (
                <div className="container mx-auto px-10 pt-5 pb-16">
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2">
                            <div className="grid grid-cols-1 gap-8">
                                <div>
                                    <Title>
                                        {tour.data.data.title}
                                    </Title>
                                    <div className="flex gap-1 items-center">
                                        This tour is organized by
                                        <Link to={`/organizers/${tour.data.data.organizer.username}`} className="link link-hover">
                                            {tour.data.data.organizer.name}
                                        </Link>.
                                        This organizer is {tour.data.data.organizer.verification} verified.
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                                                <InformationCircleIcon className="h-4 w-4" />
                                            </div>
                                            <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 border border-base-300 w-96">
                                                <div tabIndex={0} className="card-body">
                                                    <h2 className="card-title">{tour.data.data.organizer.verification}</h2>
                                                    <p className="text-sm">{constants.ORGANIZER_LEVEL[tour.data.data.organizer.verification as keyof typeof constants.ORGANIZER_LEVEL]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card overflow-hidden">
                                    <Carousel>
                                        <div className="carousel-item w-full">
                                            <ReactPlayer url="https://www.youtube.com/watch?v=WLIv7HnZ_fE" height="30rem" width="100%" controls />
                                        </div>
                                        <div className="carousel-item w-full">
                                            <ImageLoader src="https://images.unsplash.com/photo-1480796927426-f609979314bd" className="w-full h-[30rem] object-cover" />
                                        </div>
                                        <div className="carousel-item w-full">
                                            <ImageLoader src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5" className="w-full h-[30rem] object-cover" />
                                        </div>
                                        <div className="carousel-item w-full">
                                            <ImageLoader src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" className="w-full h-[30rem] object-cover" />
                                        </div>
                                    </Carousel>
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="title text-2xl font-semibold">
                                        🗺️ Tour Destination Checklist
                                    </div>
                                    <div className={classNames({
                                        "grid grid-cols-5 gap-5": true,
                                        "h-32 overflow-hidden": !showPlaces
                                    })}>
                                        {tour.data.data.places.map((e, i) => (
                                            <TourPlacecard place={e} key={i} />
                                        ))}
                                    </div>
                                    {!showPlaces && tour.data.data.places.length > 5 && (
                                        <div>
                                            <button className="btn btn-sm" onClick={() => setShowPlaces(true)}>
                                                See {tour.data.data.places.length - 5} more places
                                                <ChevronRightIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-orange-200/20 card p-5">
                                    <div className={classNames({
                                        "line-clamp-5 overflow-hidden": !showHighlights
                                    })}>
                                        <MarkdownRenderer md_text={tour.data.data.highlights} />
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
                                    <div className="col-span-5 title text-2xl font-semibold">
                                        🤔 What to Expect
                                    </div>
                                    <MarkdownRenderer md_text={tour.data.data.md_desc} />
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
                                        <div className="p-2 col-span-1 font-semibold border-r border-base-300">📅 Start Date</div><div className="p-2 col-span-2">March 15, 2024 (Sat)</div>
                                        <div className="p-2 col-span-1 font-semibold border-r border-base-300">🌐 End Date</div><div className="p-2 col-span-2">March 15, 2024 (Sat)</div>
                                        <div className="p-2 col-span-1 font-semibold border-r border-base-300">🎫 Ticket Sale End</div><div className="p-2 col-span-2">March 15, 2024 (Sat)</div>
                                        <div className="p-2 col-span-1 font-semibold border-r border-base-300">👥 Group Size</div><div className="p-2 col-span-2">Max 20 People per group</div>
                                        <div className="p-2 col-span-1 font-semibold border-r border-base-300">🤝 Group Info</div><div className="p-2 col-span-2">Diverse and Welcoming</div>
                                        <div className="p-2 col-span-1 font-semibold border-r border-base-300">🚍 Transport</div><div className="p-2 col-span-2">Modern air-conditioned coaches for a comfortable and scenic journey.</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="pb-5 mb-5 border-b border-base-300">
                                        <Title>Packages</Title>
                                    </div>
                                    <div>
                                        <div>
                                            <TabList tabs={categories.map(e => {
                                                return {
                                                    name: e.name,
                                                    children: categoryDesc()
                                                }
                                            })} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                                            <button className="btn btn-accent w-full mt-2">
                                                Purchase Ticket
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
            )}
        </NavLayout>
    )
}

export default Tour
