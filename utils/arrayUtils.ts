import { lcm } from "./common.ts";

declare global {
    interface Array<T> {
        /** Gets the sum of all integers in an array */
        sum(): number
        /** Gets the product of all integers in an array */
        product(): number
        /** Splits an array into chunks of a given size */
        chunk(size: number): Array<Array<T>>
        /** Gets the lowest common multiply of the given set of numbers */
        lcm(): number
    }
}

Array.prototype.sum = function () {
    if (this.every((value) => typeof value === 'number')) {
        return this.reduce((acc, state) => acc += state, 0)
    }
    throw new Error("This array does not contain only numbers")
}

Array.prototype.product = function () {
    if (this.every((value) => typeof value === 'number')) {
        return this.reduce((acc, state) => acc *= state, 1)
    }
    throw new Error("This array does not contain only numbers")
}

Array.prototype.chunk = function (size: number) {
    const chunks = []
    for (let i = 0; i < this.length; i += size) {
        chunks.push(this.slice(i, i + size))
    }
    return chunks
}

Array.prototype.lcm = function () {
    if (!this.every((value) => typeof value === 'number')) {
        throw new Error("This array does not contain only numbers")
    }

    let result = this[0];
    for (let i = 1; i < this.length; i++) {
        result = lcm(result, this[i]);
    }
    return result;
}