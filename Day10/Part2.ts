import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day10/input.txt");

const grid = new Grid2D<number>(input, (v) => Number(v))

const trailheads = grid.filter(item => item.value === 0)

const answer = trailheads.reduce((acc, state) => {

    const queue = [{x: state.x, y: state.y, length: 0}]
    const trailEnds = [] as string[]

    while (queue.length > 0) {

        const current = queue
            .sort((a, b) => b.length - a.length)
            .shift()

        if (!current) break;

        const cell = grid.get(current.x, current.y)!
        const validNeighbours = cell.getAdjacentNeighbours(false, item => item.value !== undefined && item.value - cell.value! === 1)

        if (validNeighbours.length === 0) continue;

        validNeighbours.forEach(item => {
            if (item?.value === 9) trailEnds.push(`${item!.x},${item!.y}`)
            queue.push({x: item!.x, y: item!.y, length: current.length + 1})
        })
    }

    return acc + trailEnds.length
}, 0) 

console.log(answer)