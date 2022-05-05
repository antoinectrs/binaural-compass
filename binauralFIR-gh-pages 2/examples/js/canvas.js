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
    PARAMS.points.forEach((event) => {
      if (event.sample.binauralFIRNode != null) {
        const orResult = event.space.compassReady();
        event.sample.binauralFIRNode.setPosition(orResult.audio, 0, 1);
        event.graphic.drawInCompass(orResult.graphic, "parc");
      }
    });
  






    //   // console.log(result);
    //   //  const pin = drawPin(width*0.5, height*0.5, bearingToNorth);



    // console.log(result.bass.orientation,"    ",resultMap);
    //   // binauralFIRNode1.setPosition(transformToBinaural, 0, 1);
    //   // text(transformToBinaural, width * 0.5, height * 0.75);
    //   // console.log(bass.orientation);
    //   // console.log(childrenCircle);


    // childrenCircle.forEach(function(circle){
    //   if(circle.binauralFIRNode!=null){
    //     circle.drawInCompass(canvas.width * 0.5, canvas.height * 0.5, result.bass.orientation, "parc", result.bass.distance);
    //     circle.soundPoint(result.bass.orientation, result.bass.distance, binauralFIRNode);
    //   }
    // });

    //   // drawPin(ctx.width * 0.5, ctx.height * 0.5, result.bass.orientation, "parc", result.bass.distance);
    //   // drawPin(width * 0.5, height * 0.5, drum.orientation, "work", drum.distance);
    //   // drawPin(width * 0.5, height * 0.5, lead.orientation, "lac", lead.distance);
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
  PARAMS.mouseTest = {x:canvasX, y:canvasY};
  
  // console.log(isLerping(canvasX));
  console.log(msg(canvasX));
});
}
