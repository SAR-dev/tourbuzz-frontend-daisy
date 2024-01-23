import { BookmarkIcon } from "@heroicons/react/24/outline"
import NavBar from "@src/components/NavBar"

const Home = () => {
  return (
    <section>
      <NavBar />
      <div className="grid grid-cols-1">
        <div className="p-5 text-center bg-orange-100 text-black">
          TourBuzz : Your Gateway to Unforgettable Journeys 😎
        </div>
        <div className="bg-blue-100 p-5">
          <div className="mx-auto flex flex-col gap-5">
            <div className="flex w-full justify-between">
              <div className="flex gap-3 font-semibold">
                <div>🌋</div>
                <div>Upcoming Tour</div>
              </div>

              <div className="flex items-center gap-3 font-semibold">
                <div>
                  <BookmarkIcon className="h-5 w-5" />
                </div>
                <div>Save</div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <img 
                src="https://media.istockphoto.com/id/546763388/photo/the-perfect-vantage-point.jpg?s=170667a&w=0&k=20&c=KcEe8bcUUAheYpdzIJ52Tk2N4ZY3OAtFRBjFCqI7Aq8=" 
                className="h-96 w-full object-cover card"
                alt="" 
              />
              <div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home