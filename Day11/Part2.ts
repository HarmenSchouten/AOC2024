import "../utils/index.ts"
const input = await Deno.readTextFile("./Day11/input.txt");

const stones = input
    .split(" ")
    .map(Number)
    .reduce((acc, state) => {
        if (acc[state]) acc[state] = acc[state] + 1
        else acc[state] = 1

        return acc
    }, {} as Record<number, number>)

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
for (let i = 0; i < 75; i++) {

    const newStones = Object
        .keys(currentStones)
        .map(key => {
            const count = currentStones[Number(key)]

            return {
                count: count,
                new: blink([Number(key)])
            }
        })

    currentStones = newStones
        .reduce((acc, state) => {
            state.new.forEach(item => {
                if (acc[item]) acc[item] = acc[item] + state.count
                else acc[item] = state.count
            })

            return acc;
        }, {} as Record<number, number>)
}

const answer = Object
    .keys(currentStones)
    .reduce((acc, state) => acc += currentStones[Number(state)], 0)

console.log(answer)