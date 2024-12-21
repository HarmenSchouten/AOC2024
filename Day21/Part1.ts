import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day21/input.txt");

const numpad = new Grid2D('789\r\n456\r\n123\r\n 0A')
const dirpad = new Grid2D(' ^A\r\n<v>')

const map = new Map<string, string[]>()

const findShortestPathsToNextChar = (start: string, target: string, grid: Grid2D<string>, x: boolean) => {
    
    if (map.has(`${start}-${target}`)) return map.get(`${start}-${target}`)!
    
    const startCell = grid.find(item => item.value === start)!
    const queue = [{x: startCell.x, y: startCell.y, score: 0, trace: ''}]
    const end = grid.find(item => item.value === target)!
    const visitedCells = new Set<string>()
    const paths = []

    while (true) {
        const current = queue.shift()

        if (!current) break
        const cell = numpad.get(current.x, current.y)!
        if (current.x === end.x && current.y === end.y) {
            const finalPath = current.trace + 'A'
            if (finalPath.length > paths.sort((a, b) => a.length - b.length)?.[0]?.length) break
            paths.push(current.trace + 'A')
            if (!x) continue
            break;
        }

        const key = `${current.x},${current.y},${current.trace.slice(-1)}`
        if (visitedCells.has(key)) continue;

        visitedCells.add(key)

        const options = [
            {cell: cell.left(), a: '<'},
            {cell: cell.right(), a: '>'},
            {cell: cell.down(), a: 'v'},
            {cell: cell.up(), a: '^'},
        ]

        options
            .filter(item => item.cell.value !== undefined && item.cell.value !== ' ')
            .forEach(n => queue.push({x: n.cell.x, y: n.cell.y, score: current.score + 1, trace: current.trace + n.a}))

        queue.sort((a, b) => a.score - b.score)
    }

    paths.sort((a, b) => a.length - b.length)
    const shortest = paths[0].length
    const valids = paths.filter(item => item.length === shortest)

    map.set(`${start}-${target}`, valids)

    return valids
}

const findShortestPathsForCode = (code: string, grid: Grid2D<string>, x: boolean) => {
    const paths = [...code]
        .reduce((acc, state, idx, arr) => {
            const current = idx === 0 ? 'A' : arr[idx - 1]
            const paths = findShortestPathsToNextChar(current, state, grid, x)

            if (acc.length > 0) {
                return acc.flatMap(item => paths.map(p => item + p))
            } else {
                acc.push(...paths)
            }
        
            return acc
        }, [] as string[])
        .sort((a, b) => a.length - b.length)

    const shortest = paths[0].length
    return new Set<string>(paths.filter(item => item.length === shortest)).keys()
}

const answer = input
    .splitLb()
    .reduce((acc, code) => {
        const step1 = findShortestPathsForCode(code, numpad, false)
        const step2 = step1
            .flatMap(item => findShortestPathsForCode(item, dirpad, false))
        const step3 = step2
            .flatMap(item => findShortestPathsForCode(item, dirpad, true))
            .toArray()
            .sort((a, b) => a.length - b.length)
        return acc + (step3[0].length * Number(code.match(/\d+/g)))
    }, 0)

console.log(answer)