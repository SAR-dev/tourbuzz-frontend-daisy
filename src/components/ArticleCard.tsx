import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";

const ArticleCard = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="h-64 w-full relative">
                <ImageLoader
                    src="https://www.jal.co.jp/in/en/guide-to-japan/destinations/articles/osaka/must-see-osaka-attractions/_jcr_content/root/responsivegrid/sectioncontainer/image_295720536.coreimg.jpeg/1697678488560.jpeg"
                    className="h-64 w-full object-cover card"
                />
                <div className="absolute bottom-0 left-0 m-2">
                    <div className="group flex items-center rounded-full bg-slate-200 p-2 overflow-hidden">
                        <img className="h-6 w-6 rounded-full" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="" />
                        <div className="p-0 group-hover:px-2 font-semibold opacity-0 group-hover:opacity-100 w-0 h-0 group-hover:w-auto group-hover:h-6 translate-x-40 group-hover:translate-x-0 transition-all duration-100 ease-in-out">Sayed Rafi</div>
                    </div>
                </div>
            </div>
            <div className="opacity-75 italic">
                Tour Suggestion, Adventure
            </div>
            <Link to="/articles/1" className="font-semibold text-xl title line-clamp-2 translate-y-0 hover:-translate-y-1 duration-100">
                Japan Winter Adventures: Your Guide to Winter in Japan This 2023
            </Link>
            <div className="line-clamp-4">
                From winter delicacies like shabu-shabu (hot pot) to serene hot springs,
                and the famous snowcapped , there really is no question about  being a
                consistent top winter destination to visit, so we get why you’re here
                in this very page right now! 😉
            </div>
        </div>
    )
}

export default ArticleCard;