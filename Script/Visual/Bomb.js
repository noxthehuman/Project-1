const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

// . . . . . . . . . . . . . . . . . . . . . DRAWING THE WIRES . . . . . . . . . . . . . . . . . 

class Wires {
    constructor(x1, y1, x2, y2, radius, startAngle, endAngle, strokeWidth, color) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.strokeWidth = strokeWidth
        this.color = color
    }

    id = 0

    draw() {
        context.beginPath()
        context.moveTo(this.x1, this.y1)
        context.arc(this.x2, this.y2, this.radius, this.startAngle, this.endAngle)
        context.lineWidth = this.strokeWidth
        context.strokeStyle = this.color
        context.stroke()
        context.closePath()
    }
}

const wires = [
    new Wires(100, 150, 240, 150, 130, Math.PI, Math.PI*2, 18, 'orange'),
    new Wires(295, 150, 400, 150, 120, Math.PI, Math.PI*2, 25, 'black'),
    new Wires(600, 200, 600, 300, 100, (Math.PI*3)/2, Math.PI/2, 20, 'red'),
    new Wires(600, 300, 600, 400, 100, (Math.PI*3)/2, Math.PI/2, 10, 'green'),
    new Wires(300, 500, 200, 500, 95, Math.PI*2, Math.PI, 20, 'purple'),
    new Wires(500, 500, 400, 500, 120, Math.PI*2, Math.PI, 15, 'pink')
]

for (i=0; i < wires.length; i++) {
    wires[i].draw()
}

// . . . . . . . . . . . . . . . . . . . . . DRAWING THE BOMB . . . . . . . . . . . . . . . . . 

context.fillStyle = 'grey'
context.fillRect(70, 140, 550, 380)

context.fillStyle = 'black'
context.fillRect(170, 280, 350, 100)
context.fillStyle = 'white'
context.fillRect(180, 290, 330, 80)

//Rivets
//top left
context.beginPath()
context.arc(85, 160, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()
//bottom left
context.beginPath()
context.arc(85, 500, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()
//top right
context.beginPath()
context.arc(600, 160, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()
// bottom right
context.beginPath()
context.arc(600, 500, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()

//Timer text

function startTimer() {
    let sec = 30
    setInterval(function () {
        context.clearRect(180, 290, 330, 80)
        context.fillStyle = 'red'
        context.font = '60px Arial'
        context.fillText('00:' + sec.toString().padStart(2, '0'), 280, 350, 500)
        sec--
        
        if (sec <= 0) {
            sec = 0
        }
        
    }, 1000)
}

document.querySelector('.start-btn').addEventListener('click', function() {
    startTimer()
 })

