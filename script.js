// token to use mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLWt5bGUiLCJhIjoiY21rZTR3NW82MDNjazNscHdvZGRoNTJlYyJ9.gXrPIIVvGXk6SEwdzrbd1g'

// map object to insert and interact with
const map = new mapboxgl.Map({
    // the container id where it will be created
    container: 'my-map',

    // style obtained from my custom mapbox style
    style: 'mapbox://styles/sam-kyle/cmlfuds0e003w01s4hs6i6aa2',

    // starting center point for initial load in 
    center: [-79.294541, 43.67431],

    zoom: 9, // starting zoom
})

// got quartile values for each dataset (in excel) and placed them here for easy calling
const robbery_quartiles = [0, 44.25, 69.46, 96.22];
const assault_quartiles = [0, 466.73, 636.31, 866.48];
const autotheft_quartiles = [0, 122.99, 192.6, 266.14];

// set my color scale here to make it easy to edit later
const colors = ['#d64626', '#d87c42', '#e6aa61', '#F2F12D']

var active_layer = 'none'



map.on('load', () => {
    // this is the eventListener

    // must add data sources here and subsequent layers

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
        'data': 'https://raw.githubusercontent.com/SamanthaKyle/Lab2_final/refs/heads/main/data/assualt.geojson'
    }
    );
    // Add a layer showing the assault
    map.addLayer({
        'id': 'assault',
        'type': 'fill',
        'slot': 'middle',
        'source': 'assault',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'DATA'],
                assault_quartiles[0],
                colors[3],
                assault_quartiles[1],
                colors[2],
                assault_quartiles[2],
                colors[1],
                assault_quartiles[3],
                colors[0]
            ],
            'fill-opacity': 0.9

        }
    });

    map.addSource('robbery', {
        'type': 'geojson',
        'generateId': true,
        'data': 'https://raw.githubusercontent.com/SamanthaKyle/Lab2_final/refs/heads/main/data/robbery.geojson'
    }
    );
    // Add a layer showing the robbery rates
    map.addLayer({
        'id': 'robbery',
        'type': 'fill',
        'slot': 'middle',
        'source': 'robbery',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'DATA'],
                robbery_quartiles[0],
                colors[3],
                robbery_quartiles[1],
                colors[2],
                robbery_quartiles[2],
                colors[1],
                robbery_quartiles[3],
                colors[0]
            ],
            'fill-opacity': 0.9

        },
    });

    map.addSource('theft', {
        'type': 'geojson',
        'generateId': true,
        'data': 'https://raw.githubusercontent.com/SamanthaKyle/Lab2_final/refs/heads/main/data/theft.geojson'
    }
    );
    // Add a layer showing the autotheft rates
    map.addLayer({
        'id': 'theft',
        'type': 'fill',
        'slot': 'middle',
        'source': 'theft',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            //'fill-opacity': 0.9,
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'DATA'],
                autotheft_quartiles[0],
                colors[3],
                autotheft_quartiles[1],
                colors[2],
                autotheft_quartiles[2],
                colors[1],
                autotheft_quartiles[3],
                colors[0]
            ],

        },
    });

    // popup object to let us see police stations
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // show the popup when mouse enters it
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

    // remove popup when mouse leaves
    map.addInteraction('police-mouseleave-interaction', {
        type: 'mouseleave',
        target: { layerId: 'police' },
        handler: () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        }
    });

    /**
     * I wanted to add another feature here so that hovering over or clicking a neighbourhood
     * shows the requested crime stat for that neighbourhood
     * I think I know how to do that, but I didn't have time to get it functional
     * 
     * My attempt is here below
     */

    // show the popup when mouse enters it
    // map.addInteraction('zone-mouseenter-interaction', {
    //     type: 'mouseenter',
    //     target: { layerId: active_layer },
    //     handler: (e) => {
    //         map.getCanvas().style.cursor = 'pointer';

    //         // Copy the coordinates from the POI underneath the cursor
    //         const coordinates = e.feature.geometry.coordinates.slice();
    //         const description = e.feature.properties.DATA;

    //         // Populate the popup and set its coordinates based on the feature found.
    //         popup.setLngLat(coordinates).setHTML(description).addTo(map);
    //     }
    // });

    // remove popup when mouse leaves
    // map.addInteraction('zone-mouseleave-interaction', {
    //     type: 'mouseleave',
    //     target: { layerId: active_layer },
    //     handler: () => {
    //         map.getCanvas().style.cursor = '';
    //         popup.remove();
    //     }
    // });

    

});

// my buttons
const theft_button = document.getElementById('theft-click');
theft_button.addEventListener('click', () => {
    /*
    I know I should be doing this by having one variable like 'active_layer' that styles the active layer 
    and corresponding button one way and let the others fall to default

    And when a button is clicked I would just change the active-layer variable

    I just couldn't figure this out myself in time for submission
    */
    // when this button is pressed, ensure only the right layer is visible and others are not
    map.setLayoutProperty('assault', 'visibility', 'none');
    map.setLayoutProperty('robbery', 'visibility', 'none');
    map.setLayoutProperty('theft', 'visibility', 'visible');

    // similarly set the button style so they can know what data they are viewing
    theft_button.style.backgroundColor = 'white'
    robbery_button.style.backgroundColor = 'burlywood';
    assault_button.style.backgroundColor = 'burlywood';
    active_layer = theft_button
})

// analagous to above
const robbery_button = document.getElementById('robbery-click');
robbery_button.addEventListener('click', () => {
    map.setLayoutProperty('assault', 'visibility', 'none');
    map.setLayoutProperty('theft', 'visibility', 'none');
    map.setLayoutProperty('robbery', 'visibility', 'visible');
    robbery_button.setAttribute('fill-color', 'blue')
    robbery_button.style.backgroundColor = 'white'
    theft_button.style.backgroundColor = 'burlywood';
    assault_button.style.backgroundColor = 'burlywood';
    active_layer = robbery_button
})

// analagous to above
const assault_button = document.getElementById('assault-click');
assault_button.addEventListener('click', () => {
    map.setLayoutProperty('assault', 'visibility', 'visible');
    map.setLayoutProperty('theft', 'visibility', 'none');
    map.setLayoutProperty('robbery', 'visibility', 'none');
    assault_button.style.backgroundColor = 'white'
    robbery_button.style.backgroundColor = 'burlywood';
    theft_button.style.backgroundColor = 'burlywood';

    active_layer=assault_button
    
})



