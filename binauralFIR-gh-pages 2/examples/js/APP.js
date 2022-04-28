window.onload = function () {


    // ---------- LOAD SOUND ----------
    // requestTrack("master");
    let points = [
        {
            "sample": new Sample("master"),
            "graphic": new Circle()
        }
    ];
    points.forEach(function (point) {
        point.sample.requestTrack("master");
        document.querySelector('.play').addEventListener('click', point.sample.playSample.bind(event, 0), false);
    });
    // --------- /LOAD SOUND ----------

    // ---------- LOAD POSI ----------
    compass = new Compass();
    compass.init(compassReady);
    // ---------- LOAD MAP ----------


    let myMap = null;
    navigator.geolocation.watchPosition(pos => {
        if (myMap == null) {
            myMap = initMap(pos);
            PARAMS.bubble.forEach(function (element) {
                addPin(element[0], myMap);
                element.distBeMe = calcCrow(element[0].lat,
                    element[0].lng,
                    pos.coords.latitude,
                    pos.coords.longitude);
            });
            // initInteractionMap(myMap);
        } else {
            panMap(pos, myMap);
            let result = PARAMS.bubble.forEach(function (element) {
                addPin(element[0], myMap);
                element.distBeMe = calcCrow(element[0].lat,
                    element[0].lng,
                    pos.coords.latitude,
                    pos.coords.longitude);
            });
        }
    });
    // --------- /LOAD MAP ----------

    // ---------- DOM ----------
    clicClass(".active", "on")

    // --------- /DOM ----------
    initCanvas('gameCanvas',points);
    // childrenCircle.forEach(circle => circle.draw(ctx))
    // createCanvas(windowWidth, windowHeight);
    // const callback = window.requestAnimationFrame(drawPoint);       
    // drawPoint() 
    // console.log(compass.position);
    // if (compass.position !== null && compass.orientation !== null) {
    //     drawMap(compass.position.coords.latitude, compass.position.coords.longitude)
    // }
}
