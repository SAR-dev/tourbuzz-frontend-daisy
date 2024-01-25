const ArticleCard = () => {
    return (
        // <div className="card border p-5">
        <div className="flex flex-col gap-3">
            <div className="h-64 w-full relative">
                <img
                    src="https://www.jal.co.jp/in/en/guide-to-japan/destinations/articles/osaka/must-see-osaka-attractions/_jcr_content/root/responsivegrid/sectioncontainer/image_295720536.coreimg.jpeg/1697678488560.jpeg"
                    alt=""
                    className="h-64 w-full object-cover card"
                />
                <div className="absolute bottom-0 left-0 w-full">
                    <div className="w-full flex justify-between p-2">
                        <div className="bg-base-300 card">
                            <div className="text-sm font-medium px-2.5 py-0.5 rounded bg-base-300/10 base-content card">
                                Sayed Rafi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-info italic">
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
        // </div>
    )
}

export default ArticleCard;