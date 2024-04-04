import { HeartIcon, ShoppingBagIcon, WalletIcon } from "@heroicons/react/24/outline";
import ImageLoader from "./ImageLoader";

const ProductCardFull = () => {

    return (
        <div className="group overflow-hidden card flex-row divide-x bg-warning/10 divide-warning/30 border border-warning/30 relative">
            <div className="flex-1 p-8">
                <div className="flex flex-col h-full">
                    <div className="mb-5">
                        <div className="text-sm bg-accent px-2 py-1 text-accent-content card inline">
                            Limited Time Offer
                        </div>
                    </div>
                    <div className="title text-3xl font-semibold mb-2">Japan Original Gift Collection</div>
                    <div className="mb-5">Introducing a Nendoroid of the shopkeeper who runs a store that
                        grants wishes in exchange for something of equal value, Yuko Ichihara, from the CLAMP
                        series xxxHOLiC.
                    </div>
                    <div className="flex flex-col gap-2 mb-5">
                        <div className="flex w-full items-center space-x-5">
                            <div className="bg-error text-white h-10 px-5 w-fit text-xl flex items-center font-semibold">3000 BDT</div>
                            <div className="text-xl line-through">3500 BDT</div>
                        </div>
                        <div className="text-base-content/80">
                            🤩 Save 300 BDT 🎁 Get 30 Points
                        </div>
                    </div>
                    <div className="flex-flex-col gap-2">
                        <div><b>Manufaturer: </b>GyomuDB Japan</div>
                        <div><b>Series: </b>Solaris</div>
                        <div><b>Category: </b>Gift</div>
                    </div>
                    <div className="flex h-fill items-end">
                        <div className="flex gap-1">
                            <button className="btn btn-accent">
                                <WalletIcon className="h-5 w-5" />
                                Buy Now
                            </button>
                            <button className="btn btn-outline border-base-300 bg-base-100">
                                <ShoppingBagIcon className="h-5 w-5" />
                                Add to Bag
                            </button>
                            <button className="btn btn-outline border-base-300 bg-base-100">
                                <HeartIcon className="h-5 w-5" />
                                Add to Favourites
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-3">
                <div className="h-[30rem] w-full card relative overflow-hidden">
                    <ImageLoader
                        src="https://i.postimg.cc/0jTNbN06/image.png"
                        className="h-[30rem] w-full object-cover group-hover:scale-110 duration-200"
                    />
                    <div className="absolute bottom-0 left-0 w-full flex justify-center flex gap-3 p-3 translate-y-20 group-hover:translate-y-0 duration-200">
                        {[...Array(6)].map((_, i) => (
                            <button className="h-10 w-16 card cursor-pointer ring-2 ring-white hover:ring-info ring-offset-2 bg-transparent duration-200" key={i}>
                                <img className="card h-full w-full object-cover" src="https://i.postimg.cc/0jTNbN06/image.png" alt="" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCardFull