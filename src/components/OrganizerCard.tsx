import { EnvelopeOpenIcon, LinkIcon, PhoneIcon } from "@heroicons/react/24/outline";

const OrganizerCard = () => {
    return (
        <div className="card bg-primary/10 p-3 relative">
            <div className="absolute top-0 left-0 -m-5">
                <div className="rounded-full border-8 border-primary/10 relative">
                    <img
                        src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                        alt=""
                        className="h-20 w-20 object-cover rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 -m-2 text-3xl">
                        🥇
                    </div>
                </div>
            </div>
            <div className="pl-20">
                <div className="title font-semibold text-xl leading-6">Qrio</div>
                <div className="text-neutral/75">Never Give Up On Yourself</div>
            </div>
            <div className="p-5 flex flex-col gap-4">
                <div className="line-clamp-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nulla reiciendis,
                    officia sed vero ipsa suscipit? Asperiores voluptatum sequi minus! Voluptas voluptatum
                    atque officiis deleniti voluptates, neque reprehenderit quam officia!
                </div>
                <div className="join">
                    <button className="join-item no-animation btn btn-xs btn-outline">
                        <EnvelopeOpenIcon className="h-4 w-4" />
                        Email
                    </button>
                    <button className="join-item no-animation btn btn-xs btn-outline">
                        <PhoneIcon className="h-4 w-4" />
                        Phone
                    </button>
                    <button className="join-item no-animation btn btn-xs btn-outline">
                        <LinkIcon className="h-4 w-4" />
                        Website
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrganizerCard;