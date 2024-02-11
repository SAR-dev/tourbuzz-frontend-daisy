export interface EmojiReactionType {
    id: number;
    reference_type: number;
    reference_id: number;
    users_id: number;
    emoji: string;
    created_at: Date;
    updated_at: Date;
    users_username: string;
    users_email: string;
  }