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
    const resS1 = s1(input)
    const resS2 = s2(resS1)
    return s3(resS2)
}

const ranges: { [key: string]: number[] } = {};
numbers.forEach(number => {
    let seed = number;
    const visited = new Set<string>();
    const changes: number[] = [];
    for (let i = 0; i < 2000; i++) {
        const next = exec(seed);
        changes.push(Number((next % 10n) - (seed % 10n)));
        seed = next;

        if (changes.length === 4) {
            const key = changes.join(',');
            if (!visited.has(key)) {
                if (ranges[key] === undefined) ranges[key] = [];
                ranges[key].push(Number((next % 10n)));
                visited.add(key);
            }
            changes.shift();
        }
    }
})

const answer = Math.max(...Object.values(ranges).map(range => range.reduce((sum, num) => sum + num, 0)));

console.log(answer)