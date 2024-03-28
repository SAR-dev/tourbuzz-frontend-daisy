import { ArrowRightIcon, ArrowTrendingUpIcon, ChatBubbleLeftRightIcon, FireIcon, MegaphoneIcon, PaperAirplaneIcon, RssIcon, TagIcon } from '@heroicons/react/24/outline';
import ImageLoader from '@src/components/ImageLoader';
import ProductCardMax from '@src/components/ProductCardMax';
import ProductCardMin from '@src/components/ProductCardMin'
import SeriesCard from '@src/components/SeriesCard';
import Title from '@src/components/Title';
import { NavbarType } from '@src/enums/NavbarType'
import NavLayout from '@src/layouts/NavLayout'
import { constants } from '@src/stores/constantStore';
import { Link } from 'react-router-dom';

function ShopHome() {
    return (
        <NavLayout type={NavbarType.SHOP}>
            <div className="h-[30rem] relative mt-5">
                <div className="card group overflow-hidden flex flex-row container mx-auto px-10 flex justify-between bg-gradient-to-r from-teal-700 to-yellow-200">
                    <div className="h-auto flex items-center max-w-[40rem]">
                        <div className='text-white group-hover:scale-110 origin-top-left duration-300'>
                            <div className="py-1 px-3 card bg-teal-200/50 shadow text-black w-fit mb-3">🤗 20% off on all Products</div>
                            <div className="text-4xl title font-semibold">Welcome To TourBuzz</div>
                            <div className="text-xl mt-3 font-normal">
                                Aoi Sakura Mart is the most pocket friendly Online Shop.
                                We are the first Online Anime Merchandise Shop in Bangladesh, have been operating since 2011.
                            </div>
                        </div>
                    </div>
                    <div className="h-[30rem]">
                        <ImageLoader src="https://i.postimg.cc/vTKnJ7Zz/key3-1.webp" className='h-[30rem] group-hover:scale-110 group-hover:rotate-6 duration-300' />
                    </div>
                </div>
            </div>
            <div className="container mx-auto pt-8 pb-16">
                <div className="grid grid-cols-1 gap-12">
                    <div className='card flex flex-col gap-5'>
                        <Title>
                            <ArrowTrendingUpIcon className='h-8 w-8 mr-2' />
                            Trending This Month
                        </Title>
                        <div className="grid grid-cols-3 gap-5">
                            {[...Array(6)].map((_, i) => (
                                <ProductCardMax key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='card flex flex-col gap-5'>
                        <Title>
                            <TagIcon className='h-8 w-8 mr-2' />
                            Categories
                        </Title>
                        <div className="flex join">
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item relative overflow-hidden">
                                <div className="h-4 w-4 rounded-full bg-info" />
                                Dress
                                <div className="absolute bottom-0 h-1 w-full bg-accent" />
                            </button>
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item">Books</button>
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item">Arts</button>
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item">Articles</button>
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item">Magazine</button>
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item">Cultural</button>
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item">Arts</button>
                            <button className="btn btn-ghost no-animation border-base-300 flex-1 join-item">Articles</button>
                            <button className="btn btn-ghost no-animation border-base-300 join-item btn-square">
                                <ArrowRightIcon className='h-5 w-5' />
                            </button>
                        </div>
                        <div className="grid grid-cols-6 gap-5">
                            {[...Array(12)].map((_, i) => (
                                <ProductCardMin key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='card flex flex-col gap-5'>
                        <Title>
                            <MegaphoneIcon className='h-8 w-8 mr-2' />
                            Recommended For You
                        </Title>
                        <div className="grid grid-cols-3 gap-5">
                            {[...Array(6)].map((_, i) => (
                                <ProductCardMax key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='card flex flex-col gap-5'>
                        <Title>
                            <FireIcon className='h-8 w-8 mr-2' />
                            Hot Offers
                        </Title>
                        <div className="grid grid-cols-6 gap-5">
                            {[...Array(12)].map((_, i) => (
                                <ProductCardMin key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='card flex flex-col gap-5'>
                        <Title>
                            <RssIcon className='h-8 w-8 mr-2' />
                            Newly Arrived
                        </Title>
                        <div className="grid grid-cols-6 gap-5">
                            {[...Array(12)].map((_, i) => (
                                <ProductCardMin key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='card flex flex-col border border-base-300'>
                        <div className="flex gap-3 p-3 border-b border-base-300">
                            <button className="btn btn-accent no-animation border-base-300">Popular Series</button>
                            <button className="btn btn-ghost no-animation border-base-300">Trending Series</button>
                            <button className="btn btn-ghost no-animation border-base-300">Recommended Series</button>
                            <button className="btn btn-ghost no-animation border-base-300 btn-square">
                                <ArrowRightIcon className='h-5 w-5' />
                            </button>
                        </div>
                        <div className="grid grid-cols-6 gap-5 p-3">
                            {[...Array(12)].map((_, i) => (
                                <SeriesCard key={i} />
                            ))}
                        </div>
                    </div>
                    <section>
                        <div className="border border-base-300 bg-info/20 p-10 card flex flex-row items-center gap-5">
                            <div className="text-8xl">🤗</div>
                            <div className="flex flex-col gap-1 flex-1">
                                <div className="title text-4xl font-semibold">Get In Touch with Us </div>
                                <div className="title text-xl">
                                    Feel free to ask questions, report issues or provide suggestions
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link to="/chat/enquiry" className="btn">
                                    Chat with Us
                                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                                </Link>
                                <a href={constants.ADMIN_HELP_MAIL_MAILTO_LINK} className="btn">
                                    Send Email
                                    <PaperAirplaneIcon className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </section>
                    {/* popular brands */}
                </div>
            </div>
        </NavLayout>
    )
}

export default ShopHome
