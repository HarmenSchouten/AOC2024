import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day06/input.txt");

const grid = new Grid2D(input, v => String(v))

let currentDirection = "U"
const visitedPositions = new Set<string>()
let currentPosition = grid.find(item => item.value === "^")!

while (grid.get(currentPosition.x, currentPosition.y)?.value) {

    visitedPositions.add(currentPosition.toString())
    switch (currentDirection) {
        case "U":
            {
                const newPosition = currentPosition.up();                
                if (newPosition?.value === "#") currentDirection = "R"
                else currentPosition = newPosition!
                break;
            }
        case "R":
            {
                const newPosition = currentPosition.right();
                if (newPosition?.value === "#") currentDirection = "D"
                else currentPosition = newPosition!
                break;
            }
        case "D":
            {
                const newPosition = currentPosition.down();
                if (newPosition?.value === "#") currentDirection = "L"
                else currentPosition = newPosition!
                break;
            }
        case "L":
            {
                const newPosition = currentPosition.left();
                if (newPosition?.value === "#") currentDirection = "U"
                else currentPosition = newPosition!
                break;
            }
    }
}

console.log(visitedPositions.size)