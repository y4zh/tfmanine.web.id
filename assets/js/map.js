if (!window.mapboxgl) {
    console.error('Mapbox GL JS not loaded');
} else {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsd2lsIiwiYSI6ImNtajZmZGdmMjBicmwzZm93c2ZsNnpkeDEifQ.KW_3csyevdAsjY6A9Q9OCA';
}

let allMarkers = [];
let activeFilter = 'all'; // State untuk melacak filter yang sedang aktif

const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [106.910491, -6.241088], // MAN 9 Jakarta
    zoom: 14
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

const COLORS = {
    school: '#0072bc', train: '#FF5733', brt: '#FF5733', lrt: '#FF5733',
    busstop: '#22c55e', busstop_area: '#4b5563'
};

const ROUTE_COLORS = {
    '4F': '#b900e2', '7P': '#911d3c', '11Q': '#10c0ff', '11P': '#B2A5A3',
    'BK': '#006838', 'C': '#26baed', '11': '#2F4FA2', 'JAK': '#00b0ec'
};

function getRouteColor(routeCode) {
    if (ROUTE_COLORS[routeCode]) return ROUTE_COLORS[routeCode];
    if (routeCode && routeCode.toUpperCase().startsWith('JAK')) return ROUTE_COLORS['JAK'];
    return '#6b7280';
}

// --- FUNGSI FORMAT BADGE DENGAN ALIGNMENT TENGAH ---
function formatRoutesWithBadges(desc) {
    if (!desc) return '';
    const routePattern = /([A-Z0-9]+(?:\s?[A-Z0-9]+)?)\s*\(([^)]+)\)/gi;
    const matches = [...desc.matchAll(routePattern)];

    if (matches.length === 0) {
        return `<p style="margin: 0; font-size: 12px; color: #666; line-height: 1.5;">${desc}</p>`;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 6px;">';
    matches.forEach(match => {
        const routeCode = match[1].trim();
        const direction = match[2].trim();
        const color = getRouteColor(routeCode);
        
        html += `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="
                    background-color: ${color}; 
                    color: white; 
                    font-size: 10px; 
                    font-weight: 700; 
                    padding: 4px 8px; 
                    border-radius: 6px; 
                    white-space: nowrap; 
                    min-width: 36px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    height: 20px;
                ">${routeCode}</span>
                <span style="font-size: 11px; color: #4b5563; font-weight: 500; line-height: 1.2;">${direction}</span>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

const ICONS = {
    school: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16"><path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/><path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/></svg>`,
    train: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>`,
    brt: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>`,
    lrt: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
    busstop: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    busstop_area: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`
};

const WALK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>
</svg>`;

// --- 1. FUNGSI NAVBAR FILTER (POSISI DIPERBAIKI) ---
function createInteractiveLegend() {
    // Hapus legend lama jika ada
    const oldLegend = document.querySelector('.map-legend-navbar');
    if (oldLegend) oldLegend.remove();

    const navbarContainer = document.createElement('div');
    navbarContainer.className = 'map-legend-navbar';
    
    // Style Fix: Bottom naik ke 40px biar ga nabrak, z-index tinggi
    navbarContainer.style.cssText = `
        position: absolute;
        bottom: 40px; 
        left: 50%;
        transform: translateX(-50%);
        z-index: 20;
        background: white;
        padding: 8px 12px;
        border-radius: 99px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        gap: 12px;
        align-items: center;
        width: max-content;
        max-width: 90%;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none; 
        -webkit-overflow-scrolling: touch;
    `;
    
    // Hide scrollbar Webkit
    const style = document.createElement('style');
    style.innerHTML = `.map-legend-navbar::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);

    // Data Item Filter
    const legendItems = [
        { id: 'school', label: 'Sekolah', color: COLORS.school },
        { id: 'transit', label: 'Transit', color: COLORS.train },
        { id: 'busstop', label: 'Bus Stop Terdekat', color: COLORS.busstop },
        { id: 'busstop_area', label: 'Bus Stop Sekitar', color: COLORS.busstop_area }
    ];

    legendItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'legend-item';
        itemDiv.dataset.filter = item.id;
        
        // Style Item
        itemDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 6px;
            cursor: pointer;
            transition: all 0.2s;
            opacity: 1;
            flex-shrink: 0; 
            padding: 4px 8px;
            border-radius: 20px;
        `;

        const dot = document.createElement('span');
        dot.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: ${item.color};
            display: inline-block;
        `;

        const label = document.createElement('span');
        label.textContent = item.label;
        label.style.cssText = `
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 11px;
            color: #374151;
            font-weight: 600;
        `;

        itemDiv.appendChild(dot);
        itemDiv.appendChild(label);

        itemDiv.onclick = () => {
            if (activeFilter === item.id) {
                activeFilter = 'all';
            } else {
                activeFilter = item.id;
            }
            updateMapDisplay();
            updateLegendUI();
        };

        navbarContainer.appendChild(itemDiv);
    });

    const mapEl = document.getElementById('map-container');
    // Pastikan container relative agar absolute positioning jalan benar
    if (mapEl) {
        mapEl.style.position = 'relative'; 
        mapEl.appendChild(navbarContainer);
    }
}

// --- 2. UPDATE TAMPILAN FILTER (Highlight Aktif) ---
function updateLegendUI() {
    const items = document.querySelectorAll('.legend-item');
    items.forEach(item => {
        if (activeFilter === 'all') {
            item.style.opacity = '1';
            item.style.backgroundColor = 'transparent';
        } else {
            if (item.dataset.filter === activeFilter) {
                item.style.opacity = '1';
                item.style.backgroundColor = '#f3f4f6'; // Highlight background
            } else {
                item.style.opacity = '0.4';
                item.style.backgroundColor = 'transparent';
            }
        }
    });
}

// --- 3. UPDATE MARKER DI PETA ---
function updateMapDisplay() {
    allMarkers.forEach(data => {
        let isVisible = false;

        if (activeFilter === 'all') {
            isVisible = true;
        } else if (activeFilter === 'transit') {
            if (['train', 'brt', 'lrt'].includes(data.type)) isVisible = true;
        } else if (data.type === activeFilter) {
            isVisible = true;
        }

        if (isVisible) {
            data.marker.addTo(map);
        } else {
            data.marker.remove();
        }
    });
}

// --- 4. INITIALIZE MARKERS & POPUP ---
function initializeMarkers() {
    if (!window.appData || !window.appData.locations) {
        console.error('Data not loaded');
        return;
    }

    allMarkers = [];

    window.appData.locations.forEach(location => {
        const markerColor = COLORS[location.type] || '#4b5563';
        const iconSvg = ICONS[location.type] || ICONS.busstop_area;
        const isAreaStop = location.type === 'busstop_area';
        const markerSize = isAreaStop ? 24 : 32;
        const borderWidth = isAreaStop ? 2 : 3;

        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.cssText = `
            width: ${markerSize}px;
            height: ${markerSize}px;
            background-color: ${markerColor};
            border-radius: 50%;
            border: ${borderWidth}px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        el.innerHTML = iconSvg;

        let popupContent = `
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 200px; max-width: 280px; padding: 4px;">
                <h3 style="margin: 0 0 10px 0; font-weight: 700; color: ${markerColor}; font-size: ${isAreaStop ? '13px' : '14px'}; border-bottom: 1px solid #f3f4f6; padding-bottom: 6px;">${location.name}</h3>
        `;

        if (['train', 'brt', 'lrt', 'busstop', 'busstop_area'].includes(location.type)) {
            popupContent += formatRoutesWithBadges(location.desc);
        } else {
            popupContent += `<p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${location.desc}</p>`;
        }

        if (location.type === 'busstop' && location.walkTime !== undefined) {
            const timeColor = location.walkTime >= 3 ? '#eab308' : '#22c55e';
            popupContent += `
                <div style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; margin-top: 10px; background: ${timeColor}10; border-radius: 8px; border-left: 3px solid ${timeColor};">
                    <span style="color: ${timeColor}; display: flex; align-items: center; justify-content: center; min-width: 20px;">${WALK_ICON}</span>
                    <span style="font-size: 12px; font-weight: 600; color: ${timeColor};">${location.walkTime} menit</span>
                    <span style="font-size: 12px; color: #888;">•</span>
                    <span style="font-size: 12px; color: #666;">${location.distance} meter</span>
                </div>
            `;
        }

        popupContent += `</div>`;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

        const marker = new mapboxgl.Marker(el)
            .setLngLat(location.coords)
            .setPopup(popup)
            .addTo(map);

        allMarkers.push({
            type: location.type,
            marker: marker
        });
    });

    // Panggil Navbar Filter Baru
    createInteractiveLegend();
}

map.on('load', initializeMarkers);
