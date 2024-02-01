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