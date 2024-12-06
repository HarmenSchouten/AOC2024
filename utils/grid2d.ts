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

    find(predicate: (cell: GridCell<T>) => boolean): GridCell<T> | undefined {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.get(x, y);
                if (predicate(cell)) {
                    return cell;
                }
            }
        }
    }

    set(x: number, y: number, value: T) {
        this.cells[y][x] = value;
    }

    get(x: number, y: number) {
        return new GridCell<T>(this, x, y, this.cells?.[y]?.[x]);
    }

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
    
    flipHorizontal() {
        this.cells = this.cells.map(row => row.reverse());
    }

    flipVertical() {
        this.cells = this.cells.reverse();
    }
}

class GridCell<T = string> {

    public x: number;
    public y: number;
    public value: T;

    private grid: Grid2D<T>;

    constructor(
        grid: Grid2D<T>,
        x: number,
        y: number,
        value: T
    ) {
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.value = value;
    }

    left() {
        return this.grid.get(this.x - 1, this.y);
    }

    right() {
        return this.grid.get(this.x + 1, this.y);
    }

    up() {
        return this.grid.get(this.x, this.y - 1);
    }

    down() {
        return this.grid.get(this.x, this.y + 1);
    }

    getAdjacentNeighbours(includeSelf = false, filterfn?: (cell: GridCell<T>) => boolean) {
        return [
            includeSelf ? this : undefined,
            this.up(),
            this.right(),
            this.down(),
            this.left()
        ].filter(cell => cell && (!filterfn || filterfn(cell)));
    }

    getDiagonalNeighbours(includeSelf = false, filterfn?: (cell: GridCell<T>) => boolean) {
        return [
            includeSelf ? this : undefined,
            this.up()?.left(),
            this.up()?.right(),
            this.down()?.left(),
            this.down()?.right()
        ].filter(cell => cell && (!filterfn || filterfn(cell)));
    }

    getAllNeighbours(includeSelf = false, filterfn?: (cell: GridCell<T>) => boolean) {
        return [
            ...this.getAdjacentNeighbours(includeSelf, filterfn),
            ...this.getDiagonalNeighbours(false, filterfn)
        ];
    }

    toString() {
        return `${this.x}, ${this.y}, [${this.value}]`;
    }

    toJSON() {
        return { x: this.x, y: this.y, value: this.value }
    }
}