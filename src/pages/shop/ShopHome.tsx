import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import ProductCard from '@src/components/ProductCard'
import { NavbarType } from '@src/enums/NavbarType'
import NavLayout from '@src/layouts/NavLayout'

function ShopHome() {
    return (
        <NavLayout type={NavbarType.SHOP}>
            <div className="h-[30rem] relative">
                <div className="container mx-auto px-10 flex justify-between bg-gradient-to-r from-teal-700 to-yellow-200">
                    <div className="h-auto flex items-center max-w-[40rem]">
                        <div className='text-white'>
                            <div className="py-1 px-3 card bg-teal-200/50 shadow text-black w-fit mb-3">🤗 20% off on all Products</div>
                            <div className="text-4xl title font-semibold">Welcome To TourBuzz</div>
                            <div className="text-xl mt-3 font-normal">
                                Aoi Sakura Mart is the most pocket friendly Online Shop.
                                We are the first Online Anime Merchandise Shop in Bangladesh, have been operating since 2011.
                            </div>
                        </div>
                    </div>
                    <div className="h-[30rem]">
                        <img src="https://i.postimg.cc/vTKnJ7Zz/key3-1.webp" className='h-[30rem]' alt="" />
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-10 pt-5 pb-16">
                <div className="grid grid-cols-1 gap-8">

                    <div>
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
                        <div className="grid grid-cols-6 gap-5 pt-3">
                            {[...Array(12)].map((e, i) => (
                                <ProductCard key={i} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </NavLayout>
    )
}

export default ShopHome

// {/* right best sellers */}
// {/* left products with categories tab */}
// {/* series */}
// {/* brand */}
// <section>
//     {/* new arrivals */}
// </section>
// <section>
//     {/* most popular */}
// </section>
// <section>
//     {/* categories */}
// </section>
// <section>
//     {/* cat 1 */}
// </section>
// <section>
//     {/* cat 2 */}
// </section>
// <section>
//     {/* cat 3 */}
// </section>
// <section>
//     {/* cat 4 */}
// </section>