import "../utils/index.ts"
const input = await Deno.readTextFile("./Day17/input.txt");
const numbers = input.match(/\d+/g)!.map(Number)
const computer = {
    a: numbers[0],
    b: numbers[1],
    c: numbers[2]
}

const program = numbers.slice(3)

let instructionPointer = 0;
const output = [] as number[];

const getComboOperand = (input: number) => {
    if (input >= 0 && input <= 3) return input;
    if (input === 4) return computer.a;
    if (input === 5) return computer.b;
    if (input === 6) return computer.c
    if (input === 7) throw new Error("Invalid?!")
}

const adv = (operand: number) => {
    const numerator = computer.a
    const denominator = Math.pow(2, getComboOperand(operand)!)
    const result = (numerator / denominator)
    return Math.trunc(result)
}

const xor = (numberA: number, numberB: number) => {
    const b1 = numberA.toString(2)
    const b2 = numberB.toString(2)
    const maxLength = Math.max(b1.length, b2.length)
    const bit1 = b1.padStart(maxLength, '0')
    const bit2 = b2.padStart(maxLength, '0')
    let out = "";
    for (let i = 0; i < maxLength; i++) {
        if (bit1[i] === "0" && bit2[i] === "0") out += 0;
        if (bit1[i] === "1" && bit2[i] === "1") out += 0
        if ((bit1[i] === "0" && bit2[i] === "1")
            || (bit1[i] === "1" && bit2[i] === "0")) out += 1
    }
    return parseInt(out, 2)
}

const runOperand = (instruction: number, operand: number) => {

    let didJump = false;
    switch (instruction) {
        case 0: 
            computer.a = adv(operand);
            break;
        case 1: 
            computer.b = xor(computer.b, operand)
            break;
        case 2:
            computer.b = getComboOperand(operand)! % 8
            break;
        case 3:
            if (computer.a === 0) break;
            didJump = true;
            instructionPointer = operand;
            break;
        case 4:
            computer.b = xor(computer.b, computer.c)
            break;
        case 5:
            output.push(getComboOperand(operand)! % 8)
            break;
        case 6:
            computer.b = adv(operand);
            break;
        case 7: 
            computer.c = adv(operand)
        
    }

    if (!didJump) instructionPointer += 2
}

while (instructionPointer < program.length - 1) {
    const instruction = program[instructionPointer]
    const operand = program[instructionPointer + 1]

    runOperand(instruction, operand)
}

console.log(output.join(","))