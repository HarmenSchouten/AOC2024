import "../utils/index.ts"
const input = await Deno.readTextFile("./Day22/input.txt");
const numbers = input.splitLb().map(BigInt)

const mul64 = (a: bigint) => a * BigInt(64)
const mul2048 = (a: bigint) => a * BigInt(2048)
const div = (a: bigint) => BigInt(Math.floor(Number(a) /32))
const mix = (a: bigint, b: bigint) => a ^ b
const mod = (a: bigint) => a % BigInt(16777216)

const s1 = (input: bigint) => {
    const b = mul64(input)
    const c = mix(input, b)
    return mod(c)
}

const s2 = (input: bigint) => {
    const b = div(input)
    const c = mix(input, b)
    return mod(c)
}

const s3 = (input: bigint) => {
    const b = mul2048(input)
    const c = mix(input, b)
    return mod(c)
}

const exec = (input: bigint) => {
    let number = BigInt(input)
    for (let i = 0; i < 2000; i++){
        const resS1 = s1(number)
        const resS2 = s2(resS1)
        number = s3(resS2)
    }
    return number    
}

const answer = numbers.reduce((acc, state) => {
    const x = exec(state)
    console.log(x)
    return acc += x
}, 0n)

console.log(answer)