let compass, headingAngle, angleToNorth, bass, drum, lead;
let childrenCircle, ctx, canvas;
function initCanvas(path, points) {
  canvas = document.getElementById(path)
  mouselistener(canvas);
  canvas.width = window.innerWidth;;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');

  // asign the canvas width in circle
  PARAMS.points.forEach(element => {
    element.graphic.asignCenter(canvas.width, canvas.height)
  });
  window.requestAnimationFrame(function () {
    requestCompass(points);
  });
}
function requestCompass(points) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (compass.position !== null && compass.orientation !== null) {
    console.log(compass.getBearingToNorth());
    // const northD =compass.getBearingToNorth();
    changeOrientation (PARAMS.map, compass.getBearingToNorth())
    PARAMS.points.forEach((event) => {
      if (event.sample.binauralFIRNode != null) {
        const orResult = event.space.compassReady();
        event.sample.binauralFIRNode.setPosition(orResult.audio, 0, 1);
        event.graphic.drawInCompass(orResult.graphic, "parc");
      }
    });
  }
  // DEBUG INIT
  // if(compass.position == null)
  // requestAnimationFrame(requestCompass);
  window.requestAnimationFrame(function () {
    requestCompass(points);
  });
}
function mouselistener(canvas){
canvas.addEventListener("mousemove", function (e) {
  var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
  var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
  var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
 
  
  // console.log(isLerping(canvasX));

});
}
