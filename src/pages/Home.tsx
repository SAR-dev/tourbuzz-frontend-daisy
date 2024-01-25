import ArticleCard from "@src/components/ArticleCard"
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
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 pt-5 pb-16 gap-16">

          <section>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1599173704879-2e407aa34cde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amFwYW4lMjB0cmFpbnxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                  className="h-[35rem] w-full object-cover"
                />
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <img
                      src="https://png.pngtree.com/background/20230519/original/pngtree-japanese-train-on-the-tracks-in-autumn-picture-image_2658809.jpg"
                      alt=""
                      className="h-[17rem] w-full object-cover"
                    />
                  </div>
                  <div>
                    <img
                      src="https://wallpapercave.com/wp/wp8368404.jpg"
                      alt=""
                      className="h-[17rem] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
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
            <div className="mt-5 grid grid-cols-4 gap-5">
              <input type="text" placeholder="Email" className="input input-bordered w-full border-2 placeholder:opacity-50" />
              <button className="btn">Get Invitation Link</button>
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

    </section>
  )
}

export default Home