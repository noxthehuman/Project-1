const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const img = new Image()
img.src='./Images/wire-cutter.png'

const canvasPos = getPosition(canvas)
let mouseX = 0
let mouseY = 0

let start = 0
let end = 0
let seconds = 0
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

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawWires()
    drawBomb()
    displayTime()
    context.drawImage(img,mouseX - 60, mouseY, 120, 200)
    updateId = requestAnimationFrame(update)
}

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

const wires = [
    new Wires(295, 150, 400, 150, 120, Math.PI, Math.PI*2, 25, 'black', 0),
    new Wires(100, 150, 240, 150, 130, Math.PI, Math.PI*2, 18, 'orange', 0),
    new Wires(600, 300, 600, 400, 100, (Math.PI*3)/2, Math.PI/2, 10, 'green', 0),
    new Wires(600, 200, 600, 300, 100, (Math.PI*3)/2, Math.PI/2, 20, 'red', 0),
    new Wires(500, 500, 400, 500, 120, Math.PI*2, Math.PI, 15, 'pink', 0),
    new Wires(300, 500, 200, 500, 95, Math.PI*2, Math.PI, 20, 'purple', 0)
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
        // console.log(wires[i].color, wires[i].id)
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

// function getMousePosition( canvas, evt ) {
//     const rect = canvas.getBoundingClientRect();
//     return {
//         x: Math.floor( ( evt.clientX - rect.left ) / ( rect.right - rect.left ) * canvas.width ),
//         y: Math.floor( ( evt.clientY - rect.top ) / ( rect.bottom - rect.top ) * canvas.height )
//     };
// }

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
    seconds -= Math.round(seconds * 0.25)
}

function StartTimer() {
    start = new Date()
}

function calculateSeconds() {
    end = new Date()
    seconds = Math.round((end - start)/1000)
}

function displayTime() {
        calculateSeconds()
        context.clearRect(180, 290, 330, 80)
        context.fillStyle = 'red'
        context.font = '60px Arial'
        context.fillText('00:' + seconds.toString().padStart(2, '0'), 280, 350, 500)
        
        if (seconds >= 30) {
            loseCondition()
        }
    
}

document.querySelector('.start-btn').addEventListener('click', function() {
    document.querySelector('.start-btn').innerHTML = "Retry"
    StartTimer()
    if(seconds > 0) {
        window.location.href = window.location.href;
    }
    update()
    canvas.addEventListener('click', function( evt) {
        //let mousePos = getMousePosition( canvas, evt );
        console.log('click')
        for (i=0; i < wires.length; i++) {
            if(wires[i].isMouseInWire(mouseX, mouseY) <= wires[i].radius + (wires[i].strokeWidth/2) && 
            wires[i].isMouseInWire(mouseX, mouseY) >= wires[i].radius - (wires[i].strokeWidth/2))
            {
                if(wires[i].id === 1) {
                    console.log('win')
                    winCondition()
                }
                if(wires[i].id === 2) {
                    console.log('lose')
                    loseCondition()
                }
                if(wires[i].id === 3) {
                    console.log('less time')
                    penaltyTime()
                }
            } 
        }
    })
})

