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
    const config = ROUTE_DATA_MAPPING[routeCode.toUpperCase().replace(/-/g, '.')];
    if (!config) return;

    try {
        const response = await fetch(`assets/data/${config.line}`);
        if (!response.ok) return;
        const geojsonData = await response.json();

        if (map.getSource('route-line')) {
            if (map.getLayer('stop-points')) map.removeLayer('stop-points');
            if (map.getLayer('line-main')) map.removeLayer('line-main');
            if (map.getLayer('line-casing')) map.removeLayer('line-casing');
            map.removeSource('route-line');
            map.removeSource('route-stops');
        }

        map.addSource('route-line', { type: 'geojson', data: geojsonData });
        map.addSource('route-stops', { type: 'geojson', data: `assets/data/${config.stops}` });

        map.addLayer({
            id: 'line-casing',
            type: 'line',
            source: 'route-line',
            paint: { 'line-color': '#FFFFFF', 'line-width': 6, 'line-opacity': 0.8 }
        });

        map.addLayer({
            id: 'line-main',
            type: 'line',
            source: 'route-line',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': config.color, 'line-width': 4 }
        });

        map.addLayer({
            id: 'stop-points',
            type: 'circle',
            source: 'route-stops',
            paint: {
                'circle-radius': 5,
                'circle-color': '#FFFFFF',
                'circle-stroke-width': 2,
                'circle-stroke-color': config.color
            }
        });

        map.on('click', 'stop-points', (e) => {
            const name = e.features[0].properties.stop_name;
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<p class="font-bold text-sm">${name}</p>`)
                .addTo(map);
        });

        map.on('mouseenter', 'stop-points', () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', 'stop-points', () => { map.getCanvas().style.cursor = ''; });

        const bounds = new mapboxgl.LngLatBounds();
        geojsonData.features.forEach(f => {
            const c = f.geometry.coordinates;
            if (f.geometry.type === 'MultiLineString') c.forEach(l => l.forEach(pt => bounds.extend(pt)));
            else c.forEach(pt => bounds.extend(pt));
        });
        map.fitBounds(bounds, { padding: 40, duration: 1500 });

    } catch (err) { console.error(err); }
}
