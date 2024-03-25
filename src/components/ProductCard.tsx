import { FaceSmileIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductCard = () => {
    return (
        <div className="group card border border-base-300 p-3">
            <div className="overflow-hidden">
                <div className="relative">
                    <img
                        src="https://i.postimg.cc/dVVVj9By/image.png"
                        className="h-56 w-full object-cover card"
                        alt=""
                    />
                    <div className="absolute top-0 left-0 m-2">
                        <div className="card py-1 px-2 text-xs bg-neutral text-neutral-content uppercase font-medium shadow">
                            39% off
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 m-2">
                        <button className="-translate-x-24 rounded-full border bg-base-100 p-1 hover:bg-base-300 shadow duration-200 group-hover:translate-x-0">
                            <FaceSmileIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-3">
                    <div className="flex justify-between">
                        <div className="text-sm font-medium uppercase text-base-content/50">DRINKS</div>
                        <div className="text-sm font-medium">🔥😭🙏🍎 <span className="text-base-content/50">03</span></div>
                    </div>
                    <div className="font-medium">Riot Beverage</div>
                    <div className="flex w-full items-center space-x-2">
                        <div className="title font-bold">3000 BDT</div>
                        <div className="text-xs line-through">3500 BDT</div>
                    </div>
                    <div className="mt-2 flex w-full space-x-2">
                        <button className="flex-1 btn btn-neutral">
                            Add to cart
                            <ShoppingCartIcon className="h-5 w-5" />
                        </button>
                        <button className="btn btn-neutral">
                            <HeartIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCard