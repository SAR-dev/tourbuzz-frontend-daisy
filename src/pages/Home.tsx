import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import ArticleCard from "@src/components/ArticleCard"
import Footer from "@src/components/Footer"
import HotelCard from "@src/components/HotelCard"
import NavBar from "@src/components/NavBar"
import OrganizerCard from "@src/components/OrganizerCard"
import PlaceCard from "@src/components/PlaceCard"
import TourCard, { TourCardType } from "@src/components/TourCard"

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
    <section>
      <NavBar />
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
              <div className="text-3xl font-semibold title">Why choose Us 🤔 ?</div>
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
            <div className="text-3xl font-semibold title mb-10">Upcoming Tours ✈️</div>
            <div className="grid grid-cols-1 gap-8">
              <TourCard type={TourCardType.PRIMARY} />
              <TourCard type={TourCardType.SECONDARY} reversed />
            </div>
          </section>

          <section>
            <div className="text-3xl font-semibold title mb-10">Relaxation and Dining Destinations 🛏️</div>
            <div className="grid grid-cols-4 gap-8">
              <HotelCard />
              <HotelCard />
              <HotelCard />
              <HotelCard />
            </div>
          </section>

          <section>
            <div className="text-3xl font-semibold title mb-10">Where to next 🥳 ?</div>
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
            <div className="text-3xl font-semibold title mb-10">Fresh ideas for fun 🤯</div>
            <div className="grid grid-cols-3 gap-8">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </section>

          <section>
            <div className="text-3xl font-semibold title mb-10">Tour Organizers 👨‍🚀</div>
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
            <div className="text-3xl font-semibold title mb-10">Recently Completed Tours 🎫</div>
            <div className="grid grid-cols-1 gap-8">
              <TourCard type={TourCardType.PRIMARY} />
              <TourCard type={TourCardType.SECONDARY} reversed />
            </div>
          </section>

          <section>
            <div className="text-3xl font-semibold title mb-10">Get In Touch with Us 😃</div>
            <div className="mockup-window border bg-orange-200 text-black">
              <div className="flex justify-between items-center px-5 pb-5 relative">
                <div className="text-lg code-text">
                  Have a question ❓, suggestion 💡, or just want to chat 🗯️?
                  <br />
                  We're all ears 😎!
                  <br />
                  Drop us a message 👇 or reach out through our contact details.
                  <br />
                  We can't wait to hear from you! 📬👋😉
                </div>

                <div className="flex gap-3">
                  <button className="btn code-text">
                    Chat with Us
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  </button>
                  <button className="btn code-text">
                    Send Email
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="absolute bottom-0 right-0 text-6xl">
                🤗
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </section>
  )
}

export default Home