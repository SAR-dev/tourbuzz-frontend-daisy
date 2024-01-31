import ImageLoader from "./ImageLoader";

const HotelCard = () => {
    return (
        <div className="card border border-base-300 relative">
            <ImageLoader
                src="https://morrisonhotelgallery.com/cdn/shop/products/diltz_Doors_MorrisonHotel.jpg?v=1629240651"
                className="h-48 w-full object-cover card rounded-b-none"
            />
            <div className="flex flex-col gap-1 p-3">
                <div className="title text-xl font-semibold">Hotel Transylvania</div>
                <div>🚩 Moulovibazar, Sylhet</div>
                <div className="grid grid-cols-2">
                <div>🚀 <span className="link link-hover">Google Map</span></div>
                <div>🔗 <span className="link link-hover">Website</span></div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard;