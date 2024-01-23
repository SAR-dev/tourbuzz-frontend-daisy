import { BookmarkIcon, QuestionMarkCircleIcon, StarIcon } from "@heroicons/react/24/outline"
import NavBar from "@src/components/NavBar"

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
      <div className="grid grid-cols-1">
        <div className="p-5 text-center bg-orange-100 text-black">
          TourBuzz : Your Gateway to Unforgettable Journeys 😎
        </div>
        <div className="w-full">
          <div className="container mx-auto px-5 py-10">
            <div className="text-2xl font-semibold title mb-5">Why choose Us ?</div>
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
        <div className="bg-blue-100">
          <div className="container mx-auto p-5 flex flex-col gap-5">
            <div className="grid grid-cols-2">
              <img
                src="https://media.istockphoto.com/id/546763388/photo/the-perfect-vantage-point.jpg?s=170667a&w=0&k=20&c=KcEe8bcUUAheYpdzIJ52Tk2N4ZY3OAtFRBjFCqI7Aq8="
                className="h-96 w-full object-cover"
                alt=""
              />
              <div className="flex flex-col justify-between">
                <div className="pl-10 flex gap-5 items-start justify-between">
                  <div>
                    <div className="title text-2xl font-semibold">Hong Kong Disneyland Park Tickets</div>
                    <div className="my-2">😎 Organized By: Qrio</div>
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
                <div className="bg-orange-200 p-10">
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
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home