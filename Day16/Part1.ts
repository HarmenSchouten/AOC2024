import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day16/input.txt");

const grid = new Grid2D<string>(input)

const start = grid.find(item => item.value === "S")!
const end = grid.find(item => item.value === "E")!

const queue = [{x: start.x, y: start.y, direction: 'R', score: 0}]
const visitedCells = new Set<string>()

while (true) {
    const current = queue.pop()
    
    if (!current) break;
    visitedCells.add(`${current.x},${current.y},${current.direction}`)

    if (current.x === end.x && current.y === end.y) {
        console.log(current.score)
        break;
    }

    const cell = grid.get(current.x, current.y)

    const options = []
    switch (current.direction) {
        case "R": 
            options.push(
                {direction: "R", cell: cell.right(), score: 1},
                {direction: "U", cell: cell.up(), score: 1001},
                {direction: "D", cell: cell.down(), score: 1001},
            )
            break;
        case "U": 
            options.push(
                {direction: "R", cell: cell.right(), score: 1001},
                {direction: "U", cell: cell.up(), score: 1},
                {direction: "L", cell: cell.left(), score: 1001},
            )
            break;
        case "D": 
            options.push(
                {direction: "R", cell: cell.right(), score: 1001},
                {direction: "D", cell: cell.down(), score: 1},
                {direction: "L", cell: cell.left(), score: 1001},
            )
            break;
        case "L": 
            options.push(
                {direction: "L", cell: cell.left(), score: 1},
                {direction: "U", cell: cell.up(), score: 1001},
                {direction: "D", cell: cell.down(), score: 1001},
            )
            break;
    }

    options
        .filter(item => (item.cell.value === "." || item.cell.value === "E"))
        .forEach(option => {
            if (visitedCells.has(`${option.cell.x},${option.cell.y},${option.direction}`)) return

            const totalScore = current.score + option.score
            queue.push({x: option.cell.x, y: option.cell.y, score: totalScore, direction: option.direction})
    })

    queue.sort((a, b) => b.score - a.score)
}