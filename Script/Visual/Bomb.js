const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

// . . . . . . . . . . . . . . . . . . . . . DRAWING THE WIRES . . . . . . . . . . . . . . . . . 
//Drawing wire top left
context.beginPath()
context.moveTo(100, 150)
context.arc(240, 150, 130, Math.PI, Math.PI*2)
context.lineWidth = 18
context.strokeStyle = 'orange'
context.stroke()
context.closePath()

//Drawing wire top right
context.beginPath()
context.moveTo(295, 150)
context.arc(400, 150, 120, Math.PI, Math.PI*2)
context.lineWidth = 25
context.strokeStyle = 'black'
context.stroke()
context.closePath()

//Drawing wire right top
context.beginPath()
context.moveTo(600, 200)
context.arc(600, 300, 100, (Math.PI*3)/2, Math.PI/2)
context.lineWidth = 20
context.strokeStyle = 'red'
context.stroke()
context.closePath()

//Drawing wire right bottom
context.beginPath()
context.moveTo(600, 300)
context.arc(600, 400, 100, (Math.PI*3)/2, Math.PI/2)
context.lineWidth = 10
context.strokeStyle = 'green'
context.stroke()
context.closePath()

//Drawing wire bottom left
context.beginPath()
context.moveTo(300, 500)
context.arc(200, 500, 95, Math.PI*2, Math.PI)
context.lineWidth = 20
context.strokeStyle = 'purple'
context.stroke()
context.closePath()

//Drawing wire bottom right
context.beginPath()
context.moveTo(500, 500)
context.arc(400, 500, 120, Math.PI*2, Math.PI)
context.lineWidth = 15
context.strokeStyle = 'pink'
context.stroke()
context.closePath()

// . . . . . . . . . . . . . . . . . . . . . DRAWING THE BOMB . . . . . . . . . . . . . . . . . 

context.fillStyle = 'grey'
context.fillRect(70, 140, 550, 380)

context.fillStyle = 'black'
context.fillRect(170, 280, 350, 100)
context.clearRect(180, 290, 330, 80)

//Rivets
context.beginPath()
context.arc(85, 160, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()

context.beginPath()
context.arc(85, 500, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()

context.beginPath()
context.arc(600, 160, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()

context.beginPath()
context.arc(600, 500, 10, 0, Math.PI*2)
context.fillStyle = 'black'
context.fill()
context.closePath()