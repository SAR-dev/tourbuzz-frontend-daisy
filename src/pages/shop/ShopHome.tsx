import { NavbarType } from '@src/enums/NavbarType'
import NavLayout from '@src/layouts/NavLayout'

function ShopHome() {
    return (
        <NavLayout type={NavbarType.SHOP}>
            <div className="h-[30rem] relative">
                <div className="container mx-auto px-10 flex justify-between bg-gradient-to-r from-teal-700 to-yellow-200">
                    <div className="h-auto flex items-center max-w-[40rem]">
                        <div className='text-white'>
                            <div className="py-1 px-3 card bg-white text-black w-fit mb-3">🤗 20% off on all Products</div>
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
            <div className="container mx-auto px-10">
                <div className="grid grid-cols-1 py-16 gap-16">
                    {/* right best sellers */}
                    {/* left products with categories tab */}
                    {/* series */}
                    {/* brand */}
                    <section>
                        {/* new arrivals */}
                    </section>
                    <section>
                        {/* most popular */}
                    </section>
                    <section>
                        {/* categories */}
                    </section>
                    <section>
                        {/* cat 1 */}
                    </section>
                    <section>
                        {/* cat 2 */}
                    </section>
                    <section>
                        {/* cat 3 */}
                    </section>
                    <section>
                        {/* cat 4 */}
                    </section>
                </div>
            </div>
        </NavLayout>
    )
}

export default ShopHome