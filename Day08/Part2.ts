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

const answer = Object
    .keys(antennas)
    .reduce((set, key) => {
        const locations = antennas[key]

        for (let i = 0; i < locations.length; i++)
        for (let j = i + 1; j < locations.length; j++) {
            const diffX = locations[i][0] - locations[j][0]; 
            const diffY = locations[i][1] - locations[j][1];

            let x = locations[i][0]
            let y = locations[i][1]

            while (grid.get(x, y).value) {
                set.add(`${x},${y}`)
                x += diffX
                y += diffY
            }

            x = locations[j][0]
            y = locations[j][1]

            while (grid.get(x, y).value) {
                set.add(`${x},${y}`)
                x -= diffX
                y -= diffY
            }
        }

        return set
    }, new Set<string>())
    .size

console.log(answer)