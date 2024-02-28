import { UserType } from "./base";

export interface ParentCommentType {
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
    children: ChildCommentType[]
}

export interface ChildCommentType {
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

export interface AddCommentType {
    reference_id: number
    parent_id: number
    details: string
}