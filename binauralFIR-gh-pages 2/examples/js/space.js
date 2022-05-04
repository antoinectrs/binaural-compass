
class Space {
    constructor(id) {
        // this.currentPosition = {
        //     lat: null, lng: null,
        // }
        // console.log(PARAMS.bubble[id][0].lat);
        this.destination = {
            lat: PARAMS.bubble[id][0].lat, lng: PARAMS.bubble[id][0].lng,
        }
        this.orientation = null;
        this.offset = null;
    }
    compassReady(currentPosition) {
        currentPosition = { lat: compass.position.coords.latitude, lng: compass.position.coords.longitude };
        this.orientation = {
            deg: compass.getBearingToDestination(currentPosition, { lat: this.destination.lat, lng: this.destination.lng }),
            // offset: calcCrow(currentPosition.lat, currentPosition.lng, lat1, lng1)
        }
        return {
            audio: this.convertToBinau(this.orientation.deg),
            graphic: this.orientation.deg,
        }
        // return this.orientation;
    }
    calcOff(lat1, lon1, lat2 = this.destination.lat, lon2 = this.destination.lng) {
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
            // this.offset = dist;
        //    console.log();
            return dist;
        }
    }
    calcOffset(lat1, lon1, lat2 = this.destination.lat, lon2 = this.destination.lng) {
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
            this.offset = dist;
            console.log(this.offset);
            return this.offset;
        }
    }
    test() {
        return "hello";
    }
    convertToBinau(result, output) {
        if (result >= 180) {
            output = mapRange(result, 360, 180, 0, 180);
        } else {
            output = (-result);
        }
        return output;
    }
    asignColor(statut) {
        let checkColor
        switch (statut) {
            case 'parc':
                checkColor = "green";
                break;
            case 'work':
                checkColor = "red";
                break;
            case 'lac':
                checkColor = "blue";
                break;
            default:
                console.log("bug");
        }
        return checkColor;
    }
    calcCrow(lat1, lon1, lat2, lon2) {
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
}