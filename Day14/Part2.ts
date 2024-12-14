import "../utils/index.ts"
const input = await Deno.readTextFile("./Day14/input.txt");

const gridWidth = 101;
const gridHeight = 103;

const bots = input
    .splitLb()
    .map(item => {
        const [px, py, vx, vy] = item.match(/-*\d+/g)!.map(Number)
        return {
            position: { x: px, y: py },
            velocity: { x: vx, y: vy }
        }
    })

let botsCopy = bots.slice()
let i = 0;
while (true) {
    botsCopy = botsCopy.map(bot => {
        let newX = bot.position.x + bot.velocity.x
        if (newX > gridWidth) newX -= gridWidth
        if (newX < 0) newX += gridWidth
        
        let newY = (bot.position.y + bot.velocity.y)
        if (newY > gridHeight) newY -= gridHeight
        if (newY < 0) newY += gridHeight 
        return {...bot, position: {x: newX, y: newY}}
    })
    i++

    const positions = new Set()
    botsCopy.forEach(bot => positions.add(`${bot.position.x},${bot.position.y}`))
    
    if (positions.size === botsCopy.length) {
        console.log(i)
        for (let y = 0; y < gridHeight; y++) {
            const items = []
            for (let x = 0; x < gridWidth; x++) {
                const hasBots = botsCopy.filter(bot => bot.position.x === x && bot.position.y === y)
                if (hasBots.length > 0) items.push('#')
                else items.push(" ")
            }
            console.log(items.join(""))
        }
        break;
    }
}
