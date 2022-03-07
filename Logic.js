const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//Drawing wire top left
context.beginPath()
context.moveTo(100, 300)
context.arc(250, 300, 150, Math.PI, Math.PI*2)
context.lineWidth = 25
context.strokeStyle = 'orange'
context.stroke()
context.closePath()

//Drawing wire top right
context.beginPath()
context.moveTo(400, 300)
context.arc(450, 300, 120, Math.PI*2, Math.PI, true)
context.lineWidth = 25
context.strokeStyle = 'blue'
context.stroke()
context.closePath()

//Drawing wire right

console.log(canvas)