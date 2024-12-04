import { Grid } from "../utils/grid.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day04/input.txt");

const grid = new Grid(input, (v) => String(v))

const answer = grid.cells.filter(item => item.value === "A")
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
    .length

console.log(answer)
   