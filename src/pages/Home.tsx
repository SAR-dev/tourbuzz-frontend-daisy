import ArticleCard from "@src/components/ArticleCard"
import Footer from "@src/components/Footer"
import NavBar from "@src/components/NavBar"
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
        <div className="absolute top-0 left-0 h-fill container mx-auto px-10">
          <div className="flex flex-col w-full h-fill justify-center">
            <div className="text-white text-5xl title font-semibold">Welcome To Japan</div>
            <div className="text-2xl text-white mt-3">
              The city is most famous for its port, which has been relevant both domestic
            </div>
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
          </section>

          <section>
            <div className="text-3xl font-semibold title mb-10">Upcoming Tours ✈️</div>
            <div className="grid grid-cols-1 gap-5">
              <TourCard type={TourCardType.PRIMARY} />
              <TourCard type={TourCardType.SECONDARY} reversed />
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

        </div>
      </div>

      <Footer />
    </section>
  )
}

export default Home