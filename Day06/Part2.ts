import { Grid } from "../utils/grid.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day06/input.txt");

const grid = new Grid(input, v => String(v))
const start = grid.cells.find(item => item.value === "^")!;

const runRoute = (x?: number, y?: number) => {
    const shouldDetectLoop = x !== undefined && y !== undefined

    if (shouldDetectLoop) {
        grid.updateCell(x, y, "#")
    }

    let currentDirection = "U"
    const visitedPositions = new Set<string>()
    let currentPosition = grid.cells.find(item => item.value === "^")!

    while (currentPosition !== undefined) {

        const key = shouldDetectLoop
            ? `${currentPosition.x}, ${currentPosition.y}, ${currentDirection}`   
            : currentPosition.toString()

        if (shouldDetectLoop && visitedPositions.has(key)) {
            break;
        }
        
        visitedPositions.add(key)

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

    if (shouldDetectLoop) {
        grid.updateCell(x, y, ".")
    }

    return {
        isLooping: currentPosition !== undefined,
        visitedPositions
    }
}

const { visitedPositions } = runRoute()

const answer = [...visitedPositions.entries()]
    .map(([item]) => item.split(", ").slice(0, 2).map(Number))
    .reduce((acc, [x, y]) => {
        const isStart = x === start.x && y === start.y
        if (isStart) return acc;

        const isWall = grid.cells.find(cell => cell.x === x && cell.y === y)?.value === "#"
        if (isWall) return acc;

        if (runRoute(x, y).isLooping) {
            return acc + 1;
        }
        
        return acc
    }, 0)

console.log(answer)