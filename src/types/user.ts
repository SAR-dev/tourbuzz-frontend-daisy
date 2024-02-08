import { AvatarType } from "./avatar";

export interface UserType {
    id: number;
    email: string;
    username: string;
    name?: string;
    contact_no?: string;
    contact_email?: string;
    residence?: string;
    facebook_id?: string;
    youtube_id?: string;
    twitter_id?: string;
    images_id: number;
    last_logged_in: Date;
    created_at: Date;
    updated_at: Date;
    avatar: AvatarType;
}