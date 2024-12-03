export type GridCell<T> = {
    x: number
    y: number
    value: T
    getAdjacentNeighbours(includeSelf?: boolean, filterfn?: (cell: GridCell<T> | undefined) => boolean): (GridCell<T>)[]
    getDiagonalNeighbours(includeSelf?: boolean, filterfn?: (cell: GridCell<T> | undefined) => boolean): (GridCell<T>)[]
    getAllNeighbours(includeSelf?: boolean, filterfn?: (cell: GridCell<T> | undefined) => boolean): (GridCell<T>)[]
}

export type Point = {
    x: number
    y: number
}