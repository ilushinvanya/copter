/**
 * Created by Ivan on 05.01.2017.
 */
//    var angleArr = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360];
var angleArr = [];
for (i = 0; i <= 24; i++) {
    angleArr.push(i * 15);
}
;
var map;
var copter;
var keys = {};
var mission;
var center = [59.935477, 30.300590];
var myCollection;
var timeout;

ymaps.ready(function () {
    map = new ymaps.Map('map', {
        center: center,
        zoom: 19
    }, {
        geoObjectDraggable: false,
        geoObjectOverlayFactory: 'default#interactiveGraphics'
    });


    var options = {
        iconLayout: 'default#image',
        iconImageHref: 'arrow.png',
        iconImageSize: [10, 10],
        iconImageOffset: [0, 0],
        iconOffset: [0, 0],
        iconImageRotation: 0
    };
    var geometryPoint = {
        type: 'Point',
        coordinates: center
    };


    copter = new ymaps.Circle([center, 7], null,
        {
            visible: false
            //draggable: false,
            //fill: false,
            //outline: false
        });
    //copter = new ymaps.GeoObject({
    //    geometry: geometryPoint,
    //    properties: {}
    //}, options);

    map.geoObjects.add(copter);

    setInterval(function () {
        printKeys();
    }, 10);


});

$(window).load(function () {
});

$(document).keydown(function (e) {
    keys[e.which] = true;
});

var easing = BezierEasing(.85,0,.65,.66);
console.log(); // 0.0
console.log(easing(0.5)); // 0.3125
console.log(easing(1)); // 1.0


$(document).keyup(function (e) {
    delete keys[e.which];
    if (e.which == 87) { //когда отпускаем "вверх"
        var time = 1;


        //функция торможения

        timeout = setInterval(function () {
            if (user.speed > 0 && time >= 0) {


                user.speed = user.speed * easing(time);
                time = time.toFixed(3) - 0.001;



                user.moveCopter();
                user.draw();



            } else {
                clearInterval(timeout);
            }
        }, 10)



    }
});

var user = {
    speed: 0,
    MIN_SPEED: 0,
    MAX_SPEED: 6,
    angle: 0,
    latitude: 59.935477,
    longitude: 30.300590,
    mod: 1,
    draw: function () {
        if (this.angle > 359) {
            this.angle = 0;
        }
        if (this.angle < 0) {
            this.angle = 359;
        }




        map.panTo([this.latitude, this.longitude], {
            delay: 0,
            duration: 0
        });

        copter.geometry.setCoordinates([this.latitude, this.longitude]);
        $('#helicopter').css('background-image', 'url(copter/' + angleToImg(this.angle) + '.png)');
    },
    moveCopter: function () {
        this.latitude += (this.speed / 1000000 * this.mod) * ( Math.cos(Math.PI / 180 * this.angle) );
        this.longitude += (this.speed / 1000000 * 2 * this.mod) * ( Math.sin(Math.PI / 180 * this.angle) );
    }
};
var missions = {
    0: {
        title: 'Эй ёоу, слетай к Растральным колоннам затуши там свет на 9 мая',
        points: [
            [59.943269, 30.306965],
            [59.944840, 30.305046]
        ],
        icon: 'fire.png',
        iconSize: [50, 50],
        fin: 'Молодец, ты выполнил задание'
    },
    1: {
        title: 'Лети к всаднику, у него для тебя есть задание',
        points: [
            [59.936454, 30.302201]
        ],
        icon: 'vsadnik.png',
        iconSize: [50, 50],
        fin: 'Молодец, ты выполнил задание'
    },
    2: {
        title: 'Надо собрать все метки на фонтанке',
        points: [
            [59.930491, 30.300461],
            [59.930588, 30.302114],
            [59.930674, 30.303787],
            [59.930804, 30.305461],
            [59.931148, 30.306834],
            [59.931514, 30.308379],
            [59.931924, 30.310289],
            [59.932376, 30.312349],
            [59.932796, 30.314387],
            [59.933216, 30.316083]
        ],
        icon: 'circle.png',
        iconSize: [50, 50],
        fin: 'Молодец, ты выполнил задание'
    }
};


function printKeys() {
    for (var i in keys) {
        if (!keys.hasOwnProperty(i)) continue;
        if (i == 87) { //вверх
            user.mod = 1;

            clearInterval(timeout);
            if (user.speed < user.MAX_SPEED) {
                user.speed += 0.1;
            }
            user.moveCopter();
        }
        if (i == 83) { //вниз
            user.speed = 2;
            user.mod = -1;
            user.moveCopter();
        }
        if (i == 65) { //влево
            user.angle = user.angle - 2;
        }

        if (i == 68) { //вправо
            user.angle = user.angle + 2;
        }
        user.draw();
    }


    if (mission != null) {
        var objInCopter = ymaps.geoQuery(map.geoObjects).searchInside(copter);

        if (objInCopter.getLength() > 0) {
            objInCopter.removeFrom(myCollection);
        }

        if (myCollection.getLength() < 1) {
            alert(missions[mission].fin);
            mission = null;
        }

    }
}


function angleToImg(angle) {
    var rad;
    if (angle > -15 && angle <= angleArr[1]) {
        rad = angleArr[0];
    } else if (angle > angleArr[1] && angle <= angleArr[2]) {
        rad = angleArr[1];
    } else if (angle > angleArr[2] && angle <= angleArr[3]) {
        rad = angleArr[2];
    } else if (angle > angleArr[3] && angle <= angleArr[4]) {
        rad = angleArr[3];
    } else if (angle > angleArr[4] && angle <= angleArr[5]) {
        rad = angleArr[4];
    } else if (angle > angleArr[5] && angle <= angleArr[6]) {
        rad = angleArr[5];
    } else if (angle > angleArr[6] && angle <= angleArr[7]) {
        rad = angleArr[6];
    } else if (angle > angleArr[7] && angle <= angleArr[8]) {
        rad = angleArr[7];
    } else if (angle > angleArr[8] && angle <= angleArr[9]) {
        rad = angleArr[8];
    } else if (angle > angleArr[9] && angle <= angleArr[10]) {
        rad = angleArr[9];
    } else if (angle > angleArr[10] && angle <= angleArr[11]) {
        rad = angleArr[10];
    } else if (angle > angleArr[11] && angle <= angleArr[12]) {
        rad = angleArr[11];
    } else if (angle > angleArr[12] && angle <= angleArr[13]) {
        rad = angleArr[12];
    } else if (angle > angleArr[13] && angle <= angleArr[14]) {
        rad = angleArr[13];
    } else if (angle > angleArr[14] && angle <= angleArr[15]) {
        rad = angleArr[14];
    } else if (angle > angleArr[15] && angle <= angleArr[16]) {
        rad = angleArr[15];
    } else if (angle > angleArr[16] && angle <= angleArr[17]) {
        rad = angleArr[16];
    } else if (angle > angleArr[17] && angle <= angleArr[18]) {
        rad = angleArr[17];
    } else if (angle > angleArr[18] && angle <= angleArr[19]) {
        rad = angleArr[18];
    } else if (angle > angleArr[19] && angle <= angleArr[20]) {
        rad = angleArr[19];
    } else if (angle > angleArr[20] && angle <= angleArr[21]) {
        rad = angleArr[20];
    } else if (angle > angleArr[21] && angle <= angleArr[22]) {
        rad = angleArr[21];
    } else if (angle > angleArr[22] && angle <= angleArr[23]) {
        rad = angleArr[22];
    } else if (angle > angleArr[23] && angle <= angleArr[24]) {
        rad = angleArr[23];
    } else {
        console.log('hyi znaet ' + angle);
    }
    return rad;
}
function startMission(level, stage) {
    if (stage) {
        myCollection.removeAll();
    } else {
        alert(missions[level].title);
    }

    mission = level;

    myCollection = new ymaps.GeoObjectCollection(null, {
        iconLayout: 'default#image',
        iconImageSize: missions[level].iconSize,
        iconImageOffset: [-missions[level].iconSize[0] / 2, -missions[level].iconSize[1] / 2],
        iconImageHref: missions[level].icon
    });

    for (var i = 0; i < missions[level].points.length; i++) {
        var placemarkCoords = missions[level].points[i];
        var placemark = new ymaps.Placemark([placemarkCoords[0], placemarkCoords[1]]);

        myCollection.add(placemark);
    }
    map.geoObjects.add(myCollection);
}