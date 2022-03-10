const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const retry = document.querySelector('.start-btn')

const img = new Image()
img.src='./Images/wire-cutter.png'

const canvasPos = getPosition(canvas)
let mouseX = 0
let mouseY = 0

let start = 0
let end = 0
let penalty = 0
let updateId 

canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e) {
    mouseX = e.pageX - canvasPos.x;
    mouseY = e.pageY - canvasPos.y;
}

function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
}

class Wires {
    constructor(x1, y1, x2, y2, radius, startAngle, endAngle, strokeWidth, color, id, isHovering, isCut) {
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
        this.isHovering = false
        this.isCut = false
    }   

    draw(newColor) {
        context.beginPath()
        context.moveTo(this.x1, this.y1)
        context.arc(this.x2, this.y2, this.radius, this.startAngle, this.endAngle)
        context.lineWidth = this.strokeWidth
        if (this.isHovering || this.isCut) {
            context.strokeStyle = newColor
        }
        else {
            context.strokeStyle = this.color 
        }
        context.stroke()
        context.closePath()
    }

    isMouseInWire(mouseX, mouseY) {
        let distance = ((mouseY - this.y2)**2 + (mouseX -this.x2)**2)** (1/2)
        let thickness1 = this.radius + (this.strokeWidth/2)
        let thickness2 = this.radius - (this.strokeWidth/2)
        if (distance <= thickness1 && distance >= thickness2) {
            return true
        }
        else {
            return false
        }

    }

}

const wires = [
    new Wires(295, 150, 400, 150, 120, Math.PI, Math.PI*2, 25, 'black', 0),
    new Wires(100, 150, 240, 150, 130, Math.PI, Math.PI*2, 18, 'orange', 0),
    new Wires(600, 300, 600, 400, 100, (Math.PI*3)/2, Math.PI/2, 10, 'green', 0),
    new Wires(600, 200, 600, 300, 100, (Math.PI*3)/2, Math.PI/2, 20, 'red', 0),
    new Wires(500, 500, 400, 500, 120, Math.PI*2, Math.PI, 15, 'pink', 0),
    new Wires(300, 500, 200, 500, 95, Math.PI*2, Math.PI, 20, 'purple', 0)
]

function setId() {
    let id1= Math.floor(Math.random() * wires.length)
    let id2 = Math.floor(Math.random() * wires.length)  
    if(id1 === id2) {
        id1 += 1
    }
    wires[id1].id = 1 
    wires[id2].id = 2
    console.log(wires[id1].color, wires[id2].color)
}

function isMouseOverWire() {
    for (i=0; i < wires.length; i++) {
        if(wires[i].isMouseInWire(mouseX, mouseY)) {
            
            wires[i].isHovering = true
        }
        else {
            wires[i].isHovering = false
        }
        
    }
}

function drawWires() {
    isMouseOverWire()
    for (i=0; i < wires.length; i++) {
        if(wires[i].isCut) {
            wires[i].draw('grey')
        }
        else if(wires[i].isHovering) {
            wires[i].draw('yellow')
        }
        else {
            wires[i].draw(wires[i].color)
        }
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

function winCondition() {
    cancelAnimationFrame(updateId)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'green'
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function loseCondition() {
    cancelAnimationFrame(updateId)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'red'
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function penaltyTime() {
    penalty += 2
}

function startTimer() {
    start = new Date()
}

function calculateSeconds() {
    end = new Date()
    const seconds = Math.round((end - start)/1000)
    return seconds + penalty
}

function displayTime() {
        const seconds = 30 - calculateSeconds()
        context.clearRect(180, 290, 330, 80)
        context.fillStyle = 'red'
        context.font = '60px Arial'
        context.fillText('00:' + seconds.toString().padStart(2, '0'), 280, 350, 500)
        
        if (seconds <= 0) {
            loseCondition()
        }
    
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawWires()
    drawBomb()
    displayTime()
    context.drawImage(img,mouseX - 25, mouseY - 90, 200, 200)
    updateId = requestAnimationFrame(update)
}

function startGame() {
    for(i=0; i < wires.length; i++) {
        wires[i].isCut = false
        wires[i].id = 0
    }
    penalty = 0
    context.clearRect(0, 0, canvas.width, canvas.height)
    startTimer()
    setId()
    update()
}

document.querySelector('.start-btn').addEventListener('click', function() {
    startTimer()
    update()
    retry.textContent = 'Retry'
    
    canvas.addEventListener('click', function() {
        for (i=0; i < wires.length; i++) {
            if(wires[i].isMouseInWire(mouseX, mouseY)) 
            {
                wires[i].isHovering = false
                
                if(wires[i].id === 1) {
                    winCondition()
                }
                if(wires[i].id === 2) {
                    loseCondition()
                }
                if(wires[i].id === 0 && !wires[i].isCut) {
                    wires[i].isCut = true
                    penaltyTime()
                }
            } 
            else {
                wires[i].isHovering = false
            }
        }
    })
})

document.querySelector('.start-btn').addEventListener('click', function() {
    if(retry.textContent === 'Retry') {
        startGame()
    }
    
})