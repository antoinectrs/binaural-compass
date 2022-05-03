window.onload = function () {
    // ---------- LOAD SOUND ----------
    PARAMS.points = [
        {
            "sample": new Sample("drum"),
            "graphic": new Circle(),
            "space": new Space(0),
        },
        {
            "sample": new Sample("bass"),
            "graphic": new Circle(),
            "space": new Space(0),
        },
        {
            "sample": new Sample("lead"),
            "graphic": new Circle(),
            "space": new Space(0),
        }
    ];
    document.querySelector('#bass').addEventListener('click', () => { PARAMS.points[1].sample.playSample(maxIs(mapArray(PARAMS.points))); });
    document.querySelector('#lead').addEventListener('click', () => { PARAMS.points[2].sample.playSample(maxIs(mapArray(PARAMS.points))) });
    document.querySelector('#drum').addEventListener('click', () => { PARAMS.points[0].sample.playSample(maxIs(mapArray(PARAMS.points))) });

    PARAMS.points.forEach((point) => {
        point.sample.requestTrack();
    });
    // document.querySelector('#bass').addEventListener('click', points[1].sample.playSample.bind(event, 0), false);
    // document.querySelector('#lead').addEventListener('click', points[2].sample.playSample.bind(event, 0), false);

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
    initCanvas('gameCanvas', PARAMS.points);
}
