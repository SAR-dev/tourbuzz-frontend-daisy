const HotelCard = () => {
    return (
        <div className="card bg-primary/10 p-3 relative">
            <img
                src="https://morrisonhotelgallery.com/cdn/shop/products/diltz_Doors_MorrisonHotel.jpg?v=1629240651"
                alt=""
                className="h-48 w-full object-cover card"
            />
            <div className="flex flex-col gap-1 mt-3">
                <div className="title text-xl font-semibold">Hotel Transylvania</div>
                <div>🚩 Moulovibazar, Sylhet</div>
                <div className="link link-hover">🚀 Google Map</div>
                <div className="link link-hover">🔗 Website</div>
            </div>
        </div>
    )
}

export default HotelCard;