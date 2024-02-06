export const constants = {
    EMOJI_STORE_KEY: "emoji",
    THEME_STORE_KEY: "theme",
    JWT_KEY: "auth",
    EMOJI_HISTORY_KEY: "emoji_history",
    TOAST_ICON: {
        ERROR: [
            "❌",
            "⚠️",
            "🚫",
            "⛔",
            "🔴",
            "⭕",
            "⛈️",
            "🛑",
            "⚡",
            "🚨"
        ],
        INFO: [
            "🧐",
            "🔍",
            "📘",
            "🔖",
            "📑",
            "🔔",
            "🌐",
            "💬",
            "📌"
        ],
        SUCCESS: [
            "🥳", 
            "🤗", 
            "👏", 
            "💪", 
            "😎", 
            "🤓", 
            "👍", 
            "🎉"
        ]
    },
    REGEX_PATTERN: {
        EMAIL: new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    }
}