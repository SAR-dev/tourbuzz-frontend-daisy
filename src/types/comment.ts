import { UserType } from "./base";

export interface CommentType {
    id: number;
    reference_type: string;
    reference_id: number;
    parent_id: number;
    users_id: number;
    details: string;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    child_count: number;
    author: UserType;
}