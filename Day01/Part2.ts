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
const right = items
    .map(item => item.right)
    .reduce((acc, state) => {
        if (acc[state]) {
            acc[state] +=1
        } else {
            acc[state] = 1
        }

        return acc
    }, {} as Record<number, number>)

const answer = left.reduce((acc, state) => acc + (state * (right?.[state] ?? 0)), 0)

console.log(answer)
