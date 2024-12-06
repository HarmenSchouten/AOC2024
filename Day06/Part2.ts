import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day06/input.txt");
const grid = new Grid2D(input, v => String(v))
const start = grid.find(item => item.value === "^")!

const runRoute = (x?: number, y?: number) => {
    const visitedPositions = new Set<string>()
    const shouldDetectLoop = x !== undefined && y !== undefined
    
    if (shouldDetectLoop) grid.set(x, y, "#")
    
    let currentDirection = "U"
    let currentPosition = start
    
    while (grid.get(currentPosition.x, currentPosition.y)?.value) {
        
        const key = shouldDetectLoop
            ? `${currentPosition.x}, ${currentPosition.y}, ${currentDirection}`   
            : `${currentPosition.x}, ${currentPosition.y}, ${grid.get(currentPosition.x, currentPosition.y)?.value}`

        if (shouldDetectLoop && visitedPositions.has(key)) {
            break;
        }
        
        visitedPositions.add(key)

        switch (currentDirection) {
            case "U":
                {
                    const newPosition = currentPosition.up()            
                    if (newPosition.value === "#") currentDirection = "R"
                    else currentPosition = newPosition!
                    break;
                }
            case "R":
                {
                    const newPosition = currentPosition.right()
                    if (newPosition.value === "#") currentDirection = "D"
                    else currentPosition = newPosition!
                    break;
                }
            case "D":
                {
                    const newPosition = currentPosition.down()
                    if (newPosition.value === "#") currentDirection = "L"
                    else currentPosition = newPosition!
                    break;
                }
            case "L":
                {
                    const newPosition = currentPosition.left()
                    if (newPosition.value === "#") currentDirection = "U"
                    else currentPosition = newPosition!
                    break;
                }
        }
    }

    if (shouldDetectLoop) grid.set(x, y, '.')

    return {
        isLooping: currentPosition.value !== undefined,
        visitedPositions
    }
}

const { visitedPositions } = runRoute()

const answer = [...visitedPositions.entries()]
    .map(([item]) => item.split(", ").slice(0, 2).map(Number))
    .reduce((acc, [x, y]) => {
        if (x === start.x && y === start.y) return acc;
        if (grid.get(x, y).value === "#") return acc;
        if (runRoute(x, y).isLooping) return acc += 1;
        return acc
    }, 0)

console.log(answer)