import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';

const sydneyLonLat = [151.2093,-33.8688];
const startLocation = fromLonLat(sydneyLonLat);
let mymap = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        })
    ],
    view: new View({
        center: startLocation,
        zoom: 6
    })
});
export default mymap;