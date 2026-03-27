let currentFilter = null;
let currentSearchQuery = "";
let currentRouteDetail = null;
let currentDirectionIndex = 0; // State untuk navigasi rute

function renderCategories() {
    const container = document.getElementById('category-grid');
    if (!container) return; 

    const categories = [
        { id: 'brt', name: 'Transjakarta', icon: 'icon-bus.svg' },
        { id: 'mikro', name: 'Mikrotrans', icon: 'icon-mikrotrans.svg' },
        { id: 'krl', name: 'KRL', icon: 'icon-train.svg' },
        { id: 'lrt', name: 'LRT', icon: 'icon-lrt.svg' }
    ];

    container.innerHTML = categories.map(cat => `
        <button onclick="filterRoute('${cat.id}')" 
                class="category-btn group bg-white rounded-2xl p-4 shadow-sm border-2 border-transparent hover:border-primary/10 transition-all duration-300 flex flex-col items-center justify-center h-32 md:h-40" 
                data-mode="${cat.id}">
            <img src="assets/images/${cat.icon}" alt="${cat.name}" 
                 class="w-12 h-12 md:w-16 md:h-16 object-contain mb-3 transition-transform group-hover:scale-110">
            <span class="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors font-sans">${cat.name}</span>
        </button>
    `).join('');
}

function filterRoute(mode) {
    currentFilter = mode;
    currentSearchQuery = ""; 
    
    const searchInput = document.getElementById('route-search');
    if(searchInput) searchInput.value = "";

    const section = document.getElementById('route-list-section');
    if (section) {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active', 'border-primary'));

        const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
        if (activeBtn) activeBtn.classList.add('active', 'border-primary');

        section.classList.remove('hidden');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        updateRouteListUI();
    }
}

function updateRouteListUI() {
    const container = document.getElementById('route-list');
    const title = document.getElementById('route-list-title');
    const count = document.getElementById('route-count');
    
    if (!window.appData) return;

    let filteredRoutes = window.appData.routes;

    if (currentFilter === 'brt') {
        filteredRoutes = filteredRoutes.filter(r => r.mode === 'brt' || r.mode === 'nbrt');
        if(title) title.textContent = 'Rute Transjakarta';
    } else if (currentFilter === 'mikro') {
        filteredRoutes = filteredRoutes.filter(r => r.mode === 'mikro');
        filteredRoutes.sort((a, b) => {
            if (a.subtype === 'rusun' && b.subtype !== 'rusun') return -1;
            if (a.subtype !== 'rusun' && b.subtype === 'rusun') return 1;
            return 0;
        });
        if(title) title.textContent = 'Rute Mikrotrans & Rusun';
    } else if (currentFilter === 'krl') {
        filteredRoutes = filteredRoutes.filter(r => r.mode === 'krl');
        if(title) title.textContent = 'KRL Commuter Line';
    } else if (currentFilter === 'lrt') {
        filteredRoutes = filteredRoutes.filter(r => r.mode === 'lrt');
        if(title) title.textContent = 'LRT Jabodebek';
    }

    if (currentSearchQuery) {
        filteredRoutes = filteredRoutes.filter(r => {
            const searchTarget = `${r.code} ${r.name}`.toLowerCase();
            return searchTarget.includes(currentSearchQuery);
        });
    }

    if(count) count.textContent = `(${filteredRoutes.length} rute)`;

    if (!container) return;

    if (filteredRoutes.length === 0) {
        container.innerHTML = `<div class="text-center py-8 bg-white rounded-xl border border-gray-100"><p class="text-gray-500 font-sans font-medium">Rute tidak ditemukan</p></div>`;
        return;
    }

    const formatBadge = (code, color) => {
        if (code.startsWith('JAK ')) {
            const number = code.replace('JAK ', '');
            return `<div class="flex flex-col items-center justify-center text-white font-bold rounded-xl px-3 py-2 min-w-[52px] font-sans" style="background-color: ${color}">
                <span class="text-[10px] leading-none">JAK</span>
                <span class="text-base leading-tight">${number}</span>
            </div>`;
        }
        return `<span class="text-white text-sm font-bold px-3 py-1.5 rounded-lg font-sans" style="background-color: ${color}">${code}</span>`;
    };

    container.innerHTML = filteredRoutes.map(route => `
        <div class="route-card bg-white rounded-xl p-4 shadow-sm cursor-pointer border border-gray-100 mb-3" onclick="openDetail('${route.id}')">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    ${formatBadge(route.code, route.badgeColor || '#0072bc')}
                    <div>
                        <div class="flex items-center space-x-2">
                            <h3 class="font-semibold text-gray-800 font-sans">${route.name}</h3>
                            ${route.subtype === 'rusun' ? '<span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded font-sans">RUSUN</span>' : ''}
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    `).join('');
}

function clearFilter() {
    currentFilter = null;
    currentSearchQuery = "";
    const searchInput = document.getElementById('route-search');
    if(searchInput) searchInput.value = "";
    const section = document.getElementById('route-list-section');
    if (section) section.classList.add('hidden');
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active', 'border-primary'));
}

function openDetail(routeId) {
    if (!window.appData) return;
    const route = window.appData.routes.find(r => r.id === routeId);
    if (route) {
        const slug = route.code.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/\./g, '-');
        window.location.href = 'route-detail.html?rute=' + slug;
    }
}

function goBack() { window.location.href = '/'; }

function getRouteSlug() {
    const urlParams = newSearchParams(window.location.search);
    return urlParams.get('rute');
}

function getRouteSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('rute');
}

function getRouteData(slug) {
    if (!slug || !window.appData) return null;
    return window.appData.routes.find(route => {
        const routeSlug = route.code.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '').replace(/\./g, '-');
        return routeSlug === slug.toLowerCase();
    });
}

function getModeLabel(mode) {
    const labels = {
        'brt': { text: 'BRT' },
        'nbrt': { text: 'Angkutan Umum Integrasi' },
        'mikro': { text: 'Mikrotrans' },
        'rusun': { text: 'Rusun' },
        'krl': { text: 'KRL Commuter' },
        'lrt': { text: 'LRT Jabodebek' }
    };
    return labels[mode] || { text: mode };
}

// LOGIKA TUKAR ARAH DAN UPDATE KARTU DI BAWAH PETA
function toggleDirection() {
    if (!currentRouteDetail || !currentRouteDetail.directions) return;
    if (currentRouteDetail.directions.length < 2) return;
    
    currentDirectionIndex = currentDirectionIndex === 0 ? 1 : 0;
    updateDirectionCard();
}

function updateDirectionCard() {
    if (!currentRouteDetail || !currentRouteDetail.directions) return;
    const currentDir = currentRouteDetail.directions[currentDirectionIndex];
    if (!currentDir || !currentDir.stops || currentDir.stops.length === 0) return;

    const stops = currentDir.stops;
    const startStop = stops[0].name;
    const endStop = stops[stops.length - 1].name;

    const startEl = document.getElementById('route-start');
    const endEl = document.getElementById('route-end');
    if (startEl) startEl.textContent = startStop;
    if (endEl) endEl.textContent = endStop;

    renderTimeline(stops);
}

function renderTimeline(stops) {
    const container = document.getElementById('timeline-container');
    if (!container || !stops) return;

    const mainRouteColor = currentRouteDetail ? (currentRouteDetail.badgeColor || '#0072bc') : '#0072bc';

    function getColorForRoute(r) {
        if (!window.routeColors) return "#6b7280";
        if (window.routeColors[r]) return window.routeColors[r];
        const baseRoute = r.split('|')[0].trim();
        if (window.routeColors[baseRoute]) return window.routeColors[baseRoute];
        if (r.startsWith("JAK")) return window.routeColors["JAK"];
        if (r.includes("KRL") || r.includes("Commuter")) return window.routeColors["KRL"];
        return "#6b7280";
    }

    container.innerHTML = stops.map((stop, idx) => {
        if (stop.name === '---' || stop.isSeparator) {
            return `<div class="h-px bg-gray-200 my-6 ml-1 relative"><span class="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-3 text-[10px] text-gray-400 font-bold font-sans rounded-full border border-gray-100 shadow-sm uppercase tracking-wider">Arah Balik</span></div>`;
        }

        const isLast = idx === stops.length - 1;
        const isTerdekat = stop.label || stop.isActive;
        
        // Garis dan titik desain baru (solid, putih di tengah, border color sesuai rute)
        let lineHtml = isLast ? '' : `<div class="absolute left-[5px] top-[20px] bottom-[-16px] w-[2px] z-0" style="background-color: ${mainRouteColor}80;"></div>`;
        
        let nodeHtml = `<div class="w-[12px] h-[12px] rounded-full border-[2.5px] bg-white z-10 relative mt-1.5 shrink-0" style="border-color: ${mainRouteColor};"></div>`;

        if (isTerdekat) {
            nodeHtml = `
            <div class="relative w-[12px] h-[12px] mt-1.5 shrink-0 z-10 flex items-center justify-center">
                <div class="absolute w-5 h-5 rounded-full animate-ping" style="background-color: ${mainRouteColor}40;"></div>
                <div class="w-[12px] h-[12px] rounded-full border-[2.5px] bg-white relative" style="border-color: ${mainRouteColor};"></div>
            </div>`;
        }

        // Label Terdekat
        let labelHtml = '';
        if (isTerdekat) {
            const labelText = stop.label || "TERDEKAT";
            labelHtml = `<span class="ml-2 px-2 py-0.5 bg-blue-50 text-primary text-[9px] font-bold rounded shadow-sm font-sans tracking-wider border border-blue-200 uppercase">${labelText}</span>`;
        }

        // Ikon SVG murni (tanpa lingkaran background)
        let iconsHtml = '';
        if (stop.icons && stop.icons.length > 0) {
            iconsHtml = stop.icons.map(icon => `<img src="assets/images/${icon}" class="w-5 h-5 object-contain inline-block ml-1.5" alt="icon">`).join('');
        }

        // Transfer Badge
        let transfersHtml = '';
        if (stop.transfers && stop.transfers.length > 0) {
            transfersHtml += `<div class="flex flex-wrap gap-1.5 mt-1">`;
            stop.transfers.forEach(t => {
                transfersHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans tracking-wide shadow-sm" style="background-color: ${getColorForRoute(t)}">${t}</span>`;
            });
            transfersHtml += `</div>`;
        }

        // Integrasi Halte CLone Sianteng
        let halteInfoHtml = '';
        if (stop.halteInfo) {
            halteInfoHtml += `<div class="mt-2.5">`;
            halteInfoHtml += `<div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">INTEGRASI HALTE :</div>`;
            
            if (stop.halteInfo.stops) {
                stop.halteInfo.stops.forEach((h) => {
                    halteInfoHtml += `<div class="flex flex-wrap items-center gap-1.5 mb-1.5 last:mb-0">`;
                    halteInfoHtml += `<span class="font-bold text-gray-800 text-[13px]">${h.halte}</span>`;
                    if (h.routes) {
                        h.routes.forEach(r => {
                            halteInfoHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans shadow-sm" style="background-color: ${getColorForRoute(r)}">${r}</span>`;
                        });
                    }
                    halteInfoHtml += `</div>`;
                });
            } else if (stop.halteInfo.halte) {
                halteInfoHtml += `<div class="flex flex-wrap items-center gap-1.5">`;
                halteInfoHtml += `<span class="font-bold text-gray-800 text-[13px]">${stop.halteInfo.halte[0]}</span>`;
                if (stop.halteInfo.routes) {
                    stop.halteInfo.routes.forEach(r => {
                        halteInfoHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans shadow-sm" style="background-color: ${getColorForRoute(r)}">${r}</span>`;
                    });
                }
                halteInfoHtml += `</div>`;
            }
            halteInfoHtml += `</div>`;
        }

        // Integrasi Stasiun Clone Sianteng
        let stationIntegrationHtml = '';
        if (stop.stationIntegration) {
            stationIntegrationHtml += `<div class="mt-2.5">`;
            stationIntegrationHtml += `<div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">INTEGRASI STASIUN :</div>`;
            stationIntegrationHtml += `<div class="flex flex-wrap items-center gap-1.5">`;
            stationIntegrationHtml += `<span class="font-bold text-gray-800 text-[13px]">Stasiun ${stop.stationIntegration.station}</span>`;
            if (stop.stationIntegration.trainLines) {
                stop.stationIntegration.trainLines.forEach(tl => {
                    stationIntegrationHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans shadow-sm" style="background-color: ${getColorForRoute(tl)}">${tl}</span>`;
                });
            }
            stationIntegrationHtml += `</div>`;
            stationIntegrationHtml += `</div>`;
        }

        return `
        <div class="relative pb-6 flex items-start font-sans">
            ${lineHtml}
            ${nodeHtml}
            <div class="ml-4 flex-1 min-w-0 pb-1">
                <div class="flex items-center flex-wrap gap-1">
                    <h4 class="text-[14px] font-bold text-gray-800 leading-snug">${stop.name}</h4>
                    ${iconsHtml}
                    ${labelHtml}
                </div>
                ${transfersHtml}
                ${halteInfoHtml}
                ${stationIntegrationHtml}
            </div>
        </div>`;
    }).join('');
}

function renderDetail() {
    const routeSlug = getRouteSlug();
    const route = getRouteData(routeSlug);
    if (!route) return;

    currentRouteDetail = route;
    
    // Set Header Data
    document.getElementById('header-code').textContent = route.code;
    
    // Set Info Bar Data (Warna dan Konten)
    const mainColor = route.badgeColor || '#0072bc';
    const infoBar = document.getElementById('route-info-bar');
    if (infoBar) infoBar.style.backgroundColor = mainColor;

    const opsEl = document.getElementById('info-ops');
    if (opsEl) opsEl.textContent = `OPERASIONAL • ${route.details.ops || '--'}`;

    const detailsEl = document.getElementById('info-details');
    if (detailsEl) {
        const modeText = getModeLabel(route.mode).text.toUpperCase();
        const headwayText = route.details.headway ? ` • ${route.details.headway}` : '';
        const tarifText = route.details.tarif ? ` • TARIF ${route.details.tarif}` : '';
        detailsEl.textContent = `KORIDOR ${route.code} ${headwayText} ${tarifText}`;
    }

    // Set Card Destination
    const endIcon = document.getElementById('route-end-icon');
    const endDot = document.getElementById('route-end-dot');
    if (endIcon) endIcon.style.borderColor = mainColor;
    if (endDot) endDot.style.backgroundColor = mainColor;

    // Show/Hide Swap Button
    const swapBtn = document.getElementById('btn-swap-dir');
    if (swapBtn) {
        if (route.directions && route.directions.length > 1) {
            swapBtn.classList.remove('hidden');
        } else {
            swapBtn.classList.add('hidden');
        }
    }

    currentDirectionIndex = 0;
    updateDirectionCard();
    
    document.title = `${route.code} - ${route.name} | Transportasi MAN 9 Jakarta`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('category-grid')) renderCategories();
    if (document.getElementById('guides-container')) initGuides();
    if (document.getElementById('map-container')) renderDetail();

    const searchInput = document.getElementById('route-search');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase();
            updateRouteListUI();
        });
    }
});
