const input = await Deno.readTextFile("./Day02/input.txt");

const isLineSafe = (items: number[], isDecimated?: boolean): boolean => {
    return items.every((item, idx, arr) => {
        if (idx === 0) return true;
        const diff = item - arr[idx - 1]
        return diff < 0 && Math.abs(diff) <= 3
    }) || items.every((item, idx, arr) => {
        if (idx === 0) return true;
        const diff = item - arr[idx - 1]
        return diff > 0 && Math.abs(diff) <= 3
    }) || (!isDecimated && items.some((_, idx, arr) => {
        const copy = [...arr]
        copy.splice(idx, 1)
        return isLineSafe(copy, true)
    }))
}

const answer = input
    .split("\r\n")
    .map(line => line.split(" ").map(Number))
    .reduce((acc, state) => isLineSafe(state) ? acc += 1 : acc, 0)   

console.log(answer)