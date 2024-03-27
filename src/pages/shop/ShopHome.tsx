import { ArrowRightIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import ImageLoader from '@src/components/ImageLoader';
import ProductCardMax from '@src/components/ProductCardMax';
import ProductCardMin from '@src/components/ProductCardMin'
import { NavbarType } from '@src/enums/NavbarType'
import NavLayout from '@src/layouts/NavLayout'

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
            <div className="container mx-auto pt-5 pb-16">
                <div className="grid grid-cols-1 gap-12">
                    <div className='card border border-base-300 p-3 flex gap-3 flex-col gap-3'>
                        <button className="btn btn-ghost no-animation bg-accent/20 justify-start">
                            <ArrowTrendingUpIcon className='h-5 w-5' />
                            Trending This Month
                        </button>
                        <div className="grid grid-cols-3 gap-5">
                            {[...Array(6)].map((_, i) => (
                                <ProductCardMax key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='flex gap-3 flex-col'>
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
                    <div className='card border border-base-300 p-3 flex gap-3 flex-col gap-3'>
                        <button className="btn btn-ghost no-animation bg-info/20 justify-start">
                            <ArrowTrendingUpIcon className='h-5 w-5' />
                            Trending This Month
                        </button>
                        <div className="grid grid-cols-3 gap-5">
                            {[...Array(6)].map((_, i) => (
                                <ProductCardMax key={i} />
                            ))}
                        </div>
                    </div>
                    <div className='card border border-base-300 p-3 flex gap-3 flex-col gap-3'>
                        <button className="btn btn-ghost no-animation bg-primary/20 justify-start">
                            <ArrowTrendingUpIcon className='h-5 w-5' />
                            Trending This Month
                        </button>
                        <div className="grid grid-cols-3 gap-5">
                            {[...Array(6)].map((_, i) => (
                                <ProductCardMax key={i} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </NavLayout>
    )
}

export default ShopHome
