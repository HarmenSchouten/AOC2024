import "../utils/index.ts"
const input = await Deno.readTextFile("./Day19/input.txt");

const [towelsStr, patternsLines] = input.splitDlb();
const towels = towelsStr.split(", ").filter(item => item.length > 0)
const patterns = patternsLines.splitLb()

const map = new Map<string, number>();

const find = (pattern: string) => {
    if (map.has(pattern)) return map.get(pattern)!
    if (pattern.length === 0) return 0

    let counter = 0;
    for (let i = 0; i < towels.length; i++) {
        if (pattern.startsWith(towels[i])) {
            const newPattern = pattern.slice(towels[i].length)
            counter += find(newPattern)
        }
    }

    map.set(pattern, counter)
    return counter;
}

const maxLength = towels.sort((a, b) => b.length - a.length)[0].length;
for (let i = 1; i < maxLength; i++) {
    const current = towels.filter(towel => towel.length === i);
    if (i === 1) current.forEach(c => map.set(c, 1));
    else current.forEach(c => map.set(c, find(c) + 1));
}

const answer = patterns.reduce((sum, design) => sum + find(design), 0);

console.log(answer)