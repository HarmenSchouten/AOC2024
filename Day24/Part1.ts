import "../utils/index.ts"
const input = await Deno.readTextFile("./Day24/input.txt");

const [wireLines, gateLines] = input.splitDlb();

const wires = wireLines
    .splitLb()
    .reduce((acc, state) => {
        const [key, value] = state.split(': ')
        acc[key] = Number(value)
        return acc;
    }, {} as Record<string, number>)

const gates = gateLines
    .splitLb()
    .map(item => {
        const parts = item.split(" ")

        return {
            line: item,
            input1: parts[0],
            input2: parts[2],
            operator: parts[1],
            output: parts[4]
        }
    })

const visitedGates = new Set<string>()

while (visitedGates.size !== gates.length) {

    gates
        .filter(item => 
            !visitedGates.has(item.line) 
            && wires[item.input1] !== undefined 
            && wires[item.input2] !== undefined)
        .forEach(gate => {
            visitedGates.add(gate.line)

            const v1 = wires[gate.input1], v2 = wires[gate.input2]
        
            switch (gate.operator) {
                case "AND":
                    if (v1 === 1 && v2 === 1) wires[gate.output] = 1
                    else wires[gate.output] = 0
                    break;  
                case "XOR":
                    if (v1 !== v2) wires[gate.output] = 1
                    else wires[gate.output] = 0
                    break;
                case "OR":
                    if (v1 === 1 || v2 === 1) wires[gate.output] = 1;
                    else wires[gate.output] = 0
                    break;
            }
    })
}

const answerStr = Object
    .keys(wires)
    .filter(key => key.startsWith('z'))
    .sort((a, b) => a.localeCompare(b))
    .map(key => wires[key])
    .reverse()
    .join("")

const answer = parseInt(answerStr, 2)
    
console.log(answer)