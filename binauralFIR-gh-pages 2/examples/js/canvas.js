let compass, headingAngle, angleToNorth, bass, drum, lead;
function setup() {
  createCanvas(windowWidth, windowHeight);
  compass = new Compass();
  compass.init(compassReady);

  textAlign(CENTER);
}
function compassReady() {
  // headingAngle = compass.getHeading();
  // bearingToNorth = compass.getBearingToNorth();


  const currentPosition = { lat: compass.position.coords.latitude, lng: compass.position.coords.longitude };
  const lat1 = 46.54281206184764; const lng1 = 6.56923874161301;
  // const lat2 = 46.54294451066024; const lng2 = 6.569260308955235;
  // const lat3 = 46.54255667293508; const lng3 = 6.56868284205725;
  bass = {
      orientation: compass.getBearingToDestination(currentPosition, { lat: lat1, lng: lng1 }),
      // distance: calcCrow(currentPosition.lat, currentPosition.lng, lat1, lng1)
  }
  // drum = {
  //     orientation: compass.getBearingToDestination(currentPosition, { lat: lat2, lng: lng2 }),
  //     distance: calcCrow(currentPosition.lat, currentPosition.lng, lat2, lng2)
  // }
  // lead = {
  //     orientation: compass.getBearingToDestination(currentPosition, { lat: lat3, lng: lng3 }),
  //     distance: calcCrow(currentPosition.lat, currentPosition.lng, lat3, lng3)
  // }
}
function draw() {
    // background(250, 40);
    background(250);
    if (compass.position !== null && compass.orientation !== null) {
      compassReady();
    //  const pin = drawPin(width*0.5, height*0.5, bearingToNorth);

      // text(bearingToNorth, width*0.5, height*0.5);
      // let transformToBinaural;
      // if(bearingToNorth>=180){
      //   transformToBinaural =map(bearingToNorth,360,180,0, 180);
      // }else{
      //   transformToBinaural=(-bearingToNorth);
      // }
      // text( transformToBinaural,width*0.5, height*0.75);

      // console.log(bass);
      drawPin(width * 0.5, height * 0.5, bass.orientation, 255, bass.distance);
    //   drawPin(width * 0.5, height * 0.5, drum.orientation, 200, drum.distance);
    //   drawPin(width * 0.5, height * 0.5, lead.orientation, 100, lead.distance);
    }
  
  }