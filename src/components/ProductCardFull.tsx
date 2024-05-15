import { HeartIcon, ShoppingBagIcon, WalletIcon } from "@heroicons/react/24/outline";
import ImageLoader from "./ImageLoader";
import { TagIcon } from "@heroicons/react/24/solid";

const ProductCardFull = () => {

    return (
        <div className="group overflow-hidden card flex-row divide-x divide-base-content/25 border border-base-content/25 relative">
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
                        <div className="flex w-full items-center space-x-3">
                            <div className="text-2xl font-bold text-error">BDT 3000</div>
                            <div className="text-2xl font-bold line-through opacity-50">BDT 3000</div>
                        </div>
                        <div className="text-base-content/80 flex items-center gap-1">
                            <TagIcon className="h-4 w-4" /> Save TK 300 and get 30 Points
                        </div>
                    </div>
                    <div className="flex h-fill items-end">
                        <div className="flex gap-1">
                            <button className="btn btn-neutral">
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
                </div>
            </div>
        </div>

    )
}

export default ProductCardFull