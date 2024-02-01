import ImageLoader from './ImageLoader'

const TourPlacecard = () => {
    return (
        <button className="card overflow-hidden h-32 w-full relative">
            <ImageLoader src="https://images.unsplash.com/photo-1682695795255-b236b1f1267d" className="h-32 w-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-fill card bg-black bg-opacity-50 flex items-center justify-center p-2">
                <div className="text-xl text-white text-center">Sundarban</div>
            </div>
        </button>
    )
}

export default TourPlacecard