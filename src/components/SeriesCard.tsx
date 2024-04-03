import ImageLoader from './ImageLoader'

const SeriesCard = () => {
    return (
        <div className="relative h-72 group card overflow-hidden">
            <ImageLoader
                src='https://i.ibb.co/4FMrPw8/image.png'
                className='h-72 w-full object-cover'
            />
            <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black via-black/80 to-black/20 h-16 group-hover:h-72 opacity-0 group-hover:opacity-100 duration-200 flex justify-center items-center">
                <div className="text-white text-center line-clamp-2 group-hover:line-clamp-none">
                    KONOSUBA -God's blessing on this wonderful world! <br /><br />
                    (30 products)
                </div>
            </div>
        </div>
    )
}

export default SeriesCard