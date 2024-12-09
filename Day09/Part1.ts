import "../utils/index.ts"
const input = await Deno.readTextFile("./Day09/input.txt");

const parsed = input
    .split("")
    .map((item, idx) => {
        const isFile = idx % 2 === 0

        return {
            isFile: isFile,
            index: isFile ? idx / 2 : undefined,
            value: Array.from({length: Number(item)}).map(_ => isFile ? `${idx === 0 ? 0 : idx / 2}` : ".")
        }
    })

while (true) {

    const firstGapIndex = parsed.findIndex(item => !item.isFile && item.value.length > 0)
    if (firstGapIndex == -1) break;
    
    const gap = parsed[firstGapIndex]
    const lastFileIdx = parsed.findLastIndex(item => item.isFile && item.value.length > 0)
    
    if (lastFileIdx == -1 || lastFileIdx < firstGapIndex) break;
    
    const lastFile = parsed[lastFileIdx]
    const numberToReplace = lastFile.index
    
    gap.value.splice(gap.value.indexOf("."), 1, `${numberToReplace}`)
    lastFile.value = lastFile.value.slice(0, -1)

    if (lastFile.value.length === 0) lastFile.isFile = false;
    if (!gap.value.includes(".")) gap.isFile = true
}

const checksum = parsed
    .flatMap(item => item.value)
    .filter(item => item != '.')
    .reduce((acc, state, idx) => acc += (Number(state) * idx), 0)

console.log(checksum)