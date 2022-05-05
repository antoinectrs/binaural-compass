class Circle {
    constructor(
        x = 0, y = 0,
        radius = 0,
        fillColor = '', strokeColor = '', strokeWidth = 2
    ) {
        // ensure the arguments passed in are numbers
        // a bit overkill for this tutorial
        this.x = Number(x)
        this.y = Number(y)
        this.radius = Number(radius)
        this.fillColor = fillColor
        this.strokeColor = strokeColor
        this.strokeWidth = strokeWidth;
        this.distanceMap = 0;
        this.centerWidth;
        this.centerHeight;
    }
    asignCenter(width, height) {
        this.centerWidth = width * 0.5;
        this.centerHeight = height * 0.5;
    }
    drawInCompass(pinAngle, intensity, distance = 200) {
        ctx.save();
        ctx.translate(this.centerWidth, this.centerHeight);
        // 1. normalize for p5: p5 handles 0 degrees at +90deg from the web browser
        // ctx.rotate(-90)
        // 2. rotate accordingly
        ctx.rotate(degrees_to_radians(pinAngle));
        // console.log(pinAngle);
        // line(0, 0, 50, 0);
        ctx.fillStyle = asignColor(intensity);

        // distanceMap(distance);

        // x, y, radius, startAngle, endAngle, antiClockwise = false by default
        ctx.beginPath()
        // ctx.strokeStyle = strokeColor
        // console.log(PARAMS.mouseTest);
        ctx.arc(this.distanceMap, this.distanceMap, 300, 0, 2 * Math.PI, false) // full circle
        // draw the path to screen
        ctx.fill()
        ctx.stroke()
        ctx.restore();
    }
    convertToCanvas(value, threshold = 0.1) {
        this.distanceMap = mapRange(value, 0, threshold, 0, canvas.width);
    }
    soundPoint(orientation, distance) {
        binauralFIRNode.setPosition(orientation, 0, 1);
    }
}