export interface EmojiReactionType {
  emoji: string;
  count: number;
  reacted: boolean;
}

export interface EmojiSummaryType {
  topReactions: EmojiReactionType[];
  remainingCountSum: number;
}