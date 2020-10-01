const canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const canvasFuntions = canvas.getContext('2d');

// canvasFuntions.fillStyle = 'blue';
// canvasFuntions.fillRect(100, 100, 100, 100);
// canvasFuntions.fillStyle = 'green';
// canvasFuntions.fillRect(900, 130, 100, 100);
// canvasFuntions.fillStyle = 'red';
// canvasFuntions.fillRect(540, 280, 100, 100);
// console.log(canvas);

// //line

// canvasFuntions.beginPath();
// canvasFuntions.moveTo(400, 300);
// canvasFuntions.lineTo(920, 145);
// canvasFuntions.lineTo(320, 145);
// canvasFuntions.stroke();

// //cicles , arch
// for (var i = 0; i < 300; i++) {
//     var x = Math.random() * window.innerHeight;
//     var y = Math.random() * window.innerWidth;
//     canvasFuntions.beginPath();
//     canvasFuntions.arc(x, y, 30, 0, Math.PI * 2, false);
//     canvasFuntions.stroke();
// }

var maxRadius = 40;
var minRadius = 2;

var mouse = {
    x: undefined,
    y: undefined
}

var colorArray = [
    '#d81b60',
    '#9c27b0',
    '#303f9f',
    '#1565c0',
    '#00897b',
    '#ffa000',
    '#ffff00',
    '#69f0ae'
]

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});
window.addEventListener('resize', () => {

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        canvasFuntions.beginPath();
        canvasFuntions.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        canvasFuntions.fillStyle = this.color;
        canvasFuntions.fill();
    }
    this.update = function() {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 850; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 1;
        var dy = (Math.random() - 0.5) * 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    canvasFuntions.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();