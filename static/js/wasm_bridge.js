import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {Vector} from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import {Vector as SourceVector} from 'ol/source';
import OSM from 'ol/source/OSM';
import {GPX, KML} from 'ol/format';
import {Style, Circle, Fill, Stroke} from 'ol/style';

export function read_gpx(gpx_url) {
    console.log("received: " + gpx_url)

    const style = {
        'Point': new Style({
            image: new Circle({
                fill: new Fill({
                    color: 'rgba(255,255,0,0.4)'
                }),
                radius: 5,
                stroke: new Stroke({
                    color: '#ff0',
                    width: 1
                })
            })
        }),
        'LineString': new Style({
            stroke: new Stroke({
                color: '#f00',
                width: 3
            })
        }),
        'MultiLineString': new Style({
            stroke: new Stroke({
                color: '#bb00ff',
                width: 3
            })
        })
    };

    const vector = new Vector ({
        source: new SourceVector({
            url: gpx_url,
            format: new GPX()
        }),
        style: function(feature) {
            return style[feature.getGeometry().getType()];
        },
        useSpatialIndex: false
    });
    vector.set('name', 'latest');

    window.mymap.addLayer(vector);
    vector.getSource().once('change', function (evt) {
        const source = evt.target;
        if (source.getState() === 'ready') {
            const extent = source.getExtent();
            window.mymap.getView().fit(extent, window.mymap.getSize());
        }
    });

    return vector.get('name');
}

export async function read_kml(kml_url) {
    console.log("Printing kml" + kml_url)
    const style = {
        'Point': new Style({
            image: new Circle({
                fill: new Fill({
                    color: 'rgba(255,255,0,0.4)'
                }),
                radius: 5,
                stroke: new Stroke({
                    color: '#ff0',
                    width: 1
                })
            })
        }),
        'LineString': new Style({
            stroke: new Stroke({
                color: '#f00',
                width: 3
            })
        }),
        'MultiLineString': new Style({
            stroke: new Stroke({
                color: '#bb00ff',
                width: 3
            })
        })
    };

    const vector = new Vector ({
        source: new SourceVector({
            url: kml_url,
            format: new KML()
        }),
        style: function(feature) {
            return style[feature.getGeometry().getType()];
        },
        useSpatialIndex: false
    });
    vector.set('name', 'latest');

    window.mymap.addLayer(vector);
    vector.getSource().once('change', function (evt) {
        const source = evt.target;
        if (source.getState() === 'ready') {
            const extent = source.getExtent();
            window.mymap.getView().fit(extent, window.mymap.getSize());
        }
    });

    return vector.get('name');
}

export function remove(id) {
    const layers = window.mymap.getLayers().getArray();
    for (const layer of layers) {
        let name = layer.get('name');
        console.log("Found layer: " + name);
        if (name === id) {
            window.mymap.removeLayer(layer);
        }
    }

}
