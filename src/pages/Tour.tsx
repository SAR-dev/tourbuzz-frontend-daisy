import { ChevronRightIcon } from "@heroicons/react/24/solid"
import ArticleCard from "@src/components/ArticleCard"
import Carousel from "@src/components/Carousel"
import ImageLoader from "@src/components/ImageLoader"
import MarkdownRenderer from "@src/components/MarkdownRenderer"
import Title from "@src/components/Title"
import TourPlacecard from "@src/components/TourPlacecard"
import NavLayout from "@src/layouts/NavLayout"
import ReactPlayer from "react-player"

const md_article = `
As you embark on the journey to Mystic Falls, you'll find yourself mesmerized by the enchanting beauty that unfolds before your eyes. The falls, cascading gracefully from towering cliffs, create a symphony of soothing sounds that resonate through the air.

![Mystic Falls](https://images.unsplash.com/photo-1542332213-9b5a5a3fad35)

Welcome to Mystic Falls, a breathtaking oasis nestled deep within the heart of lush greenery and serene landscapes. This hidden gem offers a perfect escape from the hustle and bustle of city life, providing visitors with an unforgettable experience surrounded by nature's embrace.

## Discover the Magic of Mystic Falls ✨

As you embark on the journey to Mystic Falls, you'll find yourself mesmerized by the enchanting beauty that unfolds before your eyes. The falls, cascading gracefully from towering cliffs, create a symphony of soothing sounds that resonate through the air.

![Waterfall](https://images.unsplash.com/photo-1557409518-691ebcd96038)

Visitors can take a leisurely stroll along well-maintained trails that wind through the forest, leading to various vantage points where the splendor of Mystic Falls can be admired. The air is filled with the scent of wildflowers, and the vibrant colors of the flora add to the picturesque scenery.

## Activities for Every Adventurer 🚶‍♂️🌳

Mystic Falls caters to all types of travelers, offering a range of activities to suit every adventurer's taste. Whether you prefer a relaxing picnic by the water, an invigorating hike through the surrounding hills, or capturing the perfect photograph of the falls, this destination has it all.

![Hiking Trail](https://images.unsplash.com/photo-1504109586057-7a2ae83d1338)

For those seeking a more daring experience, there are opportunities for rock climbing along the cliffs that frame Mystic Falls. The panoramic views from these elevated positions are nothing short of spectacular.

## How to Reach Mystic Falls 🗺️

Mystic Falls is conveniently located, making it accessible for tourists from various regions. Here are the basic directions:

- **By Car:** Take the scenic route through winding roads, enjoying the beauty of the countryside. GPS coordinates: [Latitude, Longitude].

- **By Public Transport:** 🚌 Regular buses run from the nearby town to Mystic Falls. Check the local schedule for timings.

## Plan Your Visit 📅

Before you embark on your journey, make sure to:

- **Check Weather Conditions:** Mystic Falls is most enchanting during mild weather. Avoid visiting during extreme conditions.

- **Pack Essentials:** Bring water, snacks, and a camera to capture the memories.

![Panoramic View](https://images.unsplash.com/photo-1601823984263-b87b59798b70)

Mystic Falls is a haven for nature lovers and adventure seekers alike. Immerse yourself in the tranquility of this hidden paradise and create memories that will last a lifetime.

**Note:** All images used in this article are for illustrative purposes only and are sourced from [Unsplash](https://unsplash.com).
`;

const md_highlights = `
🌍 Embark on a journey through historic landmarks and cultural wonders, unveiling the city's captivating stories.

🍽️ Indulge your senses in a culinary adventure, tasting the diverse flavors of the region at hidden gems and renowned eateries.

🏞️ Witness breathtaking natural wonders, capturing the beauty and tranquility of picturesque landscapes along the way.

🎨 Engage in interactive experiences, from workshops with local artisans to thrilling outdoor activities, creating lasting memories.

🛌 Relax and unwind in carefully selected accommodations, offering a perfect blend of comfort and charm throughout your unforgettable tour.
`

const Tour = () => {
    return (
        <NavLayout>
            <div className="container mx-auto px-10 pt-5 pb-16">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <Title>
                                    Skyliner Narita Airport Express Ticket
                                </Title>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nisi id neque nobis explicabo.
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
                            <div className="grid grid-cols-5 gap-5">
                                <div className="col-span-5 title text-2xl font-semibold">
                                    🗺️ Tour Destination Checklist
                                </div>
                                <TourPlacecard />
                                <TourPlacecard />
                                <TourPlacecard />
                                <TourPlacecard />
                                <TourPlacecard />
                            </div>
                            <div className="bg-orange-200/20 card p-5">
                                <div className="line-clamp-5 overflow-hidden">
                                    <MarkdownRenderer md_text={md_highlights} />
                                </div>
                                <div className="mt-3">
                                    <button className="btn btn-sm">
                                        See Full Highlights
                                        <ChevronRightIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <div className="col-span-5 title text-2xl font-semibold">
                                    🤔 What to Expect
                                </div>
                                <MarkdownRenderer md_text={md_article} />
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
                                    <div className="p-2 col-span-1 font-semibold border-r border-base-300">📅 Start Date</div><div className="p-2 col-span-2">March 15, 2024</div>
                                    <div className="p-2 col-span-1 font-semibold border-r border-base-300">🎫 Ticket Sale End</div><div className="p-2 col-span-2">March 15, 2024</div>
                                    <div className="p-2 col-span-1 font-semibold border-r border-base-300">🌐 End Date</div><div className="p-2 col-span-2">Max 20 People per group</div>
                                    <div className="p-2 col-span-1 font-semibold border-r border-base-300">👥 Group Size</div><div className="p-2 col-span-2"> March 15, 2024</div>
                                    <div className="p-2 col-span-1 font-semibold border-r border-base-300">🤝 Group Info</div><div className="p-2 col-span-2">Diverse and Welcoming</div>
                                    <div className="p-2 col-span-1 font-semibold border-r border-base-300">🚍 Transport</div><div className="p-2 col-span-2">Modern air-conditioned coaches for a comfortable and scenic journey.</div>
                                </div>
                            </div>
                            <div>
                                <div className="pb-5 mb-5 border-b border-base-300">
                                    <Title>Packages</Title>
                                </div>
                                <div>
                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <button className="btn">Economy</button>
                                        <button className="btn">Economy</button>
                                        <button className="btn">Economy</button>
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
        </NavLayout>
    )
}

export default Tour

// LEFT
// start at, finish_at, last_sell_at
// title
// video and images
// group_size, group_info, transports
// places
// md_desc
// organizer
// accordion -> start_ind, finish_ins, cancel_ins
// tour_logs
// faq

// RIGHT
// highlights
// tour_type
// package and buy

// id
// tour_types_id
// organizers_id
// images_id
// video_link
// title
// slug
// highlights
// md_desc
// cancel_ins
// start_ins
// finish_ins
// faq
// group_size
// group_info
// transports
// image_ids
// start_at
// finish_at
// last_sell_at
// created_at
// updated_at