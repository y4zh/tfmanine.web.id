let currentFilter = null;
let currentSearchQuery = "";

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

function initGuides() {
    const container = document.getElementById('guides-container');
    if (!container || !window.appData) return;

    container.innerHTML = window.appData.guides.map((guide, index) => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-sans mb-3">
            <button onclick="toggleAccordion(${index})" class="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-3">
                    <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm">${index + 1}</span>
                    <span class="font-semibold text-gray-800 font-sans">${guide.title}</span>
                </div>
                <svg id="accordion-icon-${index}" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="accordion-content-${index}" class="accordion-content hidden px-4 pb-4 pt-2 border-t border-gray-100">
                <ol class="space-y-3 font-data font-sans list-decimal list-inside text-sm text-gray-600">
                    ${guide.steps.map((step) => `<li>${step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')}</li>`).join('')}
                </ol>
            </div>
        </div>
    `).join('');
}

function toggleAccordion(index) {
    const content = document.getElementById(`accordion-content-${index}`);
    const icon = document.getElementById(`accordion-icon-${index}`);
    if (content && icon) {
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
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

let currentRouteDetail = null;

function switchDirection(index) {
    if (!currentRouteDetail || !currentRouteDetail.directions || !currentRouteDetail.directions[index]) return;
    document.querySelectorAll('[id^="btn-dir-"]').forEach((btn, i) => {
        if (i === index) {
            btn.className = "flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-sm bg-white text-primary ring-1 ring-black/5 transition-all duration-300";
        } else {
            btn.className = "flex-1 py-3 px-4 rounded-xl text-sm font-medium text-gray-500 hover:bg-white/50 transition-all duration-300";
        }
    });
    renderTimeline(currentRouteDetail.directions[index].stops);
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
            return `<div class="h-px bg-gray-200 my-6 ml-4 relative"><span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-xs text-gray-400 font-bold font-sans rounded-full border border-gray-100 shadow-sm uppercase tracking-wider">Arah Balik</span></div>`;
        }

        const isLast = idx === stops.length - 1;
        const isTerdekat = stop.label || stop.isActive;
        
        let nodeClass = isTerdekat 
            ? `border-[4px] bg-white w-5 h-5 -ml-[2px] z-10` 
            : `border-[3px] bg-white w-4 h-4 border-gray-300 z-10`;
        
        let nodeStyle = isTerdekat ? `border-color: ${mainRouteColor};` : ``;
        let lineClass = isLast ? 'hidden' : `absolute left-[7px] top-4 bottom-[-24px] w-[3px] z-0`;
        let lineStyle = isTerdekat ? `background-color: ${mainRouteColor};` : `background-color: #e5e7eb;`;

        let labelHtml = '';
        if (isTerdekat) {
            const labelText = stop.label || "TERDEKAT";
            labelHtml = `<span class="ml-auto flex-shrink-0 px-2.5 py-1 bg-[#B93A22] text-white text-[10px] font-bold rounded-md shadow-sm font-sans tracking-wide leading-none border border-[#9A3016]">${labelText}</span>`;
        }

        let transfersHtml = '';
        if (stop.transfers && stop.transfers.length > 0) {
            transfersHtml += `<div class="flex flex-wrap gap-1 mt-1.5">`;
            stop.transfers.forEach(t => {
                transfersHtml += `<span class="px-2 py-1 rounded text-[10px] font-medium text-white font-sans tracking-wide" style="background-color: ${getColorForRoute(t)}">${t}</span>`;
            });
            transfersHtml += `</div>`;
        }

        let halteInfoHtml = '';
        if (stop.halteInfo) {
            const labelText = stop.halteInfo.type === 'integrasi' ? 'Halte Integration' : 'Pemberhentian Terdekat';
            halteInfoHtml += `<div class="mt-3 p-3.5 bg-[#f8f9fa] rounded-xl border border-gray-200">`;
            halteInfoHtml += `<div class="text-[11px] text-gray-500 font-normal mb-1.5 font-sans">${labelText}</div>`;
            
            if (stop.halteInfo.stops) {
                stop.halteInfo.stops.forEach((h, hIdx) => {
                    halteInfoHtml += `<div class="${hIdx > 0 ? 'mt-2' : ''}">`;
                    halteInfoHtml += `<div class="text-[14px] font-bold text-gray-900 font-sans mb-1">${h.halte}</div>`;
                    if (h.routes) {
                        halteInfoHtml += `<div class="flex flex-wrap items-center gap-1.5 text-sm text-gray-700 font-sans">`;
                        halteInfoHtml += `<span class="mr-1">${h.halte}</span>`;
                        h.routes.forEach(r => {
                            halteInfoHtml += `<span class="px-1.5 py-0.5 bg-gray-200 text-gray-800 rounded text-[11px] font-medium font-sans shadow-sm border border-gray-300">${r}</span>`;
                        });
                        halteInfoHtml += `</div>`;
                    }
                    halteInfoHtml += `</div>`;
                });
            } 
            else if (stop.halteInfo.halte) {
                halteInfoHtml += `<div>`;
                halteInfoHtml += `<div class="text-[14px] font-bold text-gray-900 font-sans mb-1">${stop.halteInfo.halte[0]}</div>`;
                if (stop.halteInfo.routes) {
                    halteInfoHtml += `<div class="flex flex-wrap items-center gap-1.5 text-sm text-gray-700 font-sans">`;
                    halteInfoHtml += `<span class="mr-1">${stop.halteInfo.halte[0]}</span>`;
                    stop.halteInfo.routes.forEach(r => {
                        halteInfoHtml += `<span class="px-1.5 py-0.5 bg-gray-200 text-gray-800 rounded text-[11px] font-medium font-sans shadow-sm border border-gray-300">${r}</span>`;
                    });
                    halteInfoHtml += `</div>`;
                }
                halteInfoHtml += `</div>`;
            }
            halteInfoHtml += `</div>`;
        }

        let stationIntegrationHtml = '';
        if (stop.stationIntegration) {
            stationIntegrationHtml += `<div class="mt-3 ml-1">`;
            stationIntegrationHtml += `<div class="text-[11px] text-gray-500 font-normal mb-0.5 font-sans">Integration Station</div>`;
            stationIntegrationHtml += `<div class="text-[14px] font-bold text-gray-900 font-sans">Stasiun ${stop.stationIntegration.station}</div>`;
            if (stop.stationIntegration.trainLines) {
                stationIntegrationHtml += `<div class="text-[12px] text-gray-600 font-sans mt-0.5">`;
                stationIntegrationHtml += `Stasiun ${stop.stationIntegration.station} (${stop.stationIntegration.trainLines.join(', ')})`;
                stationIntegrationHtml += `</div>`;
            }
            stationIntegrationHtml += `</div>`;
        }

        let iconsHtml = '';
        if (stop.icons && stop.icons.length > 0) {
            iconsHtml = stop.icons.map(icon => `<img src="assets/images/${icon}" class="w-4 h-4 object-contain inline-block bg-white rounded-full border border-gray-100 shadow-sm p-0.5" alt="icon">`).join('');
        }

        return `
        <div class="relative pb-8 last:pb-0 flex items-start font-sans">
            <div class="${lineClass}" style="${lineStyle}"></div>
            
            <div class="relative flex items-center justify-center w-4 h-4 shrink-0 mt-0.5">
                <div class="rounded-full ${nodeClass}" style="${nodeStyle}"></div>
            </div>

            <div class="ml-4 flex-1 w-full min-w-0">
                <div class="flex items-start justify-between gap-2 w-full pr-1">
                    <div class="flex items-center gap-1.5 pt-0.5">
                        <h4 class="text-[15px] font-bold text-gray-800 leading-tight font-sans">${stop.name}</h4>
                        <div class="flex items-center gap-1">${iconsHtml}</div>
                    </div>
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
    
    const routeNameEl = document.getElementById('route-name');
    const routeTarifEl = document.getElementById('route-tarif');
    const routeHeadwayEl = document.getElementById('route-headway');
    const routeOpsEl = document.getElementById('route-ops');
    const routeMetaEl = document.getElementById('route-meta');
    
    if(routeNameEl) routeNameEl.textContent = route.name;
    if(routeTarifEl) routeTarifEl.textContent = route.details.tarif || '--';
    if(routeHeadwayEl) routeHeadwayEl.textContent = route.details.headway || '--';
    if(routeOpsEl) routeOpsEl.textContent = route.details.ops || '--';
    if(routeMetaEl) routeMetaEl.textContent = getModeLabel(route.mode).text;

    const badgeContainer = document.getElementById('route-badge-container');
    if (badgeContainer) {
        if (route.code.startsWith('JAK ')) {
            const num = route.code.replace('JAK ', '');
            badgeContainer.innerHTML = `<div class="w-16 h-16 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white font-bold" style="background-color: ${route.badgeColor || '#0072bc'}"><span class="text-xs">JAK</span><span class="text-2xl">${num}</span></div>`;
        } else {
            badgeContainer.innerHTML = `<div class="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl font-bold" style="background-color: ${route.badgeColor || '#0072bc'}">${route.code}</div>`;
        }
    }

    const btnContainer = document.getElementById('btn-dir-0')?.parentElement;
    
    if (route.directions && route.directions.length > 0) {
        if (route.directions.length === 1) {
            if(btnContainer) btnContainer.classList.add('hidden');
        } else {
            if(btnContainer) btnContainer.classList.remove('hidden');
            route.directions.forEach((dir, i) => {
                const btn = document.getElementById(`btn-dir-${i}`);
                if (btn) {
                    btn.textContent = dir.name;
                    btn.classList.remove('hidden');
                }
            });
            if (route.directions.length < 2) {
                const btn1 = document.getElementById(`btn-dir-1`);
                if (btn1) btn1.classList.add('hidden');
            }
        }
        switchDirection(0);
    }
    
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
