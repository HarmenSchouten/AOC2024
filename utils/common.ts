import { Point } from "./types.ts";

// Calculate GCD using Euclidean algorithm
export const gcd = (a: number, b: number): number => {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Calculate LCM of two numbers
export const lcm = (a: number, b: number): number => {
    const gcdAB = gcd(a, b);
    return (a * b) / gcdAB;
}

export function memoize<Args extends unknown[], Result>(
    func: (...args: Args) => Result,
): (...args: Args) => Result {
    const stored = new Map<string, Result>();

    return (...args) => {
        const k = JSON.stringify(args);
        if (stored.has(k)) {
            return stored.get(k)!;
        }
        const result = func(...args);
        stored.set(k, result);
        return result;
    };
}

/**
 * Get the manhattan distance between two points
 * @param a Point A
 * @param b Point B
 * @returns The manhattan distance between the two points
 */
export const manhattan = (a: Point, b: Point) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 * Get the euclidean distance between two points
 * @param a Point A
 * @param b Point B
 * @returns The euclidean distance between the two points
 */
export const euclidean = (a: Point, b: Point) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**
 * Get the area of a polygon using the shoelace formula
 * @param array An array of points that make up the polygon
 * @param modifier An optional modifier to apply to the sum before returning
 * @returns The area of the polygon
 */
export const shoelace = (array: Point[], modifier?: number) => {

    const copy = [...array.slice(1), array[0]];
    const sum = array.reduce((acc, curr, i) => {
        return acc + ((curr.x * copy[i].y) - (copy[i].x * curr.y));
    }, 0);

    return Math.floor((Math.abs(sum) - (modifier ?? 0)) / 2);
}

/**
 * Get the number of inner boundaries of a polygon using Pick's theorem
 * @param array An array of points that make up the polygon
 * @param modifier An optional modifier to apply to the sum before returning
 * @returns The number of inner boundaries of the polygon
 */
export const picksTheoremInnerBoundaries = (array: Point[], modifier?: number) => {
    const area = shoelace(array, modifier);
    return area + 1
}