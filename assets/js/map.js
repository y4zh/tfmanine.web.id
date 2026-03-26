if (!window.mapboxgl) {
    console.error('Mapbox GL JS not loaded');
} else {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsd2lsIiwiYSI6ImNtajZmZGdmMjBicmwzZm93c2ZsNnpkeDEifQ.KW_3csyevdAsjY6A9Q9OCA';
}

let allMarkers = [];
let activeFilter = 'all';

const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [106.910491, -6.241088],
    zoom: 14,
    attributionControl: false
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

const COLORS = { school: '#0072bc', train: '#FF5733', brt: '#FF5733', lrt: '#FF5733', busstop: '#22c55e', busstop_area: '#4b5563' };

function getRouteColor(code) {
    if (window.routeColors && window.routeColors[code]) return window.routeColors[code];
    if (code && code.startsWith('JAK')) return window.routeColors['JAK'];
    return '#6b7280';
}

function formatRoutesWithBadges(desc) {
    if (!desc) return '';
    const routePattern = /([A-Z0-9]+(?:\s?[A-Z0-9]+)?)\s*\(([^)]+)\)/gi;
    const matches = [...desc.matchAll(routePattern)];
    if (matches.length === 0) return `<p style="margin: 0; font-size: 12px; color: #666;">${desc}</p>`;
    let html = '<div style="display: flex; flex-direction: column; gap: 6px;">';
    matches.forEach(m => {
        const color = getRouteColor(m[1].trim());
        html += `<div style="display: flex; align-items: center; gap: 8px;"><span style="background-color: ${color}; color: white; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 6px; min-width: 36px; display: flex; align-items: center; justify-content: center; height: 20px;">${m[1].trim()}</span><span style="font-size: 11px; color: #4b5563;">${m[2].trim()}</span></div>`;
    });
    return html + '</div>';
}

function updateDisplay() {
    allMarkers.forEach(m => {
        let show = activeFilter === 'all';
        if (activeFilter === 'transit') show = ['train', 'brt', 'lrt'].includes(m.type);
        else if (m.type === activeFilter) show = true;
        show ? m.marker.addTo(map) : m.marker.remove();
    });
}

function createInteractiveLegend() {
    const oldLegend = document.querySelector('.map-legend-navbar');
    if (oldLegend) oldLegend.remove();

    const nav = document.createElement('div');
    nav.className = 'map-legend-navbar';
    nav.style.cssText = `position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 20; background: white; padding: 8px 12px; border-radius: 99px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; gap: 12px; align-items: center; width: max-content; max-width: 90%; overflow-x: auto;`;
    
    const items = [
        { id: 'school', label: 'Sekolah', color: COLORS.school },
        { id: 'transit', label: 'Transit', color: COLORS.train },
        { id: 'busstop', label: 'Halte', color: COLORS.busstop },
        { id: 'busstop_area', label: 'Sekitar', color: COLORS.busstop_area }
    ];
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'legend-item';
        div.dataset.filter = item.id;
        div.style.cssText = `display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 4px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; transition: all 0.2s;`;
        div.innerHTML = `<span style="width: 8px; height: 8px; border-radius: 50%; background: ${item.color};"></span>${item.label}`;
        div.onclick = () => {
            activeFilter = (activeFilter === item.id) ? 'all' : item.id;
            document.querySelectorAll('.legend-item').forEach(i => {
                i.style.opacity = (activeFilter === 'all' || i.dataset.filter === activeFilter) ? '1' : '0.4';
                i.style.backgroundColor = (activeFilter !== 'all' && i.dataset.filter === activeFilter) ? '#f3f4f6' : 'transparent';
            });
            updateDisplay();
        };
        nav.appendChild(div);
    });
    
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) mapContainer.appendChild(nav);
}

function initMarkers() {
    if (!window.appData) {
        console.error("Data.js belum dimuat.");
        return;
    }
    window.appData.locations.forEach(loc => {
        const isArea = loc.type === 'busstop_area';
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.cssText = `width: ${isArea ? 24 : 32}px; height: ${isArea ? 24 : 32}px; background: ${COLORS[loc.type] || '#4b5563'}; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; cursor: pointer;`;
        
        let iconHtml = '<img src="assets/images/icon-bus.svg" class="w-4 h-4">';
        if (loc.type === 'school') iconHtml = '<img src="assets/images/sublogo.svg" class="w-5 h-5">';
        else if (loc.type === 'train' || loc.type === 'lrt') iconHtml = '<img src="assets/images/icon-train.svg" class="w-4 h-4">';
        
        el.innerHTML = iconHtml;
        
        const marker = new mapboxgl.Marker(el).setLngLat(loc.coords).setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<div style="padding: 4px;"><h3 style="margin: 0 0 8px 0; font-weight: 700; font-size: 14px;">${loc.name}</h3>${formatRoutesWithBadges(loc.desc)}</div>`)).addTo(map);
        allMarkers.push({ type: loc.type, marker: marker });
    });
    
    // Munculkan legend setelah markers dibuat
    createInteractiveLegend();
}

if (map.loaded()) {
    initMarkers();
} else {
    map.on('load', initMarkers);
}
