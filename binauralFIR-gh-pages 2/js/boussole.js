function compassReady() {
    // headingAngle = compass.getHeading();
    // bearingToNorth = compass.getBearingToNorth();
   
    // drawMap(compass.position.coords.latitude,compass.position.coords.longitude)
    const currentPosition = { lat: compass.position.coords.latitude, lng: compass.position.coords.longitude };
    // const lat1 = 46.54281206184764; const lng1 = 6.56923874161301;
    // const lat2 = 46.54294451066024; const lng2 = 6.569260308955235;
    // const lat3 = 46.54255667293508; const lng3 = 6.56868284205725;

    // console.log(PARAMS.bubble[0][0]);
    bass = {
        // bearingToNorth :compass.getBearingToNorth()
        
      orientation: compass.getBearingToDestination(currentPosition, { lat: PARAMS.bubble[0][0].lat, lng: PARAMS.bubble[0][0].lng }),
      // distance: calcCrow(currentPosition.lat, currentPosition.lng, lat1, lng1)
    }
    // drum = {
    //   orientation: compass.getBearingToDestination(currentPosition, { lat: lat2, lng: lng2 }),
    //   // distance: calcCrow(currentPosition.lat, currentPosition.lng, lat2, lng2)
    // }
    // lead = {
    //   orientation: compass.getBearingToDestination(currentPosition, { lat: lat3, lng: lng3 }),
    //   // distance: calcCrow(currentPosition.lat, currentPosition.lng,  lat3, lng3)
    // }
    return {bass};
  }