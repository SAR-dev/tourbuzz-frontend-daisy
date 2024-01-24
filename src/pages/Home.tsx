import NavBar from "@src/components/NavBar"
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
      <div className="font-semibold p-5 text-center bg-primary/10">
        TourBuzz : Your Gateway to Unforgettable Journeys 😎
      </div>
      <NavBar />
      <div className="grid grid-cols-1">
        <div className="container mx-auto px-5 py-10">
          <div className="text-3xl font-semibold title mb-10">Why choose Us 🤔 ?</div>
          <div className="grid grid-cols-4 gap-5">
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
        </div>
      </div>
      <div className="grid grid-cols-1">
        <TourCard type={TourCardType.PRIMARY} />
        <TourCard type={TourCardType.SECONDARY} reversed />
      </div>
      <div className="container mx-auto px-5 py-10">
        <div className="text-3xl font-semibold title mb-10">Where to next 🥳 ?</div>
        <div className="grid grid-cols-5 gap-5">
          <div className="card h-96 w-full bg-center bg-cover group" style={{ backgroundImage: "url(https://theportablewife.com/wp-content/uploads/osaka-kyoto-nara-itinerary-ninenzaka.jpg)" }}>
            <div className="card bg-black bg-opacity-20 h-96 px-10 flex flex-wrap flex-col pt-32 hover:bg-opacity-75 transform duration-300">
              <h1 className="text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300">
                Sundarban
              </h1>
              <div className="w-16 h-2 bg-yellow-500 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300"></div>
              <p className="opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500">
                Serenity in the Sunderbans: Exploring Bangladesh's Enchanting Mangrove Paradise
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Home