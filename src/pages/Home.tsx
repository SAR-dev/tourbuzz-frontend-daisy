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
      <NavBar />
      <div className="grid grid-cols-1">
        <div className="p-5 text-center bg-primary/10">
          TourBuzz : Your Gateway to Unforgettable Journeys 😎
        </div>
        <div className="container mx-auto px-5 py-10">
          <div className="text-2xl font-semibold title mb-5">🤔 Why choose Us ?</div>
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
        <div className="text-2xl font-semibold title mb-5">🤔 Why choose Us ?</div>
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
    </section>
  )
}

export default Home