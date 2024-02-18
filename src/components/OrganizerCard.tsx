import { EnvelopeOpenIcon, LinkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { constants } from "@src/stores/constantStore";
import { OrganizerType } from "@src/types/base";
import OrganizerVerification from "./OrganizerVerification";
import { Link } from "react-router-dom";

const OrganizerCard = ({ organizer }: { organizer: OrganizerType }) => {
    return (
        <div className="card border border-base-300 relative">
            <div className="absolute top-0 left-0 -m-5">
                <div className="rounded-full border bg-base-100 border-base-300 p-2">
                    <img
                        src={organizer.avatar?.optimized_url}
                        alt=""
                        className="h-20 w-20 object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="ml-2 pl-20 pt-5">
                <Link to={`/organizers/${organizer.username}`} className="title font-semibold text-xl leading-6 hover:text-teal-500 duration-100">{organizer.name}</Link>
                <div>{organizer.slogan}</div>
            </div>
            <div className="p-5 flex flex-col gap-4 h-fill justify-between">
                <div className="line-clamp-4">
                    {organizer.description}
                </div>
                <div className="flex gap-2">
                    <a href={`mailto:${organizer.email}`} className="btn btn-xs border border-base-300 btn-ghost">
                        <EnvelopeOpenIcon className="h-4 w-4" />
                        Email
                    </a>
                    <a href={`tel:${organizer.contact_no}`} className="btn btn-xs border border-base-300 btn-ghost">
                        <PhoneIcon className="h-4 w-4" />
                        Phone
                    </a>
                    <a href={organizer.social_link} className="btn btn-xs border border-base-300 btn-ghost">
                        <LinkIcon className="h-4 w-4" />
                        Website
                    </a>
                    <OrganizerVerification organizer={organizer}>
                        <button className="btn btn-xs border border-base-300 btn-ghost">
                            {constants.ORGANIZER_MEDAL[organizer.verification as keyof typeof constants.ORGANIZER_MEDAL]}
                        </button>
                    </OrganizerVerification>
                </div>
            </div>
        </div>
    )
}

export default OrganizerCard;