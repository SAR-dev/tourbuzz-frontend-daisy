import { EnvelopeOpenIcon, LinkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { constants } from "@src/stores/constantStore";
import { OrganizerType } from "@src/types/base";
import OrganizerVerification from "./OrganizerVerification";

const OrganizerCard = ({ organizer }: { organizer: OrganizerType }) => {
    return (
        <div className="card border border-base-300 p-3 relative">
            <div className="absolute top-0 left-0 -m-5">
                <div className="rounded-full border bg-base-100 border-base-300 p-2">
                    <img
                        src={organizer.avatar?.optimized_url}
                        alt=""
                        className="h-20 w-20 object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="pl-20">
                <div className="title font-semibold text-xl leading-6">{organizer.name}</div>
                <div>{organizer.slogan}</div>
            </div>
            <div className="p-5 flex flex-col gap-4">
                <div className="line-clamp-4">
                    {organizer.description}
                </div>
                <div className="flex">
                    <a href={`mailto:${organizer.email}`} className="btn btn-xs btn-ghost">
                        <EnvelopeOpenIcon className="h-4 w-4" />
                        Email
                    </a>
                    <a href={`tel:${organizer.contact_no}`} className="btn btn-xs btn-ghost">
                        <PhoneIcon className="h-4 w-4" />
                        Phone
                    </a>
                    <a href={organizer.social_link} className="btn btn-xs btn-ghost">
                        <LinkIcon className="h-4 w-4" />
                        Website
                    </a>
                    <OrganizerVerification organizer={organizer}>
                        <button className="btn btn-xs btn-ghost">
                            {constants.ORGANIZER_MEDAL[organizer.verification as keyof typeof constants.ORGANIZER_MEDAL]}
                        </button>
                    </OrganizerVerification>
                </div>
            </div>
        </div>
    )
}

export default OrganizerCard;