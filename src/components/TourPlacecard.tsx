import { PlaceType } from '@src/types/base'
import ImageLoader from './ImageLoader'

const TourPlacecard = ({place}:{place: PlaceType}) => {
    return (
        <button className="card overflow-hidden h-32 w-full relative">
            <ImageLoader src={place.avatar?.optimized_url} className="h-32 w-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-fill card bg-black bg-opacity-50 flex items-center justify-center p-2">
                <div className="text-xl text-white text-center">{place.name}</div>
            </div>
        </button>
    )
}

export default TourPlacecard