import '../utils/index.ts'
const input = await Deno.readTextFile("./Day07/input.txt");

const equationLines = input
    .splitLb()
    .map(item => {
        const [result, numbersStr] = item.split(": ")

        return {
            result: Number(result),
            numbers: numbersStr.split(" ").map(Number)
        }
    })

const answer = equationLines.reduce((sum, line) => {

    const possibleResults = line.numbers.reduce((acc, state) => {
        if (acc.length === 0) return [state]

        return acc.flatMap(nr => [
            nr + state,
            nr * state
        ])
    }, [] as number[])
    
    if (possibleResults.includes(line.result)) {
        return sum += line.result
    }

    return sum;
}, 0)

console.log(answer)