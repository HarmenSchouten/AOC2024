import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day20/input.txt");

const grid = new Grid2D<string>(input)

const start = grid.find(item => item.value === "S")!
const end = grid.find(item => item.value === "E")!

const queue = [{x: start.x, y: start.y, score: 0, trace: []}] as {x: number, y: number, score: number, trace: string[]}[]
const visitedCells = new Set<string>()
let winningPath = [] as number[][];
while (true) {

    const current = queue.shift();

    if (!current) break;

    if (current.x === end.x && current.y === end.y) {
        winningPath = [...current.trace, `${current.x},${current.y}`]
            .map(item => item.split(",").map(Number))
            .filter(item => item.length > 1)
        break;
    }

    const cell = grid.get(current.x, current.y)

    if (!cell.value || visitedCells.has(`${current.x},${current.y}`)) continue
    visitedCells.add(`${current.x},${current.y}`)

    cell
        .getAdjacentNeighbours(
            false,
            item => item.value !== '#' && !visitedCells.has(`${item.x},${item.y}`))
        .forEach(n => {
            const newScore = current.score + 1
            queue.push({ x: n!.x, y: n!.y, score: newScore, trace: [...current.trace, `${current.x},${current.y}`] })
        })

    queue.sort((a, b) => a.score - b.score)
}

const answer = grid
    .filter(item => item.value === "#")
    .reduce((acc, w) => {
        const wLeft = w.left(), wRight = w.right(), wUp = w.up(), wDown = w.down();

        const idxLeft = winningPath.findIndex(item => item[0] === wLeft.x && item[1] === wLeft.y)
        const idxRight = winningPath.findIndex(item => item[0] === wRight.x && item[1] === wRight.y)
        if (idxLeft !== -1 && idxRight !== -1) acc.push(Math.abs(idxRight - idxLeft) - 2)

        const ixUp = winningPath.findIndex(item => item[0] === wUp.x && item[1] === wUp.y)
        const idxDown = winningPath.findIndex(item => item[0] === wDown.x && item[1] === wDown.y)
        if (ixUp !== -1 && idxDown !== -1) acc.push(Math.abs(ixUp - idxDown) - 2)

        return acc;
    }, [] as number[])
    .filter(item => item >= 100)
    .length

console.log(answer)