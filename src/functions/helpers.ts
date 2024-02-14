import { EmojiReactionType, EmojiSummaryType } from "@src/types/reaction";

export function slugToText(slug: string) {
    // Replace hyphens and underscores with spaces and split the string into words
    const words = slug.replace(/[-_]/g, ' ').split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words to form the normal text
    return capitalizedWords.join(' ');
}

export function findMostUsedStrings(arr: string[], max: number): string[] {
    const frequencyMap: Record<string, number> = {};

    arr.forEach(str => frequencyMap[str] = (frequencyMap[str] || 0) + 1);

    return Object.entries(frequencyMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, max)
        .map(([string]) => string);
}

export function randChoice<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function countDaysAndNights(startDate: Date, endDate: Date): { days: number, nights: number } {
    startDate = new Date(startDate);
    endDate = new Date(endDate)

    // Calculate the difference in milliseconds between the two dates
    const differenceMs = Math.abs(endDate.getTime() - startDate.getTime());

    // Convert milliseconds to days (assuming 1 day = 24 hours = 86400000 milliseconds)
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    // Calculate the number of nights (assuming nights are between 6 PM and 6 AM)
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    const startNight = startHour >= 18 || startHour < 6;
    const endNight = endHour >= 18 || endHour < 6;
    let nights = days;
    if (startNight) {
        // If the start date is at night, reduce the number of nights by one
        nights--;
    }
    if (endNight) {
        // If the end date is at night, increase the number of nights by one
        nights++;
    }

    // Return the result
    return { days, nights };
}

export function formatDate(date: Date): { 
    day: number, 
    month: number, 
    month_name: string, 
    year: number, 
    hour: number,
    minute: number,
    second: number,
    weekday: string
} {
    date = new Date(date);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const month_name = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const weekday = weekdays[date.getDay()];
    return { day, month, month_name, year, hour, minute, second, weekday };
}

export function splitUniqueList(list: string[], maxLength: number): { show: string[], hide: string[] } {
    // Remove duplicates by converting array to Set and back to array
    const uniqueList = [...new Set(list)];

    const show = uniqueList.slice(0, maxLength);
    const hide = uniqueList.slice(maxLength);

    return { show, hide };
}

export function parrseToNDigit(value: number, digits: number){
    return value.toLocaleString('en-US', {minimumIntegerDigits: digits, useGrouping:false})
}

export function parsePrice(price: number){
    return (new Intl.NumberFormat('en-US')).format(price)
}

export function dateDifferenceInDays(date1: Date, date2: Date): number {
    date1 = new Date(date1);
    date2 = new Date(date2);

    // Convert both dates to milliseconds
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date2Ms - date1Ms);

    // Convert the difference to days
    return Math.ceil(differenceMs / (1000 * 3600 * 24));
}

export function getTopEmojiReactionsWithSummary(reactions: EmojiReactionType[], n: number): EmojiSummaryType {
    // Sort the reactions based on whether they are reacted, and then by count in descending order
    const sortedReactions = reactions.sort((a, b) => {
        // If both reactions are reacted or both are not reacted, sort by count
        if (a.reacted === b.reacted) {
            return b.count - a.count;
        }
        // Sort by reacted status, with reacted reactions first
        return a.reacted ? -1 : 1;
    });
    
    // Slice the array to get the top n elements
    const topReactions = sortedReactions.slice(0, n);
    
    // Calculate the sum of counts for the remaining reactions
    const remainingCountSum = sortedReactions.slice(n).reduce((sum, reaction) => sum + reaction.count, 0);
    
    return { topReactions, remainingCountSum };
}
