import { HeartIcon } from "@heroicons/react/24/outline";
import ImageLoader from "./ImageLoader";
import { StarIcon } from "@heroicons/react/24/solid";

const ProductCardMax = () => {
    const Ranker = ({bg, color}:{bg: string, color: string}) => (
        <div className="relative">
            <StarIcon className="h-12 w-12" style={{color: bg}} />
            <div 
                className="absolute top-0 left-0 flex w-full h-full justify-center items-center font-semibold"
                style={{color}}
            >1</div>
        </div>
    )
    
    return (
        <div className="group p-3 overflow-hidden card bg-base-200 border border-base-300 relative">
            <div className="absolute w-full h-32 bg-base-100 group-hover:bg-accent duration-200 top-0 left-0 z-[1]" />
            <div className="absolute right-0 top-0 m-3 z-[2]">
                <Ranker bg="#ebba34" color="#ffffff" />
            </div>
            <div className="flex overflow-hidden z-[2]">
                <div className="relative">
                    <div className="h-48 w-40 card overflow-hidden">
                        <ImageLoader
                            src="https://i.postimg.cc/dVVVj9By/image.png"
                            className="h-48 w-40 object-cover group-hover:scale-110 group-hover:rotate-6 duration-200"
                        />
                    </div>
                    <div className="absolute top-0 left-0 m-3">
                        <div className="flex space-x-3 -translate-x-40 group-hover:translate-x-0 duration-200">
                            <div className="bg-black text-white py-1 px-2 card">
                                - 39%
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 w-full">
                    <div className="flex flex-col gap-1 py-3 px-5 text-base-content group-hover:text-accent-content duration-200 h-32">
                        <div className="flex justify-between">
                            <div className="text-xl font-medium">Riot Beverage</div>
                        </div>
                        <div className="flex w-full items-center space-x-2">
                            <div className="title font-bold">3000 BDT</div>
                            <div className="text-xs line-through">3500 BDT</div>
                        </div>
                        <div className="bg-neutral-content text-neutral group-hover:bg-accent-content group-hover:text-accent h-6 px-2 w-fit text-sm flex items-center font-medium">IN STOCK</div>
                    </div>
                    <div className="px-3">
                        <div className="flex">
                            <button className="btn min-h-10 h-10 btn-accent mr-1">
                                Buy Now
                            </button>
                            <button className="btn min-h-10 h-10 btn-neutral btn-outline border-base-300 bg-base-100">
                                Add to Bag
                            </button>
                            <button className="btn min-h-10 h-10 btn-neutral btn-square btn-outline border-base-300 bg-base-100 ml-auto">
                                <HeartIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="mt-2 text-sm text-base-content/80">
                            30 units were bought by 12 people
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductCardMax