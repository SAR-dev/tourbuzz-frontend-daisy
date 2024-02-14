import { HotelType } from "@src/types/base";
import ImageLoader from "./ImageLoader";

const HotelCard = ({ hotel }: { hotel: HotelType }) => {
    return (
        <div className="card border border-base-300 relative">
            <ImageLoader
                src={hotel.avatar.optimized_url}
                modalSrc={hotel.avatar.source_url}
                className="h-48 w-full object-cover card rounded-b-none"
            />
            <div className="flex flex-col gap-1 p-3">
                <div className="title text-xl font-semibold">{hotel.name}</div>
                <div>🚩 {hotel.district.name}, {hotel.district.division.name}</div>
                <div className="grid grid-cols-2">
                    <div>🚀 <a href={hotel.map_link} target="_blank" className="link link-hover">Google Map</a></div>
                    <div>🔗 <a href={hotel.website} target="_blank" className="link link-hover">Website</a></div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard;