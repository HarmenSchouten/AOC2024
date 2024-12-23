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

const nodes = Object.keys(graph)
const parties = [] as string[][]

const algo = (r: string[], p: string[], x: string[]) => {
    if (p.length === 0 && x.length === 0) {
        if (r.length >= 1 && r.length <= Number.MAX_SAFE_INTEGER) {
            parties.push(r)
        }
        return
    } else {
        const pivot = p.concat(x)[0]
        const pNeighbours = graph[pivot]

        for (const node of p.filter(n => !pNeighbours.has(n))) {
            algo(
                [...r, node],
                p.filter(n => graph[node].has(n)),
                p.filter(n => graph[node].has(n))
            )
            p = p.filter(n => n !== node)
            x.push(node)
        }
    }
}

algo([], nodes, [])
const largestClique = parties.reduce((max, clique) => (clique.length > max.length ? clique : max), [])
const largestCliqueNames = largestClique.sort((a, b) => a.localeCompare(b))
const result = largestCliqueNames.join(',')

console.log(result)