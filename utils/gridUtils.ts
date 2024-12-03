import "./stringUtils.ts"
import { GridCell } from "./types.ts";

declare global {
    interface String {
        toGrid<T = string>(mapper?: (value: string) => T): GridCell<T>[]
    }
}

String.prototype.toGrid = function<T>(mapper?: (value: string) => T) {
    const lines = this.splitLb()
    const grid: GridCell<T>[] = []
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        for (let x = 0; x < line.length; x++) {
            grid.push({ 
                x: x, 
                y: y, 
                value: mapper 
                    ? mapper(line[x]) 
                    : line[x] as T,
                getAdjacentNeighbours: (includeSelf = false, filterfn) => getAdjacentNeighbours(grid, x, y, includeSelf, filterfn),
                getDiagonalNeighbours: (includeSelf = false, filterfn) => getDiagonalNeighbours(grid, x, y, includeSelf, filterfn),
                getAllNeighbours: (includeSelf = false, filterfn) => [
                    ...getAdjacentNeighbours(grid, x, y, includeSelf, filterfn), 
                    ...getDiagonalNeighbours(grid, x, y, false, filterfn)
                ],
            })
        }
    }
    return grid
}

function getAdjacentNeighbours<T>(
    grid: GridCell<T>[], 
    x: number, 
    y: number, 
    includeSelf: boolean,
    filterFn?: (cell: GridCell<T> | undefined) => boolean
) {
    const items = [
        grid.find(item => item.x === x && item.y === y - 1), // top
        grid.find(item => item.x === x - 1 && item.y === y), // left
        grid.find(item => item.x === x && item.y === y + 1), // bottom
        grid.find(item => item.x === x + 1 && item.y === y), // right
    ]
    if (includeSelf) items.push(grid.find(item => item.x === x && item.y === y))
    const assertedItems = items.filter(item => item !== undefined) as GridCell<T>[]
    if (filterFn) return assertedItems.filter(item => filterFn(item))
    return assertedItems
}

function getDiagonalNeighbours<T>(
    grid: GridCell<T>[], 
    x: number, 
    y: number, 
    includeSelf: boolean,
    filterFn?: (cell: GridCell<T> | undefined) => boolean
) {
    const items = [
        grid.find(item => item.x === x - 1 && item.y === y - 1), // top left
        grid.find(item => item.x === x + 1 && item.y === y - 1), // top right
        grid.find(item => item.x === x - 1 && item.y === y + 1), // bottom left
        grid.find(item => item.x === x + 1 && item.y === y + 1), // bottom right
    ]
    if (includeSelf) items.push(grid.find(item => item.x === x && item.y === y))
    const assertedItems = items.filter(item => item !== undefined) as GridCell<T>[]
    if (filterFn) return assertedItems.filter(item => filterFn(item))
    return assertedItems
}