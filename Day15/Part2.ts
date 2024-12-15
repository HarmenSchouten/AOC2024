import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./Day15/input.txt");

const [gridInput, operationsInput] = input.splitDlb();

const updatedGridInput = gridInput
    .replaceAll("#", "##")
    .replaceAll(".", "..")
    .replaceAll("@", "@.")
    .replaceAll("O", "[]")

const grid = new Grid2D<string>(updatedGridInput)
const operations = operationsInput.match(/\^|>|<|v/g)

const getBox = (x: number, y: number) => {
    const cell = grid.get(x, y)
    if (cell.value === "]") {
        return {left: grid.get(x - 1, y), right: cell}
    } else if (cell.value === "[") {
        return {left: cell, right: grid.get(x + 1, y)}
    } else if (cell.value === ".") {
        return {isEmpty: true}
    } else {
        return {isWall: true}
    }
}

operations?.forEach(operation => {

    const robotPos = grid.find(item => item.value === "@")!;
    
    switch (operation) {
        case ">": {
            const nextCell = robotPos.right()
            if (nextCell.value === "#") break;
            if (nextCell.value === "[") {
                const rowResult = grid.findInRow(
                    robotPos.y, 
                    item => item.x > robotPos.x && (item.value === "." || item.value === "#"))
                
                if (rowResult?.value === ".") {
                    for (let i = rowResult.x; i > robotPos.x; i--) {
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
            if (nextCell.value === "]") {
                const rowResult = grid.findLastInRow(
                    robotPos.y, 
                    item => item.x < robotPos.x && (item.value === "." || item.value === "#"))
                
                if (rowResult?.value === '.') {
                    for (let i = rowResult.x; i < robotPos.x; i++) {
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
        case "^": {
            const nextCell = robotPos.up()
            if (nextCell.value === "#") break;
            if (nextCell.value === "[" || nextCell.value === "]") {
                
                const box = getBox(nextCell.x, nextCell.y)

                let canMove = true;
                const boxes = []
                const boxQueue = [[box.left!, box.right!]]

                while (boxQueue.length > 0 && canMove) {
                    const box = boxQueue.shift()!
                    const left = box[0], right = box[1]
                    boxes.push({left: left, right: right})

                    const above1 = left.up(), above2 = right.up()
                    const v1 = getBox(above1.x, above2.y), v2 = getBox(above2.x, above2.y)

                    if (v1.isWall || v2.isWall) {
                        canMove = false;
                        break;
                    }

                    if (v1.left && v1.right) boxQueue.push([v1.left, v1.right])
                    if (v2.left && v2.right) boxQueue.push([v2.left, v2.right])
                }

                if (!canMove) break;

                boxes
                    .reverse()
                    .forEach(box => {
                        grid.set(box.left.x, box.left.y - 1, box.left.value!)
                        grid.set(box.right.x, box.right.y - 1, box.right.value!)

                        grid.set(box.left.x, box.left.y, '.')
                        grid.set(box.right.x, box.right.y, '.')
                    })

                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            } else {
                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            }
            break;
        }
        case "v": {
            const nextCell = robotPos.down()
            if (nextCell.value === "#") break;
            if (nextCell.value === "[" || nextCell.value === "]") {
                
                const box = getBox(nextCell.x, nextCell.y)

                let canMove = true;
                const boxes = []
                const boxQueue = [[box.left!, box.right!]]

                while (boxQueue.length > 0 && canMove) {
                    const box = boxQueue.shift()!
                    const left = box[0], right = box[1]
                    boxes.push({left: left, right: right})

                    const down1 = left.down(), down2 = right.down()
                    const v1 = getBox(down1.x, down2.y), v2 = getBox(down2.x, down2.y)

                    if (v1.isWall || v2.isWall) {
                        canMove = false;
                        break;
                    }

                    if (v1.left && v1.right) boxQueue.push([v1.left, v1.right])
                    if (v2.left && v2.right) boxQueue.push([v2.left, v2.right])
                }

                if (!canMove) break;

                boxes
                    .reverse()
                    .forEach(box => {
                        grid.set(box.left.x, box.left.y + 1, box.left.value!)
                        grid.set(box.right.x, box.right.y + 1, box.right.value!)

                        grid.set(box.left.x, box.left.y, '.')
                        grid.set(box.right.x, box.right.y, '.')
                    })

                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            } else {
                grid.set(nextCell.x, nextCell.y, '@')
                grid.set(robotPos.x, robotPos.y, '.')
            }
            break;
        }
    }
})

const answer = grid
    .filter(item => item.value === "[")
    .map(item => 100 * item.y + item.x)
    .sum()

console.log(answer)