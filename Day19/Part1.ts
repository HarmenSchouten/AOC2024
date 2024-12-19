import "../utils/index.ts"
const input = await Deno.readTextFile("./Day19/input.txt");

const [towelsStr, patternsLines] = input.splitDlb();
const towels = towelsStr.split(", ").filter(item => item.length > 0)
const patterns = patternsLines.splitLb()

const regexStr = `^(?:${towels.join("|")})+$`
const regex = new RegExp(regexStr, 'g')

const answer = patterns.reduce((acc, state) => {
    if (state.match(regex)) acc += 1
    return acc
}, 0)

console.log(answer)