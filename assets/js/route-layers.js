const ROUTE_DATA_MAPPING = {
    '4F': {
        line: 'Transjakarta - 4F Pinang Ranti - Pulo Gadung.geojson',
        stops: 'Transjakarta - 4F Pinang Ranti - Pulo Gadung - Stops.geojson',
        color: '#553C62'
    },
    '7P': {
        line: 'Transjakarta - 7P Pondok Kelapa - Cawang Cililitan.geojson',
        stops: 'Transjakarta - 7P Pondok Kelapa - Cawang Cililitan - Stops.geojson',
        color: '#916131'
    },
    '11Q': {
        line: 'Transjakarta - 11Q Kampung Melayu - Pulo Gebang via BKT.geojson',
        stops: 'Transjakarta - 11Q Kampung Melayu - Pulo Gebang via BKT - Stops.geojson',
        color: '#504F92'
    },
    '11P': {
        line: 'Transjakarta - 11P Rusun Pondok Bambu - Walikota Jakarta Timur.geojson',
        stops: 'Transjakarta - 11P Rusun Pondok Bambu - Walikota Jakarta Timur - Stops.geojson',
        color: '#717092'
    },
    'JAK.02': {
        line: 'Transjakarta - JAK.02 Kampung Melayu - Duren Sawit.geojson',
        stops: 'Transjakarta - JAK.02 Kampung Melayu - Duren Sawit - Stops.geojson',
        color: '#00609C'
    },
    'JAK.85': {
        line: 'Transjakarta - JAK.85 Bintara - Cipinang Indah.geojson',
        stops: 'Transjakarta - JAK.85 Bintara - Cipinang Indah - Stops.geojson',
        color: '#00609C'
    }
};

async function initRouteMap(map, routeCode) {
    if (!routeCode) return;
    
    const config = ROUTE_DATA_MAPPING[routeCode.toUpperCase()];
    if (!config) return;

    const linePath = `assets/data/${config.line}`;
    const stopPath = `assets/data/${config.stops}`;

    try {
        const response = await fetch(linePath);
        if (!response.ok) return;
        const geojsonData = await response.json();

        if (map.getSource('route-line')) {
            map.removeLayer('stop-points');
            map.removeLayer('line-main');
            map.removeLayer('line-casing');
            map.removeSource('route-line');
            map.removeSource('route-stops');
        }

        map.addSource('route-line', { type: 'geojson', data: geojsonData });
        map.addSource('route-stops', { type: 'geojson', data: stopPath });

        map.addLayer({
            id: 'line-casing',
            type: 'line',
            source: 'route-line',
            paint: {
                'line-color': '#FFFFFF',
                'line-width': 6,
                'line-opacity': 0.8
            }
        });

        map.addLayer({
            id: 'line-main',
            type: 'line',
            source: 'route-line',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
                'line-color': config.color,
                'line-width': 4
            }
        });

        map.addLayer({
            id: 'stop-points',
            type: 'circle',
            source: 'route-stops',
            paint: {
                'circle-radius': 4,
                'circle-color': '#FFFFFF',
                'circle-stroke-width': 2,
                'circle-stroke-color': config.color
            }
        });

        const bounds = new mapboxgl.LngLatBounds();
        geojsonData.features.forEach(feature => {
            if (feature.geometry.type === 'MultiLineString') {
                feature.geometry.coordinates.forEach(line => {
                    line.forEach(coord => bounds.extend(coord));
                });
            } else if (feature.geometry.type === 'LineString') {
                feature.geometry.coordinates.forEach(coord => bounds.extend(coord));
            }
        });

        map.fitBounds(bounds, { padding: 50, duration: 2000 });

    } catch (err) {
        console.error(err);
    }
}
