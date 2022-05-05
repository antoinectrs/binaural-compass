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
            "space": new Space(1),
        },
        {
            "sample": new Sample("lead"),
            "graphic": new Circle(),
            "space": new Space(2),
        }
    ];
    document.querySelector('#bass').addEventListener('click', () => { PARAMS.points[1].sample.playSample(maxIs(mapArray(PARAMS.points))); });
    document.querySelector('#lead').addEventListener('click', () => { PARAMS.points[2].sample.playSample(maxIs(mapArray(PARAMS.points))) });
    document.querySelector('#drum').addEventListener('click', () => { PARAMS.points[0].sample.playSample(maxIs(mapArray(PARAMS.points))) });

    PARAMS.points.forEach((point) => {
        point.sample.requestTrack();
    });
    // --------- /LOAD SOUND ----------

    // ---------- LOAD POSI ----------
    compass = new Compass();
    compass.init(compassReady);
    // ---------- LOAD MAP ----------
    let myMap = null;
    navigator.geolocation.watchPosition(pos => {
        if (myMap == null) {
            // initMap
            myMap = initMap(pos);
            PARAMS.points.forEach(function (element) {
                // element.space.calcOffset(pos.coords.latitude, pos.coords.longitude)
                const space = element.space.calcOff(pos.coords.latitude, pos.coords.longitude,false,element);   
                element.graphic.convertToCanvas(space);
            })
            PARAMS.bubble.forEach(function (element) {
                addPin(element[0], myMap);
                // element.distBeMe = calcCrow(element[0].lat,
                //     element[0].lng,
                //     pos.coords.latitude,
                //     pos.coords.longitude);
            });
            // initInteractionMap(myMap);
        } else {
            panMap(pos, myMap);
              PARAMS.points.forEach(function (element) {
                // element.space.calcOffset(pos.coords.latitude, pos.coords.longitude)
                const space = element.space.calcOff(pos.coords.latitude, pos.coords.longitude,true,element);   
                element.graphic.convertToCanvas(space);
            })
            let result = PARAMS.bubble.forEach(function (element) {

                addPin(element[0], myMap);
                // element.distBeMe = calcCrow(element[0].lat,
                //     element[0].lng,
                //     pos.coords.latitude,
                //     pos.coords.longitude);
            });
        }
    });
    // --------- /LOAD MAP ----------

    // ---------- DOM ----------
    clicClass(".active", "on")

    // --------- /DOM ----------
    initCanvas('gameCanvas', PARAMS.points);
    function m(){
        return
    }
}
