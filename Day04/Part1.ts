import { Grid } from "../utils/grid.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day04/input.txt");

const grid = new Grid(input, (v) => String(v))

const xCells = grid.cells.filter(item => item.value === "X")

const answer = xCells
    .map(cell => {
        const neighbours = cell.getAllNeighbours(false, item => item.value === "M")
        return {
            x: cell,
            m: neighbours
        }
    })
    .map(cellXM => {
        return cellXM.m
            .flatMap(item => {
                const xDiff = item.x - cellXM.x.x;
                const yDiff = item.y - cellXM.x.y;

                return {
                    xDiff: xDiff,
                    yDiff: yDiff,
                    x: cellXM.x,
                    m: item,
                    a: grid.cells.find(c => c.x === item.x + xDiff && c.y === item.y + yDiff && c.value === "A")             
                }
            })
            .filter(item => item.a !== undefined)
    })
    .map(cells => {
        return cells
            .flatMap(xma => {
                return {
                    ...xma,
                    s: grid.cells.find(c => c.x === xma.a!.x + xma.xDiff && c.y === xma.a!.y + xma.yDiff && c.value === "S")
                }
            
            })
            .filter(item => item.s !== undefined)
    })
    .flatMap(combinations => combinations.map(c => `${c.x.toString()} ${c.m.toString()} ${c.a!.toString()} ${c.s!.toString()}`))
    .filter((item, idx, arr) => arr.indexOf(item) === idx)
    .length

console.log(answer)