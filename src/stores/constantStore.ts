export const constants = {
    EMOJI_STORE_KEY: "emoji",
    COMMENT_STORE_KEY: {
        ARTICLE: "article_comment_",
        TOUR: "tour_comment_",
        HOTEL: "hotel_comment_",
        PLACE: "place_comment_",
        ORGANIZER: "organizer_comment_",
    },
    THEME_STORE_KEY: "theme",
    JWT_AUTH_KEY: "auth",
    EMOJI_HISTORY_KEY: "emoji_history",
    REGEX_PATTERN: {
        EMAIL: new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    },
    ORGANIZER_LEVEL: {
        LEVEL1: "Tour organizers at this level undergo fundamental checks to ensure they are legitimate businesses or individuals. This typically includes verifying their contact information, business registration (if applicable), and basic background screening.",
        LEVEL2: "Tour organizers at this level undergo fundamental checks to ensure they are legitimate businesses or individuals. This typically includes verifying their contact information, business registration (if applicable), and basic background screening.",
        LEVEL3: "Tour organizers at this level undergo fundamental checks to ensure they are legitimate businesses or individuals. This typically includes verifying their contact information, business registration (if applicable), and basic background screening.",
        LEVEL4: "Tour organizers at this level undergo fundamental checks to ensure they are legitimate businesses or individuals. This typically includes verifying their contact information, business registration (if applicable), and basic background screening.",
        LEVEL5: "Tour organizers at this level undergo fundamental checks to ensure they are legitimate businesses or individuals. This typically includes verifying their contact information, business registration (if applicable), and basic background screening.",
    },
    ORGANIZER_MEDAL: {
        LEVEL1: "⚙️ LEVEL 1",
        LEVEL2: "🛡️ LEVEL 2",
        LEVEL3: "⚡ LEVEL 3",
        LEVEL4: "🌟 LEVEL 4",
        LEVEL5: "💎 LEVEL 5",
    },
    ADMIN_HELP_MAIL_MAILTO_LINK: "mailto:tourbuzz.help@gmail.com?subject=Assistance%20Needed%20with%20TourBuzz%20Platform",
    COMMENT_LIMIT: {
        ARTICLE: 5,
        TOUR: 10,
        HOTEL: 10,
        PLACE: 10,
        ORGANIZER: 10,
    },
    REACT_QUERY_KEY: {
        COMMENT: {
            ARTICLE: "article_comments",
            TOUR: "tour_comments",
            HOTEL: "hotel_comments",
            PLACE: "place_comments",
            ORGANIZER: "organizer_comments",
        }
    }
}