import './main.css';
import logoPath from './logo.svg';
const { App } = require('./App.elm');

var app = App.embed(document.getElementById('root'), logoPath);

app.ports.whereami.subscribe(function(lox){
    if (lox.length > 0) {
        console.log("hi", lox[0]);

        var loc = lox[0];

        map.setCenter(loc);
        // marker.setPosition({lng, lat});

        // Create new marker and add it to the map
        new google.maps.Marker({
            position: loc,
            map: map,
            title: 'Been there'
        });

        if (polygon) {
            console.log("Doing something with...", polygon);
            window.polygon.setPath(lox);
            polygon.setMap(map);
        }
    }
});
