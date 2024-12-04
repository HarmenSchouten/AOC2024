import { Grid } from "../utils/grid.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day04/input.txt");

const grid = new Grid(input, (v) => String(v))

const aCells = grid.cells.filter(item => item.value === "A")

const answer = aCells
    .map(cell => {
        return {
            center: cell,
            upperLeft: cell.up()?.left(),
            upperRight: cell.up()?.right(),
            lowerLeft: cell.down()?.left(),
            lowerRight: cell.down()?.right()
        }
    })
    .filter(item => item.upperLeft && item.upperRight && item.lowerLeft && item.lowerRight)
    .filter(item => {
        return ((item.upperLeft!.value === "S" && item.lowerRight!.value === "M")
            || (item.upperLeft!.value === "M" && item.lowerRight!.value === "S")) 
            && ((item.upperRight!.value === "S" && item.lowerLeft!.value === "M")
            || (item.upperRight!.value === "M" && item.lowerLeft!.value === "S"))
    })
    .map(item => ({
        ...item,
        key: `${item.center.toString()}${item.upperLeft!.toString()}${item.upperRight!.toString()}${item.lowerLeft!.toString()}${item.lowerRight!.toString()}`
    }))
    .filter((item, idx, arr) => arr.findIndex(i => i.key === item.key) === idx)
    .map(item => ({
        ...item,
        values: `${item.center.value}${item.upperLeft!.value}${item.upperRight!.value}${item.lowerLeft!.value}${item.lowerRight!.value}`
    }))
    .filter(item => {
        const aCount = [...item.values].filter(item => item === "A").length
        const mCount = [...item.values].filter(item => item === "M").length
        const sCount = [...item.values].filter(item => item === "S").length

        return aCount === 1 && mCount === 2 && sCount === 2
    })    
    .length

console.log(answer)
   