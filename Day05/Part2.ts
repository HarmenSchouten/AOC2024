import "../utils/index.ts"
const input = await Deno.readTextFile("./Day05/input.txt");

const [ruleLines, updatesLines] = input.splitDlb();

const rules = ruleLines
    .splitLb()
    .map(item => item.split("|").map(Number))

const invalidUpdates = updatesLines
    .splitLb()
    .map(line => line.split(",").map(Number))
    .reduce((acc, state) => {
        const isValid = state.every((value, index) => {
            return rules
                .filter(rule => rule.includes(value))
                .every(rule => {
                    if (rule[0] === value) {
                        const secondValueIdx = state.indexOf(rule[1])
                        if (secondValueIdx === -1 || secondValueIdx > index) return true;
                        if (secondValueIdx < index) return false;
                    } else {
                        const firstValueIdx = state.indexOf(rule[0])
                        if (firstValueIdx === -1 || firstValueIdx < index) return true;
                        if (firstValueIdx > index) return false;
                    }
                })
        })

        if (!isValid) acc.push(state)
        return acc;
    }, [] as number[][])   

const answer = invalidUpdates
    .map(update => update
        .sort((a, b) => {
            const rule = rules.find(rule => rule.includes(a) && rule.includes(b))

            if (!rule) return 0
            if (rule[0] === a) return -1;
            return 1;
    }))
    .reduce((acc, state) => acc + state[(state.length - 1) / 2], 0)

console.log(answer)