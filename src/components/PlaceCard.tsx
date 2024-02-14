import { PlaceType } from "@src/types/base";
import { Link } from "react-router-dom";

const PlaceCard = ({place}:{place: PlaceType}) => {
    return (
        <Link to={`/places/${place.id}`} className="card h-80 w-full bg-center bg-cover group" style={{ backgroundImage: `url(${place.avatar?.optimized_url})` }}>
            <div className="card bg-black bg-opacity-20 h-80 px-5 flex flex-wrap flex-col pt-40 hover:bg-opacity-75 transform duration-300">
                <h1 className="text-white text-xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300">
                    {place.name}
                </h1>
                <p className="opacity-0 text-white text-sm group-hover:opacity-80 transform duration-500">
                    {place.description}
                </p>
            </div>
        </Link>
    )
}

export default PlaceCard;