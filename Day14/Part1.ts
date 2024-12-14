import "../utils/index.ts"
const input = await Deno.readTextFile("./Day14/input.txt");

const gridWidth = 101;
const gridHeight = 103;
const seconds = 100;

const bots = input
    .splitLb()
    .map(item => {
        const [px, py, vx, vy] = item.match(/-*\d+/g)!.map(Number)
        return {
            position: { x: px, y: py },
            velocity: { x: vx, y: vy }
        }
    })
    .reduce((acc, bot) => {
        const newX = bot.position.x + (bot.velocity.x * seconds)
        const posX = newX - Math.floor(newX / gridWidth) * gridWidth

        const newY = (bot.position.y + (bot.velocity.y * seconds))
        const posY = newY - Math.floor(newY / gridHeight) * gridHeight

        acc.push({x: posX, y: posY})
        return acc;
    }, [] as {x: number, y: number}[])

const q1 = bots.filter(item => 
    item.x >= 0 && item.x < Math.floor(gridWidth / 2)
    && item.y >= 0 && item.y < Math.floor(gridHeight / 2)).length

const q2 = bots.filter(item => 
    item.x >= Math.ceil(gridWidth / 2) && item.x <= gridWidth
    && item.y >= 0 && item.y < Math.floor(gridHeight / 2)).length

const q3 = bots.filter(item => 
    item.x >= 0 && item.x < Math.floor(gridWidth / 2)
    && item.y >= Math.ceil(gridHeight / 2) && item.y <= gridHeight).length

const q4 = bots.filter(item => 
    item.x >= Math.ceil(gridWidth / 2) && item.x <= gridWidth
    && item.y >= Math.ceil(gridHeight / 2) && item.y <= gridHeight).length 

console.log(q1 * q2 * q3 * q4)