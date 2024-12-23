import "../utils/index.ts"
const input = await Deno.readTextFile("./Day23/input.txt");

const graph = {} as Record<string, Set<string>>
input
    .splitLb()
    .forEach(c => {
        const [left, right] = c.split("-")
        if (!graph[left]) graph[left] = new Set<string>()
        if (!graph[right]) graph[right] = new Set<string>()
        graph[left].add(right)
        graph[right].add(left)
    })

const threeConnect = new Set<string>()

for (const node in graph) {
    const adjacents = Array.from(graph[node])

    for (let i = 0; i < adjacents.length; i++) {
        for (let j = i + 1; j < adjacents.length; j++) {
            const n1 = adjacents[i]
            const n2 = adjacents[j]

            if (graph[n1].has(n2)) {
                const triangle = [node, n1, n2].sort()
                threeConnect.add(triangle.join(','))
            }
        }
    }
}

const result = Array
    .from(threeConnect)
    .filter(t => t.split(",").some(n => n.startsWith('t')))

console.log(result.length)