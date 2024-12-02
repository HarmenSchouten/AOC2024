const input = await Deno.readTextFile("./Day01/input.txt");

const items = input
    .split("\r\n")
    .map(line => {
        const [left, right] = line.split("   ").map(Number)

        return {
            left: left,
            right: right
        }
    })

const left = items.map(item => item.left).sort((a,b) => a - b)
const right = items.map(item => item.right).sort((a,b) => a - b)

const answer = left.reduce((acc, state, idx) => acc + Math.abs(state - right[idx]), 0)

console.log(answer)