import "../utils/index.ts"
const input = await Deno.readTextFile("./Day09/input.txt");

const parsed = input
    .split("")
    .map((item, idx) => {
        const isFile = idx % 2 === 0

        return {
            index: idx,
            isFile: isFile,
            id: isFile ? idx / 2 : undefined,
            value: Array.from({length: Number(item)}).map(_ => isFile ? `${idx === 0 ? 0 : idx / 2}` : ".")
        }
    })

parsed
    .filter(item => item.isFile)
    .sort((a, b) => b.id! - a.id!)
    .forEach((state) => {
        const firstAvailableGap = parsed.find(item => 
            !item.isFile 
            && item.index < state.index
            && item.value.filter(v => v === ".").length >= state.value.length)

        if (!firstAvailableGap) return;
        
        const firstDotIndex = firstAvailableGap.value.indexOf(".")
        firstAvailableGap.value.splice(firstDotIndex, state.value.length, ...state.value)

        const item = parsed.find(item => item.id === state.id)!
        item.value = item.value.map(_ => ".")
        item.isFile = false
    })


const checksum = parsed
    .flatMap(item => item.value)
    .reduce((acc, state, idx) => {
        if (state === '.') return acc;
        return acc += (Number(state) * idx)
    }, 0)

console.log(checksum)