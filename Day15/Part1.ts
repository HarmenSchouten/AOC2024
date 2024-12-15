import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day15/input.txt");

const [gridInput, operationsInput] = input.splitDlb();

const grid = new Grid2D<string>(gridInput)
const operations = operationsInput.match(/\^|>|<|v/g)

const canPushBox = (x: number, y: number, direction: string) => {
    let foundCell;
    switch (direction) {
        case "R":  {
            foundCell = grid.findInRow(y, item => item.x > x && (item.value === "." || item.value === "#"))
            break;
        }
        case "D": {
            foundCell = grid.findInColumn(x, item => item.y > y && (item.value === "." || item.value === "#"))
            break;
        }
        case "L": {
            foundCell = grid.findLastInRow(y, item => item.x < x && (item.value === "." || item.value === "#"))
            break;
        }
        case "U": {
            foundCell = grid.findLastInColumn(x, item => item.y < y && (item.value === "." || item.value === "#"))
            break;
        }
    }

    return {
        canPush: foundCell?.value === ".",
        cell: foundCell
    }
}

operations?.forEach(operation => {

    const robotPos = grid.find(item => item.value === "@")!;
    
    switch (operation) {
        case "^": {
            const nextCell = robotPos.up()
            if (nextCell.value === "#") break;
            if (nextCell.value === "O") {
                const result = canPushBox(robotPos.x, robotPos.y, "U")
                if (result.canPush) {
                    for (let i = result.cell!.y; i < robotPos.y; i++) {
                        grid.set(robotPos.x, i, grid.get(robotPos.x, i + 1).value!)
                        grid.set(robotPos.x, i + 1, '.')
                    }
                }
            } else {
                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            }
            break;
        }
        case ">": {
            const nextCell = robotPos.right()
            if (nextCell.value === "#") break;
            if (nextCell.value === "O") {
                const result = canPushBox(robotPos.x, robotPos.y, "R")
                if (result.canPush) {
                    for (let i = result.cell!.x; i > robotPos.x; i--) {
                        grid.set(i, robotPos.y, grid.get(i - 1, robotPos.y).value!)
                        grid.set(i - 1, robotPos.y, '.')
                    }
                }
            } else {
                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            }
            break;
        }
        case "<": {
            const nextCell = robotPos.left()
            if (nextCell.value === "#") break;
            if (nextCell.value === "O") {
                const result = canPushBox(robotPos.x, robotPos.y, "L")
                if (result.canPush) {
                    for (let i = result.cell!.x; i < robotPos.x; i++) {
                        grid.set(i, robotPos.y, grid.get(i + 1, robotPos.y).value!)
                        grid.set(i + 1, robotPos.y, '.')
                    }
                }
            } else {
                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            }
            break;
        }
        case "v": {
            const nextCell = robotPos.down()
            if (nextCell.value === "#") break;
            if (nextCell.value === "O") {
                const result = canPushBox(robotPos.x, robotPos.y, "D")
                if (result.canPush) {
                    for (let i = result.cell!.y; i > robotPos.y; i--) {
                        grid.set(robotPos.x, i, grid.get(robotPos.x, i - 1).value!)
                        grid.set(robotPos.x, i - 1, '.')
                    }
                }
            } else {
                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            }
            break;
        }
    }
})

const answer = grid
    .filter(item => item.value === "O")
    .map(item => 100 * item.y + item.x)
    .sum()

console.log(answer)