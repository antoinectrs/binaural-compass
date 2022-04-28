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
        this.strokeWidth = strokeWidth
    }
    drawInCompass(x, y, pinAngle, intensity, distance = 200) {
        ctx.save();
        ctx.translate(x, y);
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
        ctx.arc(x, y, 300, 0, 2 * Math.PI, false) // full circle
        // draw the path to screen
        ctx.fill()
        ctx.stroke()
        ctx.restore();
    }
    soundPoint(orientation,distance){
        binauralFIRNode.setPosition(orientation, 0, 1);
    }
    distanceMap(value,threeshold=500){
        // const distanceMap= mapRange(value, 0, 0.05, 0, canvas.width);
        const distanceMap= mapRange(distance, 0, threeshold, 0, canvas.width);
        return distanceMap;
    }
        // distance = mapRange(distance, 0, 500, 0, canvas.width);
}