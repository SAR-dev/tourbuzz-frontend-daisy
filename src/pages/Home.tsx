import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import ArticleCard from "@src/components/ArticleCard"
import HotelCard from "@src/components/HotelCard"
import OrganizerCard from "@src/components/OrganizerCard"
import PlaceCard from "@src/components/PlaceCard"
import Title from "@src/components/Title"
import TourCard from "@src/components/TourCard"
import NavLayout from "@src/layouts/NavLayout"

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
                <input type="text" placeholder="Email" className="input input-bordered w-full border-2 placeholder:opacity-50 w-72" />
                <button className="btn">Get Invitation Link</button>
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

          <section>
            <div className="mb-10">
              <Title to="/tours">Upcoming Tours ✈️</Title>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <TourCard />
              <TourCard />
            </div>
          </section>

          <section>
            <div className="mb-10">
              <Title to="/hotels">Relaxation and Dining Destinations 🛏️</Title>
            </div>
            <div className="grid grid-cols-4 gap-8">
              <HotelCard />
              <HotelCard />
              <HotelCard />
              <HotelCard />
            </div>
          </section>

          <section>
            <div className="mb-10">
              <Title to="/places">Where to next 🥳 ?</Title>
            </div>
            <div className="grid grid-cols-6 gap-8">
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
            </div>
          </section>

          <section>
            <div className="mb-10">
              <Title to="/articles">Fresh ideas for fun 🤯</Title>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </section>

          <section>
            <div className="mb-10">
              <Title to="/organizers">Tour Organizers 👨‍🚀</Title>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <OrganizerCard />
              <OrganizerCard />
              <OrganizerCard />
              <OrganizerCard />
              <OrganizerCard />
              <OrganizerCard />
            </div>
          </section>

          <section>
            <div className="mb-10">
              <Title to="/tours">Recently Completed Tours 🎫</Title>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <TourCard />
              <TourCard />
            </div>
          </section>

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
                <button className="btn">
                  Chat with Us
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                </button>
                <button className="btn">
                  Send Email
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </NavLayout>
  )
}

export default Home