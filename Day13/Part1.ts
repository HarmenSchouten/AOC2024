import "../utils/index.ts"
const input = await Deno.readTextFile("./Day13/input.txt");


const answer = input
    .splitDlb()
    .map(item => {
        const [a, b, prize] = item.splitLb()

        const aInts = a.match(/\d+/g)!
        const bInts = b.match(/\d+/g)!
        const prizeInts = prize.match(/\d+/g)!
        return {
            a: { x: Number(aInts[0]), y: Number(aInts[1]) },
            b: { x: Number(bInts[0]), y: Number(bInts[1]) },
            prize: { x: Number(prizeInts[0]), y: Number(prizeInts[1]) },
        }
    })
    .reduce((acc, state) => {
        const determinator = state.a.x * state.b.y - state.a.y * state.b.x;
        const distA = state.prize.x * state.b.y - state.prize.y * state.b.x;
        const distB = state.prize.y * state.a.x - state.prize.x * state.a.y;

        const isValid = distA % determinator === 0 
            && distB % determinator === 0 
            && Math.floor(distA / determinator) >= 0 
            && Math.floor(distB / determinator) >= 0
        
        if (!isValid) return acc;
        return acc + Math.floor((3 * distA + distB) / determinator);
    }, 0)

console.log(answer)