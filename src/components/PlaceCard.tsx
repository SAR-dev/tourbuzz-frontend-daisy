const PlaceCard = () => {
    return (
        <div className="card h-96 w-full bg-center bg-cover group" style={{ backgroundImage: "url(https://theportablewife.com/wp-content/uploads/osaka-kyoto-nara-itinerary-ninenzaka.jpg)" }}>
            <div className="card bg-black bg-opacity-20 h-96 px-10 flex flex-wrap flex-col pt-32 hover:bg-opacity-75 transform duration-300">
                <h1 className="text-white text-3xl mb-5 transform translate-y-40 group-hover:translate-y-0 duration-300">
                    Sundarban
                </h1>
                <div className="opacity-0 group-hover:opacity-100 w-16 h-2 bg-yellow-500 rounded-full mb-5 transform translate-y-40 group-hover:translate-y-0 duration-300"></div>
                <p className="opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500">
                    Serenity in the Sunderbans: Exploring Bangladesh's Enchanting Mangrove Paradise
                </p>
            </div>
        </div>
    )
}

export default PlaceCard;