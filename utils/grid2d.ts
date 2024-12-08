export class Grid2D<T = string> {

    public height = 0;
    public width = 0;
    public cells: T[][] = [];

    constructor(input: string, mapper?: (v: string) => T) {
        const lines = input.splitLb();
        this.cells = lines.map(line => line.split("").map(v => mapper ? mapper(v) : v as T));
        this.height = lines.length;
        this.width = lines[0].length;
    }

    /**
     * Find a cell that matches the predicate. Returns the first match
     * @param predicate The predicate to match
     * @returns A gridcell object if the predicate matches, otherwise undefined
     */
    find(predicate: (cell: Grid2DCell<T>) => boolean): Grid2DCell<T> | undefined {
        for (let y = 0; y < this.height; y++)
        for (let x = 0; x < this.width; x++) {
            const cell = this.get(x, y);
            if (predicate(cell)) {
                return cell;
            }
        }
    }

    /**
     * Find the last cell that matches the predicate. Returns the last match
     * @param predicate The predicate to match
     * @returns A gridcell object if the predicate matches, otherwise undefined
     */
    findLast(predicate: (cell: Grid2DCell<T>) => boolean): Grid2DCell<T> | undefined {
        for (let y = this.height - 1; y >= 0; y--)
        for (let x = this.width - 1; x >= 0; x--) {
            const cell = this.get(x, y);
            if (predicate(cell)) {
                return cell;
            }
        }
    }

    /**
     * Find all cells that match the predicate.
     * @param predicate The predicate to match
     * @returns An array of gridcell objects that match the predicate
     */
    filter(predicate: (cell: Grid2DCell<T>) => boolean): Grid2DCell<T>[] {
        const result: Grid2DCell<T>[] = [];
        for (let y = 0; y < this.height; y++)
        for (let x = 0; x < this.width; x++) {
            const cell = this.get(x, y);
            if (predicate(cell)) {
                result.push(cell);
            }
        }
        return result;
    }

    /**
     * Find the first cell in a specific column that matches the predicate. Returns the first match
     * @param column Index of the column to search in
     * @param predicate The predicate to match
     * @returns A gridcell object if the predicate matches, otherwise undefined
     */
    findInColumn(column: number, predicate: (cell: Grid2DCell<T>) => boolean): Grid2DCell<T> | undefined {
        for (let y = 0; y < this.height; y++) {
            const cell = this.get(column, y);
            if (predicate(cell)) {
                return cell;
            }
        }
    }

    /**
     * Find the last cell in a specific column that matches the predicate. Returns the last match
     * @param column Index of the column to search in
     * @param predicate The predicate to match
     * @returns A gridcell object if the predicate matches, otherwise undefined
     */
    findLastInColumn(column: number, predicate: (cell: Grid2DCell<T>) => boolean): Grid2DCell<T> | undefined {
        for (let y = this.height - 1; y >= 0; y--) {
            const cell = this.get(column, y);
            if (predicate(cell)) {
                return cell;
            }
        }
    }

    /**
     * Find the first cell in a specific row that matches the predicate. Returns the first match
     * @param row Index of the row to search in
     * @param predicate The predicate to match
     * @returns A gridcell object if the predicate matches, otherwise undefined
     */
    findInRow(row: number, predicate: (cell: Grid2DCell<T>) => boolean): Grid2DCell<T> | undefined {
        for (let x = 0; x < this.width; x++) {
            const cell = this.get(x, row);
            if (predicate(cell)) {
                return cell;
            }
        }
    }

    /**
     * Find the last cell in a specific row that matches the predicate. Returns the last match
     * @param row Index of the row to search in
     * @param predicate The predicate to match
     * @returns A gridcell object if the predicate matches, otherwise undefined
     */
    findLastInRow(row: number, predicate: (cell: Grid2DCell<T>) => boolean): Grid2DCell<T> | undefined {
        for (let x = this.width - 1; x >= 0; x--) {
            const cell = this.get(x, row);
            if (predicate(cell)) {
                return cell;
            }
        }
    }

    /**
     * Update the value of a cell
     * @param x The x coordinate
     * @param y The y coordinate
     * @param value The new value
     */
    set(x: number, y: number, value: T) {
        this.cells[y][x] = value;
    }

    /**
     * Get a cell at the specified coordinates. Always returns a cell, even if the coordinates are out of bounds.
     * The value might be undefined in that case.
     * @param x The requested x coordinate
     * @param y The requested y coordinate
     * @returns A GridCell object with the requested coordinates and if available, the value at that position
     */
    get(x: number, y: number) {
        return new Grid2DCell<T>(this, x, y, this.cells?.[y]?.[x]);
    }

    /**
     * Transpose the grid to the right. This will rotate the grid 90 degrees clockwise
     */
    transposeRight() {
        const newCells = [] as T[][];
        for (let x = 0; x < this.width; x++) {
            newCells.push([]);
            for (let y = 0; y < this.height; y++) {
                newCells[x].push(this.cells[this.height - y - 1][x]);
            }
        }
        this.cells = newCells;
        this.width = this.cells[0].length;
        this.height = this.cells.length;
    }

    /**
     * Transpose the grid to the left. This will rotate the grid 90 degrees counter-clockwise
     */
    transposeLeft() {
        const newCells = [] as T[][];
        for (let x = 0; x < this.width; x++) {
            newCells.push([]);
            for (let y = 0; y < this.height; y++) {
                newCells[x].push(this.cells[y][this.width - x - 1]);
            }
        }
        this.cells = newCells;
        this.width = this.cells[0].length;
        this.height = this.cells.length;
    }
    
    /**
     * Flip the grid horizontally
     */
    flipHorizontal() {
        this.cells = this.cells.map(row => row.reverse());
    }
    
    /**
     * Flip the grid vertically
     */
    flipVertical() {
        this.cells = this.cells.reverse();
    }
}

/**
 * Represents a cell in a 2D grid
 * @typeParam T The type of the value stored in the cell
 * */
export class Grid2DCell<T = string> {

    public x: number;
    public y: number;
    public value?: T;

    private grid: Grid2D<T>;

    constructor(
        grid: Grid2D<T>,
        x: number,
        y: number,
        value?: T
    ) {
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.value = value;
    }

    /**
     * Get the cell to the left of this cell
     * @returns The cell to the left of this cell
     */
    left() {
        return this.grid.get(this.x - 1, this.y);
    }

    /**
     * Get the cell to the right of this cell
     * @returns The cell to the right of this cell
     */
    right() {
        return this.grid.get(this.x + 1, this.y);
    }

    /**
     * Get the cell above this cell
     * @returns The cell above this cell
     */
    up() {
        return this.grid.get(this.x, this.y - 1);
    }

    /**
     * Get the cell below this cell
     * @returns The cell below this cell
     */
    down() {
        return this.grid.get(this.x, this.y + 1);
    }

    /**
     * Get the adjacent neighbours of this cell
     * @param includeSelf Whether to include the current cell in the result
     * @param filterfn A filter function to filter the results
     * @returns An array of adjacent neighbours
     */
    getAdjacentNeighbours(includeSelf = false, filterfn?: (cell: Grid2DCell<T>) => boolean) {
        return [
            includeSelf ? this : undefined,
            this.up(),
            this.right(),
            this.down(),
            this.left()
        ].filter(cell => cell && (!filterfn || filterfn(cell)));
    }

    /**
     * Get the diagonal neighbours of this cell
     * @param includeSelf Whether to include the current cell in the result
     * @param filterfn A filter function to filter the results
     * @returns An array of diagonal neighbours
     */
    getDiagonalNeighbours(includeSelf = false, filterfn?: (cell: Grid2DCell<T>) => boolean) {
        return [
            includeSelf ? this : undefined,
            this.up()?.left(),
            this.up()?.right(),
            this.down()?.left(),
            this.down()?.right()
        ].filter(cell => cell && (!filterfn || filterfn(cell)));
    }

    /**
     * Get all neighbours of this cell
     * @param includeSelf Whether to include the current cell in the result
     * @param filterfn A filter function to filter the results
     * @returns An array of all neighbours
     */
    getAllNeighbours(includeSelf = false, filterfn?: (cell: Grid2DCell<T>) => boolean) {
        return [
            ...this.getAdjacentNeighbours(includeSelf, filterfn),
            ...this.getDiagonalNeighbours(false, filterfn)
        ];
    }

    /**
     * Get a string representation of this cell
     * @returns A string representation of this cell
     */
    toString() {
        return `${this.x}, ${this.y}, [${this.value}]`;
    }

    /**
     * Convert this cell to a JSON object
     * @returns An object representing this cell
     */
    toJSON() {
        return { x: this.x, y: this.y, value: this.value }
    }
}