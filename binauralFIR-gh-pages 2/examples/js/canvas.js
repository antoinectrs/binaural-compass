let compass, headingAngle, angleToNorth, bass, drum, lead;
let childrenCircle, ctx, canvas;
function initCanvas(path, points) {
  canvas = document.getElementById(path)
  canvas.width = window.innerWidth;;
  canvas.heigh = window.innerHeight;
  ctx = canvas.getContext('2d');
  // childrenCircle = [new Circle()]

  window.requestAnimationFrame(function () {
    requestCompass(points);
  });
}

function requestCompass(points) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (compass.position !== null && compass.orientation !== null) {
    // const result = compassReady();





    //check 3 points
    PARAMS.points.forEach((event) => {
      //check if sound is active
      if (event.sample.binauralFIRNode != null) {
       
        console.log(event.space.compassReady());
        // let resultMap;
        // if (result.bass.orientation >= 180) {
        //   resultMap = mapRange(result.bass.orientation, 360, 180, 0, 180);
        // } else {
        //   resultMap = (-result.bass.orientation);
        // }
        // event.sample.binauralFIRNode.setPosition(resultMap, 0, 1)
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