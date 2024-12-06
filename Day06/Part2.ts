import "../utils/index.ts"
const input = await Deno.readTextFile("./Day06/input.txt");

const grid = input.splitLb().map(line => line.split(""))
const startY = grid.findIndex(y => y.includes("^"))!
const startX = grid[startY].indexOf("^")

const runRoute = (x?: number, y?: number) => {
    
    const shouldDetectLoop = x !== undefined && y !== undefined
    
    if (shouldDetectLoop) {
        grid[y][x] = "#"
    }
    
    let currentDirection = "U"
    const visitedPositions = new Set<string>()
    let currentPosition = [startX, startY]
    
    while (grid[currentPosition[1]]?.[currentPosition[0]]) {
        
        const key = shouldDetectLoop
            ? `${currentPosition[0]}, ${currentPosition[1]}, ${currentDirection}`   
            : `${currentPosition[0]}, ${currentPosition[1]}, ${grid[currentPosition[1]][currentPosition[0]]}`

        if (shouldDetectLoop && visitedPositions.has(key)) {
            break;
        }
        
        visitedPositions.add(key)

        switch (currentDirection) {
            case "U":
                {
                    const newPosition = [currentPosition[0], currentPosition[1] - 1]            
                    if (grid?.[newPosition[1]]?.[newPosition[0]] === "#") currentDirection = "R"
                    else currentPosition = newPosition!
                    break;
                }
            case "R":
                {
                    const newPosition = [currentPosition[0] + 1, currentPosition[1]]
                    if (grid?.[newPosition[1]]?.[newPosition[0]] === "#") currentDirection = "D"
                    else currentPosition = newPosition!
                    break;
                }
            case "D":
                {
                    const newPosition = [currentPosition[0], currentPosition[1] + 1]
                    if (grid?.[newPosition[1]]?.[newPosition[0]] === "#") currentDirection = "L"
                    else currentPosition = newPosition!
                    break;
                }
            case "L":
                {
                    const newPosition = [currentPosition[0] - 1, currentPosition[1]]
                    if (grid?.[newPosition[1]]?.[newPosition[0]] === "#") currentDirection = "U"
                    else currentPosition = newPosition!
                    break;
                }
        }
    }

    if (shouldDetectLoop) {
        grid[y][x] = "."
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
        const isStart = x === startX && y === startY
        if (isStart) return acc;

        const isWall = grid[y][x] === "#"
        if (isWall) return acc;

        if (runRoute(x, y).isLooping) {
            return acc + 1;
        }
        
        return acc
    }, 0)

console.log(answer)