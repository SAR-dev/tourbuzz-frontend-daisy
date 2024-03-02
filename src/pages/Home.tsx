import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { ArticleListDataType, getLatestArticles } from "@src/api/article"
import { HotelListDataType, getRandomHotels } from "@src/api/hotel"
import { OrganizerListDataType, getRandomOrganizers } from "@src/api/organizer"
import { PlaceListDataType, getPopularPlaces } from "@src/api/place"
import { TourListDataType, getUpcomingTours } from "@src/api/tour"
import ArticleCard from "@src/components/ArticleCard"
import HotelCard from "@src/components/HotelCard"
import NoResultFound from "@src/components/NoResultFound"
import OrganizerCard from "@src/components/OrganizerCard"
import PlaceCard from "@src/components/PlaceCard"
import Title from "@src/components/Title"
import TourCard from "@src/components/TourCard"
import NavLayout from "@src/layouts/NavLayout"
import { constants } from "@src/stores/constantStore"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const PromotionPoint = ({
  icon,
  title,
  subtitle
}: {
  icon: string
  title: string
  subtitle: string
}) => (
  <div className="flex-col">
    <div className="text-6xl mb-3">{icon}</div>
    <div className="text-xl font-semibold title">{title}</div>
    <div>
      {subtitle}
    </div>
  </div>
)

const Home = () => {
  const upcomingTours = useQuery<TourListDataType, Error>({
    queryKey: ['upcoming-tours'],
    queryFn: () => getUpcomingTours()
  })

  const latestArticles = useQuery<ArticleListDataType, Error>({
    queryKey: ['latest-articles'],
    queryFn: () => getLatestArticles({ count: 6 })
  })

  const randomHotels = useQuery<HotelListDataType, Error>({
    queryKey: ['random-hotels'],
    queryFn: () => getRandomHotels({ count: 8 }),
    refetchOnWindowFocus: false
  })

  const popularPlaces = useQuery<PlaceListDataType, Error>({
    queryKey: ['popular-places'],
    queryFn: () => getPopularPlaces({ count: 12 }),
  })

  const randomOrganizers = useQuery<OrganizerListDataType, Error>({
    queryKey: ['random-organizers'],
    queryFn: () => getRandomOrganizers({ count: 6 }),
    refetchOnWindowFocus: false
  })

  const getSliceSize = ({ size, multiple }: { size: number, multiple: number }) => {
    return Math.floor(size / multiple) * multiple
  }

  return (
    <NavLayout>
      <div className="h-[30rem] relative">
        <img
          src="https://www.japan-guide.com/g17/home_1712_fujisan.jpg"
          alt=""
          className="h-[30rem] w-full object-cover object-center"
        />
        <div className="absolute top-0 left-0 h-fill w-full">
          <div className="container mx-auto px-10 flex flex-col w-full h-fill justify-center">
            <div className="text-white text-5xl title font-semibold">Welcome To Japan</div>
            <div className="text-2xl text-white mt-3">
              The city is most famous for its port, which has been relevant both domestic
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 container w-full mx-auto px-10 py-5">
          <div className="text-white text-right">
            Mount Fuji
          </div>
        </div>
      </div>
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 py-16 gap-16">
          <section>
            <div className="flex w-full justify-between mb-10">
              <Title>Why choose Us 🤔 ?</Title>
              <div className="flex gap-5">
                <input type="text" placeholder="Email" className="input input-bordered border-2 placeholder:opacity-50 w-72" />
                <button className="btn">Send Invitation Link</button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-8">
              <PromotionPoint
                icon="💰"
                title="Secure Transaction"
                subtitle="With nearly half a million attractions, hotels & more, you're sure to find joy."
              />
              <PromotionPoint
                icon="🤗"
                title="Secure Transaction"
                subtitle="With nearly half a million attractions, hotels & more, you're sure to find joy."
              />
              <PromotionPoint
                icon="💪"
                title="Secure Transaction"
                subtitle="With nearly half a million attractions, hotels & more, you're sure to find joy."
              />
              <PromotionPoint
                icon="🚀"
                title="Secure Transaction"
                subtitle="With nearly half a million attractions, hotels & more, you're sure to find joy."
              />
            </div>
          </section>

          {upcomingTours.data && (
            <section>
              <div className="mb-10">
                <Title to="/tours">Upcoming Tours ✈️</Title>
              </div>
              {upcomingTours.data.data.length === 0 && (
                <NoResultFound subtitle="Currently there are no upcoming tours. Please come back later." />
              )}
              <div className="grid grid-cols-1 gap-8">
                {upcomingTours.data.data.map((tour, i) => (
                  <TourCard tour={tour} key={i} />
                ))}
              </div>
            </section>
          )}

          {randomHotels.data && (
            <section>
              <div className="mb-10">
                <Title to="/hotels">Relaxation and Dining Destinations 🛏️</Title>
              </div>
              {randomHotels.data.data.length === 0 && (
                <NoResultFound />
              )}
              <div className="grid grid-cols-4 gap-8">
                {randomHotels.data.data.slice(0, getSliceSize({ size: randomHotels.data.data.length, multiple: 4 })).map((hotel, i) => (
                  <HotelCard hotel={hotel} key={i} />
                ))}
              </div>
            </section>
          )}

          {popularPlaces.data && (
            <section>
              <div className="mb-10">
                <Title to="/places">Where to next 🥳 ?</Title>
              </div>
              {popularPlaces.data.data.length === 0 && (
                <NoResultFound />
              )}
              <div className="grid grid-cols-6 gap-8">
                {popularPlaces.data.data.slice(0, getSliceSize({ size: popularPlaces.data.data.length, multiple: 6 })).map((place, i) => (
                  <PlaceCard place={place} key={i} />
                ))}
              </div>
            </section>
          )}

          {latestArticles.data && (
            <section>
              <div className="mb-10">
                <Title to="/articles">Fresh ideas for fun 🤯</Title>
              </div>
              {latestArticles.data.data.length === 0 && (
                <NoResultFound />
              )}
              <div className="grid grid-cols-3 gap-8">
                {latestArticles.data.data.slice(0, getSliceSize({ size: latestArticles.data.data.length, multiple: 3 })).map((article, i) => (
                  <ArticleCard article={article} key={i} />
                ))}
              </div>
            </section>
          )}

          {randomOrganizers.data && (
            <section>
              <div className="mb-10">
                <Title to="/organizers">Tour Organizers 👨‍🚀</Title>
              </div>
              {randomOrganizers.data.data.length === 0 && (
                <NoResultFound />
              )}
              <div className="grid grid-cols-3 gap-8">
                {randomOrganizers.data.data.slice(0, getSliceSize({ size: randomOrganizers.data.data.length, multiple: 3 })).map((organizer, i) => (
                  <OrganizerCard organizer={organizer} key={i} />
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="bg-info text-info-content p-10 card flex flex-row items-center gap-5">
              <div className="text-8xl">🤗</div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="title text-4xl font-semibold">Get In Touch with Us </div>
                <div className="title text-xl">
                  Feel free to ask questions, report issues or provide suggestions
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/chat/enquiry" className="btn">
                  Chat with Us
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                </Link>
                <a href={constants.ADMIN_HELP_MAIL_MAILTO_LINK} className="btn">
                  Send Email
                  <PaperAirplaneIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </NavLayout>
  )
}

export default Home