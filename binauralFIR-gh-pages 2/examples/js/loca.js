// function compassReady() {
//     // headingAngle = compass.getHeading();
//     // bearingToNorth = compass.getBearingToNorth();


//     const currentPosition = { lat: compass.position.coords.latitude, lng: compass.position.coords.longitude };
//     const lat1 = 46.54281206184764; const lng1 = 6.56923874161301;
//     // const lat2 = 46.54294451066024; const lng2 = 6.569260308955235;
//     // const lat3 = 46.54255667293508; const lng3 = 6.56868284205725;
//     bass = {
//         orientation: compass.getBearingToDestination(currentPosition, { lat: lat1, lng: lng1 }),
//         distance: calcCrow(currentPosition.lat, currentPosition.lng, lat1, lng1)
//     }
//     // drum = {
//     //     orientation: compass.getBearingToDestination(currentPosition, { lat: lat2, lng: lng2 }),
//     //     distance: calcCrow(currentPosition.lat, currentPosition.lng, lat2, lng2)
//     // }
//     // lead = {
//     //     orientation: compass.getBearingToDestination(currentPosition, { lat: lat3, lng: lng3 }),
//     //     distance: calcCrow(currentPosition.lat, currentPosition.lng, lat3, lng3)
//     // }
// }
function drawPin(x, y, pinAngle, intensity, distance=200) {
    push();
    translate(x, y);
    // 1. normalize for p5: p5 handles 0 degrees at +90deg from the web browser
    rotate(radians(-90))
    // 2. rotate accordingly
    rotate(radians(pinAngle));
    line(0, 0, 50, 0);
    // noFill();
    fill(0, 0, intensity);
    stroke(0, 0, intensity);
    strokeWeight(20)
    // console.log(distance);
    // const distanceMap = map(distance, 0, 0.05, 0, width);
    // console.log(distanceMap);

    circle(distance, 0, 800);
    pop();

}
function calcCrow(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist;
    }
}