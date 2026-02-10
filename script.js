mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLWt5bGUiLCJhIjoiY21rZTR3NW82MDNjazNscHdvZGRoNTJlYyJ9.gXrPIIVvGXk6SEwdzrbd1g'

const map = new mapboxgl.Map({
    container: 'my-map',

    style: 'mapbox://styles/sam-kyle/cmlfuds0e003w01s4hs6i6aa2',
    center: [-79.294541, 43.67431],

    // starting position [lng, lat]
    zoom: 10, // starting zoom
})

map.on('load', () => {
    // this is the eventListener
    // Add a data source containing GeoJSON data

    // must add data sources here

    map.addSource('police', {
        'type': 'geojson',
        'generateId': true,
        'data': 'https://raw.githubusercontent.com/SamanthaKyle/Lab2_final/refs/heads/main/data/police.geojson'
    }
    );
    // Add a layer showing the places.
    map.addLayer({
        'id': 'police',
        'type': 'circle',
        'slot': 'top',
        'source': 'police',
        'paint': {
            'circle-color': 'blue',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    map.addSource('assault', {
        'type': 'geojson',
        'generateId': true,
        'data': 'https://raw.githubusercontent.com/SamanthaKyle/Lab2_final/refs/heads/main/data/crime.geojson'
    }
    );
    // Add a layer showing the places.
    map.addLayer({
        'id': 'assault',
        'type': 'fill',
        'slot': 'middle',
        'source': 'assault',
        'paint': {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'ASSAULT_RATE_2025'],
                    0,
                    '#F2F12D',
                    330,
                    '#EED322',
                    660,
                    '#E6B71E',
                    990,
                    '#DA9C20',
                    1320,
                    '#CA8323',
                    1650,
                    '#B86B25',
                    1980,
                    '#A25626',
                    2310,
                    '#8B4225',
                    4400,
                    '#723122'
                ],
                'fill-opacity': 0.9
            
        }
    });

    map.addSource('robbery', {
        'type': 'geojson',
        'generateId': true,
        'data': 'https://raw.githubusercontent.com/SamanthaKyle/Lab2_final/refs/heads/main/data/crime.geojson'
    }
    );
    // Add a layer showing the places.
    // map.addLayer({
    //     'id': 'robbery',
    //     'type': 'fill',
    //     'slot': 'middle',
    //     'source': 'robbery',
    //     'paint': {
    //         'fill-color': [
    //             'interpolate',
    //             ['linear'],
    //             ['get', 'ROBBERY_RATE_2025'],
    //             0,
    //             '#F2F12D',
    //             330,
    //             '#EED322',
    //             660,
    //             '#E6B71E',
    //             990,
    //             '#DA9C20',
    //             1320,
    //             '#CA8323',
    //             1650,
    //             '#B86B25',
    //             1980,
    //             '#A25626',
    //             2310,
    //             '#8B4225',
    //             4400,
    //             '#723122'
    //         ],
    //         'fill-opacity': 0.9

    //     },
    //     'visibile': 'none'
    // });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.addInteraction('police-mouseenter-interaction', {
        type: 'mouseenter',
        target: { layerId: 'police' },
        handler: (e) => {
            map.getCanvas().style.cursor = 'pointer';

            // Copy the coordinates from the POI underneath the cursor
            const coordinates = e.feature.geometry.coordinates.slice();
            const description = e.feature.properties.FACILITY;

            // Populate the popup and set its coordinates based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        }
    });

    map.addInteraction('police-mouseleave-interaction', {
        type: 'mouseleave',
        target: { layerId: 'police' },
        handler: () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        }
    });
    
});


const theft_button = document.getElementById('theft-click');
theft_button.addEventListener('click', () => {
    //alert('clicked theft button');
})

const robbery_button = document.getElementById('robbery-click');
robbery_button.addEventListener('click', () => {
    alert('clicked robbery button');
    map.setLayoutProperty('robbery', 'visibility', 'visible')
})



