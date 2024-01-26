import { LinkIcon } from "@heroicons/react/24/outline";

const AdImageCard = ({
    title,
    image,
    link
}: {
    title: string
    image: string
    link: string
}) => {
    return (
        <div className="card overflow-hidden relative h-fill">
            <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-base-100">
                <a href={link} target="_blank" className="bg-primary/10 text-sm font-semibold w-full px-5 py-3 flex gap-1 items-center group">
                    <div>{title}</div>
                    <LinkIcon className="h-4 w-4 group-hover:translate-x-1 transition" />
                </a>
            </div>
        </div>
    )
}

export default AdImageCard;