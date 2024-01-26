const ArticleCard = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="h-64 w-full relative">
                <img
                    src="https://www.jal.co.jp/in/en/guide-to-japan/destinations/articles/osaka/must-see-osaka-attractions/_jcr_content/root/responsivegrid/sectioncontainer/image_295720536.coreimg.jpeg/1697678488560.jpeg"
                    alt=""
                    className="h-64 w-full object-cover card"
                />
                <div className="absolute bottom-0 left-0 m-2">
                    <div className="group flex items-center gap-2 rounded-full bg-slate-200 p-2">
                        <img className="h-6 w-6 rounded-full" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="" />
                        <div className="hidden w-0 -translate-x-20 pr-1 ease-in-out group-hover:block group-hover:w-auto group-hover:translate-x-0">Sayed Rafi</div>
                    </div>
                </div>
            </div>
            <div className="text-secondary italic">
                Tour Suggestion, Adventure
            </div>
            <div className="font-semibold text-xl title line-clamp-2">
                Japan Winter Adventures: Your Guide to Winter in Japan This 2023
            </div>
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