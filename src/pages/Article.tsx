import ImageLoader from "@src/components/ImageLoader";
import NavBar from "@src/components/NavBar"
import Title from "@src/components/Title";

const Article = () => {
    return (
        <section>
            <NavBar />
            <div className="container mx-auto px-10 py-5">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <div className="bg-base-300 font-medium px-2.5 py-0.5 card inline-flex">
                                    Recommendation
                                </div>
                            </div>
                            <div>
                                <Title>
                                    Skyliner Narita Airport Express Ticket
                                </Title>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nisi id neque nobis explicabo.
                                </div>
                            </div>
                            <div className="card overflow-hidden">
                                <div className="carousel w-full">
                                    <div className="carousel-item w-full">
                                        <ImageLoader src="https://images.unsplash.com/photo-1528360983277-13d401cdc186" className="w-full h-[30rem] object-cover" />
                                    </div>
                                    <div className="carousel-item w-full">
                                        <ImageLoader src="https://images.unsplash.com/photo-1480796927426-f609979314bd" className="w-full h-[30rem] object-cover" />
                                    </div>
                                    <div className="carousel-item w-full">
                                        <ImageLoader src="https://images.unsplash.com/photo-1522623349500-de37a56ea2a5" className="w-full h-[30rem] object-cover" />
                                    </div>
                                    <div className="carousel-item w-full">
                                        <ImageLoader src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" className="w-full h-[30rem] object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-col gap-10">
                            <div>
                                <div className="pb-5 mb-5 border-b border-base-300/50">
                                    <Title>Summary</Title>
                                </div>
                                <div>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nisi id neque nobis
                                    explicabo quod cupiditate adipisci necessitatibus voluptate, mollitia reprehenderit
                                    fugit, labore laudantium totam provident quidem illo molestias esse?
                                </div>
                            </div>

                            <div>
                                <div className="pb-5 mb-5 border-b border-base-300/50">
                                    <Title>Author Info</Title>
                                </div>
                                <div>
                                    <ImageLoader
                                        src="https://cloudfront-eu-central-1.images.arcpublishing.com/diarioas/QM524YI6CJGENC25TBO6BP5YOI.jpg"
                                        className="h-32 card"
                                    />
                                    <div className="font-semibold text-xl my-2">Sayed Rafi</div>
                                    <div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nisi id neque nobis
                                        explicabo quod cupiditate adipisci necessitatibus voluptate, mollitia reprehenderit
                                        fugit, labore laudantium totam provident quidem illo molestias esse?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Article;