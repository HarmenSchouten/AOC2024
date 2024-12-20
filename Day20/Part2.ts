import { manhattan } from "../utils/common.ts";
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

visitedCells.clear()
const exploredPaths = new Set<string>()
for (let i = 0; i < winningPath.length; i++) 
for (let j = 1; j < winningPath.length; j++) {
    const mDist = manhattan(
        {x: winningPath[i][0], y: winningPath[i][1]}, 
        {x: winningPath[j][0], y: winningPath[j][1]})

    if (mDist > 1 && mDist <= 20 && (Math.abs(j - i) - mDist) >= 100) {
        const key1 = `s:${i};e:${j}`
        const key2 = `s:${j};e:${i}`

        if (exploredPaths.has(key1) || exploredPaths.has(key2)) continue;

        exploredPaths.add(key1)
    }
}

console.log(exploredPaths.size)