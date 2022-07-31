function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var canvas = document.querySelector("canvas");


var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })

window.addEventListener('resize',
    function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init()
    })

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.color1) {
            var c1value = properties.color1.value;
        }
        if (properties.color2) {
            var c2value = properties.color1.value;
        }
        if (properties.color3) {
            var c3value = properties.color1.value;
        }
        if (properties.color4) {
            var c4value = properties.color1.value;
        }
        if (properties.color5) {
            var c5value = properties.color1.value;
        }
        if (properties.oppacity) {
            var oppvalue = properties.oppacity.value;
        }
    },
};

var colorArray = [
    c1value,
    c2value,
    c3value,
    c4value,
    c5value
]



function Circle() {
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = Math.random() * 5 +2
    this.radius = this.minRadius;
    this.x = Math.random() * innerWidth + this.radius;
    this.y = Math.random() * innerHeight;
    this.dx = (Math.random() - 0.5) * 8
    this.dy = (Math.random() - 0.5) * 8

    this.update = function() {
    
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx *= -1;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy *= -1;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // interact with circle
        if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
            if (this.radius < 120) {
                this.radius += 2;
            }
        } else if (this.radius > 10) {
            this.radius -= 2;
        }
    
    }

    this.draw = function() {
        
        ctx.fillStyle = this.color
        ctx.globalAlpha = oppvalue

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
        //ctx.strokeStyle = "red";
        ctx.fill();
        //ctx.stroke();
        ctx.globalAlpha = 1;

    }
}



function animate() {
    requestAnimationFrame(animate);
    
    ctx.clearRect(0,0, innerWidth, innerHeight);

    ctx.fillStyle = ("#000000")
    ctx.fillRect(0,0, innerWidth, innerHeight);

    circles.forEach(circle => {
        circle.update();
        circle.draw();
    });
}

var circles = [];
var circle_count = parseInt(getParameterByName("circles"));
if (isNaN(circle_count)) {
    circle_count = 1000;
}

function init() {

    circles = [];
    for (var i = 0; i<circle_count; i++) {
        circles.push(new Circle());
    }    
}

init();
animate();
