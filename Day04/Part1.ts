import { Grid } from "../utils/grid.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day04/input.txt");

const grid = new Grid(input, (v) => String(v))

const answer = grid.cells
    .filter(item => item.value === "X")
    .flatMap(cell => {
        const neighbours = cell.getAllNeighbours(false, item => item.value === "M")
        return neighbours.map(item => ({ 
            xDiff: item.x - cell.x,
            yDiff: item.y - cell.y,
            x: cell, 
            m: item 
        }))
    })
    .filter(item => item.m !== undefined)
    .flatMap(cellXM => {
        const neighbours = cellXM.m.getAllNeighbours(false, item => 
            item.value === "A"
            && item.x === cellXM.m.x + cellXM.xDiff
            && item.y === cellXM.m.y + cellXM.yDiff)
        return neighbours.map(item => ({ ...cellXM, a: item}))
    })
    .filter(item => item.a !== undefined)
    .flatMap(cellXMA => {
        const neighbours = cellXMA.a.getAllNeighbours(false, item => 
            item.value === "S"
            && item.x === cellXMA.a.x + cellXMA.xDiff
            && item.y === cellXMA.a.y + cellXMA.yDiff)

        return neighbours.map(item => ({...cellXMA, s: item}))
    })
    .filter(item => item.s !== undefined)
    .length   

console.log(answer)