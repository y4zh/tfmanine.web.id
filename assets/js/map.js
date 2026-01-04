if (!window.mapboxgl) {
    console.error('Mapbox GL JS not loaded');
} else {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsd2lsIiwiYSI6ImNtajZmZGdmMjBicmwzZm93c2ZsNnpkeDEifQ.KW_3csyevdAsjY6A9Q9OCA';
}

// Initialize Map
const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [106.910491, -6.241088], // MAN 9 Jakarta (updated coordinates)
    zoom: 14
});

// Add navigation controls
map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// Colors
const COLORS = {
    school: '#0072bc',       // Blue - School
    train: '#FF5733',        // Orange - KRL
    brt: '#FF5733',          // Orange - BRT
    lrt: '#FF5733',          // Orange - LRT
    busstop: '#22c55e',      // Green - Bus stops near school
    busstop_area: '#4b5563'  // Gray - Area bus stops (surrounding areas)
};

// Route badge colors
const ROUTE_COLORS = {
    '4F': '#b900e2',
    '7P': '#911d3c',
    '11Q': '#10c0ff',
    '11P': '#B2A5A3',
    'BK': '#006838',
    'C': '#26baed',
    '11' : '#2F4FA2',
    'JAK': '#00b0ec'  // Default for all JAK routes
};

// Get route color
function getRouteColor(routeCode) {
    if (ROUTE_COLORS[routeCode]) {
        return ROUTE_COLORS[routeCode];
    }
    // Check if it starts with JAK
    if (routeCode.toUpperCase().startsWith('JAK')) {
        return ROUTE_COLORS['JAK'];
    }
    return '#6b7280'; // Default gray
}

// Parse description to extract routes and format them with badges
function formatRoutesWithBadges(desc) {
    if (!desc) return '';

    // Regex to capture: Code (e.g., "11", "JAK 85", "C") followed by Description in parentheses
    // Updated to be more flexible for different formats
    const routePattern = /([A-Z0-9]+(?:\s?[A-Z0-9]+)?)\s*\(([^)]+)\)/gi;
    const matches = [...desc.matchAll(routePattern)];

    if (matches.length === 0) {
        // Fallback: If no parentheses format, try to split by comma for simple lists
        // This handles cases where description might just be "JAK 85, JAK 26" without parentheses details
        if (desc.includes(',') || /^[A-Z0-9\s]+$/.test(desc)) {
             const potentialRoutes = desc.split(',').map(s => s.trim());
             let html = '<div style="display: flex; flex-wrap: wrap; gap: 4px;">';
             potentialRoutes.forEach(r => {
                 // heuristic: if short (likely a code), badge it. if long, keep text.
                 if (r.length < 10) {
                     const color = getRouteColor(r);
                     html += `<span style="background-color: ${color}; color: white; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${r}</span>`;
                 } else {
                     html += `<span style="font-size: 11px; color: #555;">${r}</span>`;
                 }
             });
             html += '</div>';
             return html;
        }

        // No recognized pattern, return plain text
        return `<p style="margin: 0; font-size: 12px; color: #666; line-height: 1.5;">${desc}</p>`;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 4px;">';

    matches.forEach(match => {
        const routeCode = match[1].trim();
        const direction = match[2].trim();
        const color = getRouteColor(routeCode);

        html += `
            <div style="display: flex; align-items: center; gap: 6px;">
                <span style="background-color: ${color}; color: white; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; white-space: nowrap; min-width: 30px; text-align: center;">${routeCode}</span>
                <span style="font-size: 11px; color: #555;">${direction}</span>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// Icons for each type
const ICONS = {
    school: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
    </svg>`,
    train: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
        <path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>`,
    brt: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
    </svg>`,
    lrt: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
        <path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>`,
    busstop: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`,
    busstop_area: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24">
        <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`
};

// Walking icon SVG
const WALK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
    <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.75 1.75 0 0 1-.088.395l-.318.906.213.242a.75.75 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25z"/>
    <path d="M6.25 11.745v-1.418l1.204 1.375-.337.96a.75.75 0 0 1-.94.465A1.5 1.5 0 0 1 6.25 11.745z"/>
</svg>`;

// Add markers for all locations
function initializeMarkers() {
    if (!window.appData || !window.appData.locations) {
        console.error('Data not loaded');
        return;
    }

    window.appData.locations.forEach(location => {
        // Determine marker color based on type
        const markerColor = COLORS[location.type] || '#4b5563';
        const iconSvg = ICONS[location.type] || ICONS.busstop_area;

        // Determine marker size based on type
        const isAreaStop = location.type === 'busstop_area';
        const markerSize = isAreaStop ? 24 : 32;
        const borderWidth = isAreaStop ? 2 : 3;

        // Create custom marker element
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

        // Build popup content
        let popupContent = `
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 180px; max-width: 280px;">
                <h3 style="margin: 0 0 8px 0; font-weight: 700; color: ${markerColor}; font-size: ${isAreaStop ? '13px' : '14px'};">${location.name}</h3>
        `;

        // Format routes with colored badges for ALL transport types now (train, brt, lrt, busstop)
        // Previously this was restricted to just busstop/busstop_area
        if (['train', 'brt', 'lrt', 'busstop', 'busstop_area'].includes(location.type)) {
            popupContent += formatRoutesWithBadges(location.desc);
        } else {
            popupContent += `<p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${location.desc}</p>`;
        }

        // Add walking info for nearby bus stops only
        if (location.type === 'busstop' && location.walkTime !== undefined) {
            const timeColor = location.walkTime >= 3 ? '#eab308' : '#22c55e'; // Yellow if >= 3 min, green otherwise
            popupContent += `
                <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; margin-top: 8px; background: ${timeColor}15; border-radius: 8px; border-left: 3px solid ${timeColor};">
                    <span style="color: ${timeColor}; display: flex; align-items: center;">${WALK_ICON}</span>
                    <span style="font-size: 12px; font-weight: 600; color: ${timeColor};">${location.walkTime} menit</span>
                    <span style="font-size: 12px; color: #888;">•</span>
                    <span style="font-size: 12px; color: #666;">${location.distance} meter</span>
                </div>
            `;
        }

        popupContent += `</div>`;

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(popupContent);

        // Add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(location.coords)
            .setPopup(popup)
            .addTo(map);
    });
}

// Initialize markers when map loads
map.on('load', initializeMarkers);
