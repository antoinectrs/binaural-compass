window.onload = function () {
    // ---------- LOAD SOUND ----------
    // requestTrack("master");
    let points = [
        {
            "sample": new Sample("bass"),
            "graphic": new Circle()
        },
        {
            "sample": new Sample("drum"),
            "graphic": new Circle()
        },
        {
            "sample": new Sample("lead"),
            "graphic": new Circle()
        }
    ];
    // points.forEach(function (point) {
        points[0].sample.requestTrack();
        document.querySelector('.play').addEventListener('click', points[0].sample.playSample.bind(event, 0), false);
    // });
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
    initCanvas('gameCanvas', points);
}
