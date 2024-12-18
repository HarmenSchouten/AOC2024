import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day18/input.txt");

const max = 70;

const bytes = input
    .splitLb()
    .map(item => {
        const [x, y] = item.split(",").map(Number)
        return { x: x, y: y }
    })

const line = Array.from({ length: max + 1 }, () => '.').join("")
const lines = Array.from({ length: max + 1 }, () => line).join("\r\n")

const findPath = (length: number) => {
    const grid = new Grid2D<string>(lines)

    bytes
        .slice(0, length)
        .forEach(b => grid.set(b.x, b.y, '#'))

    const start = { x: 0, y: 0, score: 0 }
    const end = { x: max, y: max }
    const queue = [start]
    const visitedCells = new Set<string>()
    let finalScore = -1

    while (true) {

        const current = queue.shift();

        if (!current) break;

        if (current.x === end.x && current.y === end.y) {
            finalScore = current.score
            break;
        }

        const cell = grid.get(current.x, current.y)

        if (!cell.value || visitedCells.has(`${current.x},${current.y}`)) continue
        visitedCells.add(`${current.x},${current.y}`)

        cell
            .getAdjacentNeighbours(
                false,
                item => item.value === '.' && !visitedCells.has(`${item.x},${item.y}`))
            .forEach(n => {
                const newScore = current.score + 1
                queue.push({ x: n!.x, y: n!.y, score: newScore })
            })

        queue.sort((a, b) => a.score - b.score)
    }

    return finalScore
}

let latestPossible = 0;
let firstImpossible = bytes.length;

while (firstImpossible - latestPossible > 1) {
    const middle = Math.trunc((firstImpossible + latestPossible) / 2);
    const isPossible = findPath(middle) > -1;
    if (isPossible) {
        latestPossible = middle;
    } else {
        firstImpossible = middle;
    }
}

const blocker = bytes[firstImpossible - 1];
console.log(`${blocker.x},${blocker.y}`)