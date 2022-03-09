const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

class Wires {
    constructor(x1, y1, x2, y2, radius, startAngle, endAngle, strokeWidth, color, id) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.radius = radius
        this.startAngle = startAngle
        this.endAngle = endAngle
        this.strokeWidth = strokeWidth
        this.color = color
        this.id = id  
    }   

    draw(newColor) {
        context.beginPath()
        context.moveTo(this.x1, this.y1)
        context.arc(this.x2, this.y2, this.radius, this.startAngle, this.endAngle)
        context.lineWidth = this.strokeWidth
        context.strokeStyle = this.color || newColor
        context.stroke()
        context.closePath()
    }

    isMouseInWire(mouseX, mouseY) {
        let distance = ((mouseY - this.y2)**2 + (mouseX -this.x2)**2)** (1/2)
        return distance
    }
}

console.log(4**(1/2))

const wires = [
    new Wires(100, 150, 240, 150, 130, Math.PI, Math.PI*2, 18, 'orange', 0),
    new Wires(295, 150, 400, 150, 120, Math.PI, Math.PI*2, 25, 'black', 0),
    new Wires(600, 200, 600, 300, 100, (Math.PI*3)/2, Math.PI/2, 20, 'red', 0),
    new Wires(600, 300, 600, 400, 100, (Math.PI*3)/2, Math.PI/2, 10, 'green', 0),
    new Wires(300, 500, 200, 500, 95, Math.PI*2, Math.PI, 20, 'purple', 0),
    new Wires(500, 500, 400, 500, 120, Math.PI*2, Math.PI, 15, 'pink', 0)
]
    
for (i=1; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * wires.length)   
    
    if(wires[randomIndex].id !== i) {
        wires[randomIndex].id = i
    }
}

function drawWires(i, newColor) {
    for (i=0; i < wires.length; i++) {
        wires[i].draw(newColor)
        console.log(wires[i].color, wires[i].id)
    }
}

function drawBomb() {
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
}

function getMousePosition( canvas, evt ) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: Math.floor( ( evt.clientX - rect.left ) / ( rect.right - rect.left ) * canvas.width ),
        y: Math.floor( ( evt.clientY - rect.top ) / ( rect.bottom - rect.top ) * canvas.height )
    };
}

function WinCondition() {
    clearInterval(intervalId)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'green'
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function loseCondition() {
    clearInterval(intervalId)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'red'
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function penaltyTime() {
    sec = Math.round(sec * 0.75)
}

//Timer text
let sec = 30
let intervalId
function startTimer() {
    intervalId = setInterval(function () {
        context.clearRect(180, 290, 330, 80)
        context.fillStyle = 'red'
        context.font = '60px Arial'
        context.fillText('00:' + sec.toString().padStart(2, '0'), 280, 350, 500)
        sec--
        
        if (sec <= 0) {
            loseCondition()
        }
    }, 1000)
}

document.querySelector('.start-btn').addEventListener('click', function() {
    document.querySelector('.start-btn').innerHTML = "Reload"
    if(sec < 30) {
        window.location.href = window.location.href;
    }
   
    startTimer()
    drawWires()
    drawBomb()
   
    canvas.addEventListener('click', function( evt) {
        let mousePos = getMousePosition( canvas, evt );
        
        for (i=0; i < wires.length; i++) {
            if(wires[i].isMouseInWire(mousePos.x, mousePos.y) <= wires[i].radius + (wires[i].strokeWidth/2) && 
            wires[i].isMouseInWire(mousePos.x, mousePos.y) >= wires[i].radius - (wires[i].strokeWidth/2)){
                console.log(wires[i].color)
                if(wires[i].id === 1) {
                    WinCondition()
                }
                if(wires[i].id === 2) {
                    loseCondition()
                }
                if(wires[i].id === 3) {
                    penaltyTime()
                }
            } 
           
        }
    })

})

canvas.addEventListener( 'mouseenter', function( evt ) {
    let mousePos = getMousePosition( canvas, evt );
    if(mousePos.x < 250 && mousePos.y < 130) {
        
    }

} );




