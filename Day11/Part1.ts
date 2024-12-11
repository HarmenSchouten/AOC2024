import "../utils/index.ts"
const input = await Deno.readTextFile("./Day11/input.txt");

const stones = input.split(" ").map(Number)

const blink = (stones: number[]):number[] => {
    return stones.reduce((acc, state) => {
        if (state === 0) acc.push(1)
        else if (state.toString().length % 2 === 0) {
            const length = state.toString().length
            acc.push(Number(state.toString().slice(0, length / 2)), Number(state.toString().slice(length / 2)))
        }
        else acc.push(state * 2024)

        return acc;
    }, [] as number[])
}

let currentStones = stones
for (let i = 0; i < 25; i++){
    currentStones = blink(currentStones)
}

console.log(currentStones.length)