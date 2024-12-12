import { manhattan } from "../utils/common.ts";
import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day12/input.txt");

const grid = new Grid2D<string>(input)

const regions = [] as {key: string, points: {x: number, y: number}[]} []

for (let x = 0; x < grid.width; x++)
for (let y = 0; y < grid.height; y++){
    const cell = grid.get(x, y)

    if (!cell.value) continue;

    const existingRegions = regions.filter(item => item.key === cell.value)
    if (existingRegions.length > 0) {
        const availableRegions = existingRegions.filter(item => item.points.some(item => manhattan({x: x, y: y}, {x: item.x, y: item.y}) === 1))

        if (availableRegions.length === 0) {
            regions.push({key: cell.value, points: [{x: x, y: y}]})
        } else if (availableRegions.length === 1) {
            availableRegions[0].points.push({x: x, y: y})
        } else {
            const base = availableRegions[0]
            availableRegions.slice(1).forEach(item => {
                base.points.push(...item.points)
                item.key === "-"
                item.points = []
            })
            base.points.push({x: x, y: y})
        }
    } else {
        regions.push({key: cell.value, points: [{x: x, y: y}]})
    }
}

const answer = regions
    .map(region => ({
        id: region.key,
        area: region.points.length,
        perimeter: region.points.reduce((acc, state) => {
            const cell = grid.get(state.x, state.y)
            const neighbours = cell.getAdjacentNeighbours(false, item => item.value !== cell.value)
            neighbours.forEach(n => acc.push(`${n!.x},${n!.y}`))
            return acc;
        }, [] as string[]).length
    }))
    .reduce((acc, region) => acc += (region.area * region.perimeter), 0)

console.log(answer)