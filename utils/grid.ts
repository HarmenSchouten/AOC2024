import "./stringUtils.ts"
import { GridCell } from "./gridCell.ts";

/** A grid of cells with a given value */
export class Grid<T> {

    /** The width of the grid */
    public width = 0
    /** The height of the grid */
    public height = 0
    /** The cells in the grid */
    public cells: GridCell<T>[] = []

    /** Initialize a grid from a string, with a possible mapper for the value */
    constructor(input: string, mapper?: (value: string) => T) {
        const items = [] as GridCell<T>[]
        const lines = input.splitLb();
        this.height = lines.length;
        this.width = lines[0].length;
        for (let y = 0; y < lines.length; y++) {
            const line = lines[y]
            for (let x = 0; x < line.length; x++) {
                items.push(new GridCell(this, x, y, mapper ? mapper(line[x]) : line[x] as T))
            }
        }
        this.cells = items
    }

    /** Transpose the grid by rotating it to the right over its center */
    transposeRight() {
        const width = this.width;
        const height = this.height;

        const centerX = (width - 1) / 2
        const centerY = (height - 1) / 2

        const items = [] as GridCell<T>[]
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            const newX = centerX - (cell.y - centerY);
            const newY = centerY + (cell.x - centerX);
            items.push({ ...cell, x: newX, y: newY, value: cell.value } as GridCell<T>)
        }
        
        this.cells = items;
        this.width = height;
        this.height = width;
    }

    /** Transpose the grid by rotating it to the left over its center */
    transposeLeft() {
        const width = this.width;
        const height = this.height;

        const centerX = (width - 1) / 2
        const centerY = (height - 1) / 2
        const items = [] as GridCell<T>[]
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            const newX = centerX + (cell.y - centerY);
            const newY = centerY - (cell.x - centerX);
            items.push({ ...cell, x: newX, y: newY, value: cell.value } as GridCell<T>)
        }

        this.cells = items;
        this.width = height;
        this.height = width;
    }

    /** Update the value of a cell at a specific x, y coordinate */
    updateCell(x: number, y: number, value: T) {
        const cellIndex = this.cells.findIndex(c => c.x === x && c.y === y)
        if (cellIndex === -1) return;
        this.cells.splice(cellIndex, 1, new GridCell(this, x , y, value))
    }

    /** Convert the grid back to a string representation */
    toString() {
        let output = "";
        for (let y = 0; y < this.height; y++) {
            const row = this.cells.filter(c => c.y === y).sort((a, b) => a.x - b.x)
            output += row.map(c => c.value).join("")
            output += "\n"
        }
        return output;
    }
}