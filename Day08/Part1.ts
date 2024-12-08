import { Grid2D } from '../utils/grid2d.ts';
import '../utils/index.ts'
const input = await Deno.readTextFile("./Day08/input.txt");

const grid = new Grid2D<string>(input)

const antennas = grid
    .filter(item => item.value != ".")
    .reduce((acc, state) => {
        if (!state.value) return acc;
        if(!acc[state.value]) {
            acc[state.value] = []
        }

        acc[state.value].push([state.x, state.y])

        return acc;
    }, {} as Record<string, number[][]>)

const answer = Object.keys(antennas)
    .reduce((set, key) => {
        const locations = antennas[key]

        for (let i = 0; i < locations.length; i++)
        for (let j = i + 1; j < locations.length; j++) {
            const antinode1 = {
                x: locations[i][0] * 2 - locations[j][0], 
                y: locations[i][1] * 2 - locations[j][1]
            }
            const antinode2 = {
                x: locations[j][0] * 2 - locations[i][0], 
                y: locations[j][1] * 2 - locations[i][1]
            }

            if (grid.get(antinode1.x, antinode1.y).value) set.add(`${antinode1.x},${antinode1.y}`)
            if (grid.get(antinode2.x, antinode2.y).value) set.add(`${antinode2.x},${antinode2.y}`)
        }

        return set
    }, new Set<string>())
    .size

console.log(answer)