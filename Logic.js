const canvas = document.getElementsById('canvas');
const context = canvas.getContext('2d');

//Drawing the wires
context.beginPath()
context.moveTo(100, 300)
context.arc(100, 300, 50, 0, Math.PI*2)
context.lineWidth = 30
context.strokeStyle = 'purple'
context.stroke()
context.closePath()

