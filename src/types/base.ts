export interface DataResponseType {
    data: unknown
    error?: unknown
}

export interface HotelType {
    id: number
    districts_id: number
    images_id: number
    name: string
    map_link: string
    website: string
    review: string
    created_at: Date
    updated_at: Date
    district: DistrictType
    avatar: ImageType
    admins: UserType[]
    staffs: UserType[]
}

export interface DistrictType {
    id: number
    name: string
    divisions_id: number
    division: DivisionType
}

export interface DivisionType {
    id: number
    name: string
}

export interface DivisionWithDistrictType {
    division: DivisionType
    districts: DistrictType[]
}

export interface ImageType {
    id: number
    title: string
    source_url: string
    thumbnail_url: string
    optimized_url: string
    created_at: Date
    updated_at: Date
}

export interface AdType {
    id: number
    title: string
    subtitle: string
    link: string
    image_url: string
    active: boolean
    created_at: Date
    updated_at: Date
}

export interface WriterType {
    id: number
    images_id: number
    email: string
    name: string
    username: string
    about: string
    contact_no: string
    website: string
    created_at: Date
    updated_at: Date
    avatar: ImageType
}

export interface ArticleType {
    id: number
    writers_id: number
    title: string
    category: string
    slug: string
    subtitle: string
    summary: string
    md_desc: string
    image_ids: string
    created_at: Date
    updated_at: Date
    writer: WriterType
    images: ImageType[]
}

export interface UserType {
    id: number
    email: string
    username: string
    name: string
    images_id: number
    last_logged_in: string
    created_at: Date
    updated_at: Date
    avatar: ImageType | null
}

export interface OrganizerType {
    id: number
    name: string
    username: string
    description: string
    slogan: string
    email: string
    images_id: number
    verification: string
    social_link: string
    contact_no: string
    created_at: Date
    updated_at: Date
    avatar: ImageType | null
    admins: UserType[]
    staffs: UserType[]
}

export interface EnquiryListType {
    user: UserType
    enquiries: EnquiryType[]
}

export interface EnquiryType {
    id: number
    users_id: number
    question: string
    answer?: string
    answered_at?: Date
    created_at: Date
    updated_at: Date
    user: UserType
}

export interface PlaceType {
    id: number
    images_id: number
    districts_id: number
    name: string
    postal_code: string
    map_link: string
    description: string
    type: string
    created_at: Date
    updated_at: Date
    district: DistrictType
    avatar: ImageType | null
}

export interface PackageType {
    id: number
    status: string
    tours_id: number
    title: string
    included: string
    excluded: string
    conditions: string
    price: number
    threshold: number
    created_at: Date
    updated_at: Date
}

export interface TourLogType {
    id: number
    status: string
    tours_id: number
    hotels_id: number
    title: string
    description: string
    date: Date
    image_ids: string
    created_at: Date
    updated_at: Date
    images: ImageType[]
    places: PlaceType[]
    hotel: HotelType
}

export interface TourType {
    id: number
    tour_types_id: number
    organizers_id: number
    images_id: number
    title: string
    slug: string
    md_desc: string
    highlights: string
    faq: string
    video_link: string
    group_size: string
    group_info: string
    transports: string
    cancel_ins: string
    start_ins: string
    finish_ins: string
    start_at: Date
    finish_at: Date
    last_sell_at: Date
    image_ids: string
    created_at: Date
    updated_at: Date

    organizer: OrganizerType
    avatar: ImageType
    images: ImageType[]
    tour_type: TypeOfTour
    packages: PackageType[]
    tour_logs: TourLogType[]
    places: PlaceType[]
}

export interface TourShortType {
    id: number
    title: string
    slug: string
    group_size: string
    group_info: string
    transports: string
    start_at: Date
    finish_at: Date
    last_sell_at: Date
    created_at: Date
    updated_at: Date

    organizer: OrganizerType
    avatar: ImageType
}

export interface TypeOfTour {
    id: number
    name: string
    slug: string
    details: string
    created_at: Date
    updated_at: Date
}

export interface PaymentType {
    id: number;
    users_id: number;
    invoice_no: string;
    reference_no: string;
    payment_type: string;
    transaction_id: string;
    payment_id: string;
    payment_amount: number;
    currency: string;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
    user: UserType
}
export interface FileType {
    id: number
    filename: string
    link: string
    note: string
    created_at: Date;
    updated_at: Date;
}

export interface TicketType {
    id: number
    packages_id: number
    users_id: number
    ticket_amount: number
    note: string
    created_at: Date
    updated_at: Date
    payment: PaymentType
    files: FileType[]
    booked_package: {
        tour_package: PackageType
        tour: TourShortType
        ticket_sold: number
    }
}
