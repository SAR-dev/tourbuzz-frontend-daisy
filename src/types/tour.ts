import { EmojiReactionType } from "./emoji_reaction";
import { ImageType } from "./image";

export interface TourListType {
    id: number;
    tour_types_id: number;
    organizers_id: number;
    images_id: number;
    title: string;
    video_link: string;
    slug: string;
    highlight: string;
    group_size: string;
    group_info: string;
    transports: string;
    start_at: Date;
    finish_at: Date;
    last_sell_at: Date;
    image_ids: string;
    created_at: Date;
    updated_at: Date;
    tour_type_name: string;
    organizer_name: string;
    organizer_verification: string;
    place_names_list: string[];
    district_names_list: string[];
    package_prices_list: number[];
    images: ImageType[];
    emoji_reactions: EmojiReactionType[];
    avatar: ImageType;
    expired: boolean;
}