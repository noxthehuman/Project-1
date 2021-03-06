const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const retry = document.querySelector('.start-btn')

const img = new Image()
img.src='./Images/wire-cutter.png'
const bg = new Image()
bg.src='./Images/explosion.png'

const bip = new Audio(src='bip.mp3')
const exp = new Audio(src='explosion.mp3')

const canvasPos = getPosition(canvas)
let mouseX = 0
let mouseY = 0

let start = 0
let end = 0
let penalty = 0
let updateId 
let sound

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
    new Wires(395, 150, 400, 150, 120, Math.PI, Math.PI*2, 25, 'pink', 0),
    new Wires(200, 150, 340, 150, 130, Math.PI, Math.PI*2, 18, 'orange', 0),
    new Wires(350, 150, 550, 150, 100, Math.PI, Math.PI*2, 18, 'blue', 0),
    new Wires(700, 300, 700, 400, 100, (Math.PI*3)/2, Math.PI/2, 13, 'green', 0),
    new Wires(700, 200, 700, 300, 100, (Math.PI*3)/2, Math.PI/2, 20, 'red', 0),
    new Wires(700, 180, 700, 310, 150, (Math.PI*3)/2, Math.PI/2, 15, 'brown', 0),
    new Wires(500, 500, 500, 500, 120, Math.PI*2, Math.PI, 15, 'pink', 0),
    new Wires(700, 500, 600, 500, 90, Math.PI*2, Math.PI, 20, 'red', 0),
    new Wires(680, 500, 330, 500, 150, Math.PI*2, Math.PI, 15, 'orange', 0),
    new Wires(400, 500, 300, 500, 95, Math.PI*2, Math.PI, 20, 'purple', 0),
    new Wires(200, 450, 200, 270, 120, Math.PI/2, (Math.PI*3)/2, 17, 'blue', 0),
    new Wires(200, 500, 200, 350, 80, Math.PI/2, (Math.PI*3)/2, 12, 'green', 0),
    new Wires(200, 510, 200, 350, 130, Math.PI/2, (Math.PI*3)/2, 14, 'brown', 0)
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
    context.fillRect(170, 130, 550, 380)

    context.fillStyle = 'black'
    context.fillRect(270, 280, 350, 100)
    context.fillStyle = 'white'
    context.fillRect(280, 290, 230, 80)

    //Rivets
    //top left
    context.beginPath()
    context.arc(185, 160, 10, 0, Math.PI*2)
    context.fillStyle = 'black'
    context.fill()
    context.closePath()
    //bottom left
    context.beginPath()
    context.arc(185, 500, 10, 0, Math.PI*2)
    context.fillStyle = 'black'
    context.fill()
    context.closePath()
    //top right
    context.beginPath()
    context.arc(700, 160, 10, 0, Math.PI*2)
    context.fillStyle = 'black'
    context.fill()
    context.closePath()
    // bottom right
    context.beginPath()
    context.arc(700, 500, 10, 0, Math.PI*2)
    context.fillStyle = 'black'
    context.fill()
    context.closePath()
}

function winCondition() {
    cancelAnimationFrame(updateId)
    clearInterval(sound)
    context.clearRect(280, 290, 330, 80)
    context.fillStyle = 'green'
    context.font = '65px Iceland'
    context.fillText('Diffused', 350, 350, 500)
}

function loseCondition() {
    cancelAnimationFrame(updateId)
    exp.play()
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(bg, 0, 0, canvas.width, canvas.height)
}

function penaltyTime() {
    penalty += 1
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
        const seconds = 45 - calculateSeconds()
        context.clearRect(280, 290, 330, 80)
        context.fillStyle = 'red'
        context.font = '65px Iceland'
        context.fillText('00:' + seconds.toString().padStart(2, '0'), 380, 350, 500)
        
        if (seconds <= 0) {
            loseCondition()
        }
//     sound = setInterval(function() {
//         bip.play()
//     }, 1000)
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
                    wires[i].isCut = true
                    winCondition()
                }
                if(wires[i].id === 2) {
                    wires[i].isCut = true
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