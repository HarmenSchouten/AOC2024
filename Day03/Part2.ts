const input = await Deno.readTextFile("./Day03/input.txt");

const validItems = input.match(/(mul\(\d*,\d*\))|(do\(\))|(don't\(\))/g) ?? []

let enabled = true;

const answer = validItems
    .reduce((acc, state) => {
        if (state.startsWith("don't")) enabled = false;
        if (state.startsWith("do()")) enabled = true;
        if (enabled) {
            const numbers = state.slice(4, state.length - 1).split(",").map(Number)
            if (numbers.length != 2) return acc;
            acc += numbers.product()
        }
        return acc;
    }, 0)   

console.log(answer)