import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import ImageLoader from "./ImageLoader";

const ProductCardMin = () => {
    return (
        <div className="group card p-3 border border-base-300 bg-base-100 text-base-content hover:bg-base-content hover:text-base-100 duration-200">
            <div className="overflow-hidden">
                <div className="relative">
                    <div className="h-48 w-full overflow-hidden card">
                        <ImageLoader
                            src="https://i.postimg.cc/dVVVj9By/image.png"
                            className="h-48 w-full object-cover group-hover:scale-110 group-hover:rotate-6 duration-200"
                        />
                    </div>
                    <div className="absolute top-0 left-0 m-3">
                        <div className="flex space-x-3 -translate-x-40 group-hover:translate-x-0 duration-200">
                            <div className="bg-black text-white py-1 px-2 card">
                                - 39%
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 m-3">
                        <div className="flex space-x-3 translate-x-40 group-hover:translate-x-0 duration-200">
                            <button className="btn btn-square btn-sm btn-accent">
                                <ShoppingCartIcon className="h-5 w-5" />
                            </button>
                            <button className="btn btn-square btn-sm btn-accent">
                                <HeartIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    <div className="font-medium">Riot Beverage</div>
                    <div className="flex w-full items-center">
                        <div className="title font-bold text-red-500">3000 BDT</div>
                        <div className="text-xs line-through ml-2">3500 BDT</div>
                        <div className="ml-auto text-xs">
                            +30 P
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCardMin