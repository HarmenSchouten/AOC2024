const input = await Deno.readTextFile("./Day03/input.txt");

const validItems = input.match(/(mul\(\d*,\d*\))/g) ?? []

const answer = validItems
    .map(item => item.slice(4, item.length - 1).split(",").map(Number))
    .reduce((acc, state) => {
        if (state.length != 2) return acc;
        return acc += state.product()
    }, 0)   

console.log(answer)