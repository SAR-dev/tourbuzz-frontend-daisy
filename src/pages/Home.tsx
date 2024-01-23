import happyImage from "@src/assets/happy.png";

const Home = () => {
  return (
    <section>
      <div className="p-5 text-center text-lg bg-orange-100 text-black">
        TourBuzz : Your Gateway to Unforgettable Journeys 😎
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3 bg-gray-200">
          <div className="flex items-center p-5 h-[40rem]">
            <div className="grid grid-cols-2 w-full">
              <div className="flex h-full items-center">
                <div className="text-4xl text-center">
                  Welcome to <br /> ExploreBeyond!
                </div>
              </div>
              <div>
                <img src={happyImage} className="w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">

        </div>
      </div>
    </section>
  )
}

export default Home