import { EmojiReactionType } from "./emoji_reaction";
import { ImageType } from "./image";

export interface TourListType {
    id: number;
    tour_types_id: number;
    organizers_id: number;
    images_id: number;
    title: string;
    slug: string;
    md_desc: string;
    summary: string;
    group_size: string;
    group_info: string;
    services: string;
    transports: string;
    cancel_ins: string;
    start_ins: string;
    finish_ins: string;
    start_at: Date;
    finish_at: Date;
    last_sell_at: Date;
    image_ids: string;
    created_at: Date;
    updated_at: Date;
    tour_type_name: string;
    organizer_name: string;
    organizer_verification: string;
    place_names: string;
    place_names_list: string[];
    district_names: string;
    district_names_list: string[];
    package_prices: string;
    package_prices_list: number[];
    images: ImageType[];
    emoji_reactions: EmojiReactionType[];
    avatar: ImageType;
    expired: boolean;
}