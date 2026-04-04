let currentFilter = null;
let currentSearchQuery = "";
let currentRouteDetail = null;
let currentDirectionIndex = 0;

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
                        <div class="flex items-center space-x-2 flex-wrap">
                            <h3 class="font-semibold text-gray-800 font-sans">${route.name}</h3>
                            ${route.subtype === 'rusun' ? '<span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded font-sans">RUSUN</span>' : ''}
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 font-sans mb-3 h-auto">
            <button onclick="toggleAccordion(${index})" class="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-xl focus:outline-none">
                <div class="flex items-center space-x-3">
                    <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm shrink-0">${index + 1}</span>
                    <span class="font-semibold text-gray-800 font-sans text-[14px] md:text-[15px] pr-2">${guide.title}</span>
                </div>
                <svg id="accordion-icon-${index}" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="accordion-content-${index}" class="hidden px-5 pb-5 pt-1 border-t border-gray-100">
                <div class="space-y-3.5 font-sans text-[13px] md:text-[14px] text-gray-600 leading-relaxed mt-3">
                    ${guide.steps.map((step, i) => `
                        <div class="flex gap-3 items-start">
                            <span class="font-bold text-gray-400 shrink-0 pt-0.5">${i + 1}.</span>
                            <p class="break-words whitespace-normal flex-1">${step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')}</p>
                        </div>
                    `).join('')}
                </div>
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

function toggleDirection() {
    if (!currentRouteDetail || !currentRouteDetail.directions) return;
    if (currentRouteDetail.directions.length < 2) return;

    const btn = document.getElementById('btn-swap-dir');
    const startEl = document.getElementById('route-start');
    const endEl = document.getElementById('route-end');

    if (btn) {
        const svg = btn.querySelector('svg');
        if (svg) svg.classList.toggle('rotate-180');
    }

    if (startEl) startEl.classList.add('opacity-0');
    if (endEl) endEl.classList.add('opacity-0');

    setTimeout(() => {
        currentDirectionIndex = currentDirectionIndex === 0 ? 1 : 0;
        switchDirection(currentDirectionIndex);
        
        if (startEl) startEl.classList.remove('opacity-0');
        if (endEl) endEl.classList.remove('opacity-0');
    }, 300);
}

function switchDirection(index) {
    if (!currentRouteDetail || !currentRouteDetail.directions || !currentRouteDetail.directions[index]) return;
    currentDirectionIndex = index;

    document.querySelectorAll('[id^="btn-dir-"]').forEach((btn, i) => {
        if (i === index) {
            btn.className = "flex-1 py-3 px-2 rounded-xl text-[13px] font-bold transition-all duration-300 shadow-sm bg-white text-primary ring-1 ring-black/5 font-sans";
        } else {
            btn.className = "flex-1 py-3 px-2 rounded-xl text-[13px] font-bold text-gray-500 hover:bg-white/50 transition-all duration-300 font-sans";
        }
    });

    const currentDir = currentRouteDetail.directions[index];
    if (currentDir && currentDir.stops && currentDir.stops.length > 0) {
        const startEl = document.getElementById('route-start');
        const endEl = document.getElementById('route-end');
        if (startEl) startEl.textContent = currentDir.stops[0].name || "--";
        if (endEl) endEl.textContent = currentDir.stops[currentDir.stops.length - 1].name || "--";
    }

    renderTimeline(currentDir.stops);
}

function renderTimeline(stops) {
    const container = document.getElementById('timeline-container');
    if (!container || !stops || stops.length === 0) return;

    const mainRouteColor = currentRouteDetail ? (currentRouteDetail.badgeColor || '#0072bc') : '#0072bc';
    const isBrt = currentRouteDetail && currentRouteDetail.mode === 'brt';
    const isKrl = currentRouteDetail && currentRouteDetail.mode === 'krl';
    const isLrt = currentRouteDetail && currentRouteDetail.mode === 'lrt';
    const nonStationLabel = isBrt ? 'INTEGRASI BUS STOP :' : 'INTEGRASI HALTE :';

    function getColorForRoute(r) {
        if (!window.routeColors) return "#6b7280";
        if (window.routeColors[r]) return window.routeColors[r];
        const baseRoute = String(r).split('|')[0].trim();
        if (window.routeColors[baseRoute]) return window.routeColors[baseRoute];
        if (String(r).startsWith("JAK")) return window.routeColors["JAK"];
        if (String(r).includes("KRL") || String(r).includes("Commuter")) return window.routeColors["KRL"];
        return "#6b7280";
    }

    const renderStopHtml = (stop, idx, isLastOverall = false) => {
        if (!stop || !stop.name) return '';
        if (stop.name === '---' || stop.isSeparator) {
            return '';
        }

        const isStart = (idx === 0);
        const isStartOrEnd = isStart || isLastOverall;
        const isTerdekat = stop.label || stop.isActive;
        
        let lineTop = 'top-0';
        let lineBottom = 'bottom-0';

        if (isStart) lineTop = 'top-[14px]';
        if (isLastOverall) lineBottom = 'h-[14px]';

        let lineHtml = '';
        if (stops.length > 1) {
             if (isLastOverall) {
                 lineHtml = `<div class="absolute left-[11px] top-0 h-[14px] w-[6px] z-0" style="background-color: ${mainRouteColor};"></div>`;
             } else {
                 lineHtml = `<div class="absolute left-[11px] ${lineTop} bottom-0 w-[6px] z-0" style="background-color: ${mainRouteColor};"></div>`;
             }
        }
        
        let isHalteStop = true;
        if (currentRouteDetail && currentRouteDetail.mode === 'mikro') {
            isHalteStop = false;
        } else if (currentRouteDetail && (currentRouteDetail.code === '4F' || currentRouteDetail.code === '11Q')) {
            isHalteStop = false;
        } else if (currentRouteDetail && currentRouteDetail.code === '7P') {
            const n = stop.name.toLowerCase();
            if (n.includes('cawang cililitan') || n.includes('simpang cawang')) {
                isHalteStop = true;
            } else {
                isHalteStop = false;
            }
        }

        let stubHtml = '';
        if (!isHalteStop && !isStartOrEnd) {
            if (isTerdekat) {
                stubHtml = `<div class="absolute left-[11px] top-[10px] w-[26px] h-[8px] rounded-r-[4px] shadow-sm z-0" style="background-color: ${mainRouteColor};"></div>`;
            } else {
                stubHtml = `<div class="absolute left-[11px] top-[11px] w-[22px] h-[6px] rounded-r-[3px] z-0" style="background-color: ${mainRouteColor};"></div>`;
            }
        }

        let nodeHtml = '';
        if (isHalteStop || isStartOrEnd) {
            if (isHalteStop) {
                if (isStartOrEnd) {
                    nodeHtml = `<div class="w-[22px] h-[22px] rounded-full bg-white border-[5px] z-10 mt-[3px] shrink-0 relative" style="border-color: ${mainRouteColor};"></div>`;
                } else if (isTerdekat) {
                    nodeHtml = `<div class="w-[20px] h-[20px] rounded-full bg-white border-[5px] z-10 mt-[4px] shrink-0 shadow-md relative" style="border-color: ${mainRouteColor};"></div>`;
                } else {
                    nodeHtml = `<div class="w-[16px] h-[16px] rounded-full bg-white border-[4px] z-10 mt-[6px] shrink-0 relative" style="border-color: ${mainRouteColor};"></div>`;
                }
            } else {
                nodeHtml = `<div class="w-[22px] h-[22px] bg-white border-[5px] z-10 mt-[3px] shrink-0 rounded-[5px] relative" style="border-color: ${mainRouteColor};"></div>`;
            }
        } else {
            nodeHtml = `<div class="w-[16px] h-[16px] mt-[6px] shrink-0 relative z-10"></div>`;
        }

        let labelHtml = '';
        if (isTerdekat) {
            const labelText = stop.label || "TERDEKAT";
            labelHtml = `<span class="ml-auto px-3 py-1 bg-[#2563eb] text-white text-[10px] font-bold rounded-md shadow-sm font-sans tracking-wider uppercase shrink-0">${labelText}</span>`;
        }

        let iconsHtml = '';
        if (stop.icons && stop.icons.length > 0) {
            iconsHtml = stop.icons.map(icon => `<img src="assets/images/${icon}" class="w-6 h-6 object-contain inline-block ml-1.5" alt="icon">`).join('');
        }

        let transfersHtml = '';
        if (stop.transfers && stop.transfers.length > 0) {
            transfersHtml += `<div class="flex flex-wrap gap-1.5 mt-1.5">`;
            stop.transfers.forEach(t => {
                transfersHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans tracking-wide shadow-sm" style="background-color: ${getColorForRoute(t)}">${t}</span>`;
            });
            transfersHtml += `</div>`;
        }

        let halteInfoHtml = '';
        if (stop.halteInfo) {
            halteInfoHtml += `<div class="mt-2.5 flex flex-col gap-2.5">`;
            
            let stopsArray = [];
            if (stop.halteInfo.stops) {
                stopsArray = stop.halteInfo.stops;
            } else if (stop.halteInfo.halte) {
                stopsArray = [{ halte: stop.halteInfo.halte[0], type: stop.halteInfo.type, routes: stop.halteInfo.routes }];
            }

            const stasiunStops = [];
            const defaultStops = [];
            const explicitBusStops = [];

            stopsArray.forEach(h => {
                const routesArr = Array.isArray(h.routes) ? h.routes : (h.routes ? [h.routes] : []);
                const isTrainRoute = routesArr.some(r => {
                    const upper = String(r).toUpperCase();
                    return upper.includes('|') || upper.includes('KRL') || upper.includes('LRT') || upper.includes('MRT');
                });

                if (isTrainRoute) {
                    stasiunStops.push(h);
                } else if (h.type === 'busstop') {
                    explicitBusStops.push(h);
                } else {
                    defaultStops.push(h);
                }
            });

            if (stasiunStops.length > 0) {
                halteInfoHtml += `<div>`;
                halteInfoHtml += `<div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">INTEGRASI STASIUN :</div>`;
                stasiunStops.forEach((h) => {
                    halteInfoHtml += `<div class="flex flex-wrap items-center gap-1.5 mb-1.5 last:mb-0">`;
                    halteInfoHtml += `<span class="font-bold text-gray-800 text-[13px]">${h.halte}</span>`;
                    const rArr = Array.isArray(h.routes) ? h.routes : (h.routes ? [h.routes] : []);
                    rArr.forEach(r => {
                        halteInfoHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans shadow-sm" style="background-color: ${getColorForRoute(r)}">${r}</span>`;
                    });
                    halteInfoHtml += `</div>`;
                });
                halteInfoHtml += `</div>`;
            }

            if (defaultStops.length > 0) {
                halteInfoHtml += `<div>`;
                halteInfoHtml += `<div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">${nonStationLabel}</div>`;
                defaultStops.forEach((h) => {
                    halteInfoHtml += `<div class="flex flex-wrap items-center gap-1.5 mb-1.5 last:mb-0">`;
                    halteInfoHtml += `<span class="font-bold text-gray-800 text-[13px]">${h.halte}</span>`;
                    const rArr = Array.isArray(h.routes) ? h.routes : (h.routes ? [h.routes] : []);
                    rArr.forEach(r => {
                        halteInfoHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans shadow-sm" style="background-color: ${getColorForRoute(r)}">${r}</span>`;
                    });
                    halteInfoHtml += `</div>`;
                });
                halteInfoHtml += `</div>`;
            }

            if (explicitBusStops.length > 0) {
                halteInfoHtml += `<div>`;
                halteInfoHtml += `<div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">INTEGRASI BUS STOP :</div>`;
                explicitBusStops.forEach((h) => {
                    halteInfoHtml += `<div class="flex flex-wrap items-center gap-1.5 mb-1.5 last:mb-0">`;
                    halteInfoHtml += `<span class="font-bold text-gray-800 text-[13px]">${h.halte}</span>`;
                    const rArr = Array.isArray(h.routes) ? h.routes : (h.routes ? [h.routes] : []);
                    rArr.forEach(r => {
                        halteInfoHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans shadow-sm" style="background-color: ${getColorForRoute(r)}">${r}</span>`;
                    });
                    halteInfoHtml += `</div>`;
                });
                halteInfoHtml += `</div>`;
            }

            halteInfoHtml += `</div>`;
        }

        let stationIntegrationHtml = '';
        if (stop.stationIntegration) {
            stationIntegrationHtml += `<div class="mt-2.5">`;
            stationIntegrationHtml += `<div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">INTEGRASI STASIUN :</div>`;
            stationIntegrationHtml += `<div class="flex flex-wrap items-center gap-1.5">`;
            stationIntegrationHtml += `<span class="font-bold text-gray-800 text-[13px]">Stasiun ${stop.stationIntegration.station}</span>`;
            if (stop.stationIntegration.trainLines) {
                stop.stationIntegration.trainLines.forEach(tl => {
                    let labelT = stop.stationIntegration.label || tl;
                    let bgCol = stop.stationIntegration.labelColor || getColorForRoute(tl);
                    stationIntegrationHtml += `<span class="px-1.5 py-[2px] rounded-[4px] text-[10px] font-bold text-white font-sans shadow-sm" style="background-color: ${bgCol}">${labelT}</span>`;
                });
            }
            stationIntegrationHtml += `</div>`;
            stationIntegrationHtml += `</div>`;
        }

        let contentClass = "ml-3 flex-1 min-w-0 pb-2";
        if (isTerdekat) {
            contentClass = "ml-2 flex-1 min-w-0 bg-[#f4f7fc] border border-blue-100 rounded-xl p-3.5 -mt-2 relative z-10 flex flex-col justify-center";
        }

        let pbClass = isLastOverall ? "pb-2" : "pb-6";

        return `
        <div class="relative ${pbClass} flex items-start font-sans">
            ${lineHtml}
            ${stubHtml}
            <div class="w-[28px] flex justify-center shrink-0">
                ${nodeHtml}
            </div>
            <div class="${contentClass}">
                <div class="flex items-center justify-between w-full gap-2">
                    <div class="flex items-center flex-wrap gap-1.5">
                        <h4 class="text-[14px] md:text-[15px] font-bold ${isTerdekat ? 'text-[#1e3a8a]' : 'text-gray-800'} leading-snug">${stop.name}</h4>
                        ${iconsHtml}
                    </div>
                    ${labelHtml}
                </div>
                ${transfersHtml}
                ${halteInfoHtml}
                ${stationIntegrationHtml}
            </div>
        </div>`;
    };

    let isVisible = new Array(stops.length).fill(false);

    if (isLrt || stops.length <= 3) {
        isVisible.fill(true);
    } else if (isKrl) {
        let separatorIdx = stops.findIndex(s => s && s.isSeparator);
        let terdekatIdx = stops.findIndex(s => s && (s.label || s.isActive));
        
        if (separatorIdx === -1) separatorIdx = stops.length - 1;
        if (terdekatIdx === -1) terdekatIdx = 0;

        isVisible[0] = true;
        for (let i = terdekatIdx; i < separatorIdx; i++) {
            isVisible[i] = true;
        }
    } else {
        let terdekatIndices = [];
        stops.forEach((s, i) => {
            if (s && (s.label || s.isActive)) terdekatIndices.push(i);
        });

        if (terdekatIndices.length === 0) terdekatIndices.push(stops.length - 1);

        terdekatIndices.forEach(idx => {
            for (let i = Math.max(0, idx - 3); i <= Math.min(stops.length - 1, idx + 3); i++) {
                isVisible[i] = true;
            }
        });

        isVisible[0] = true;
        isVisible[stops.length - 1] = true;
    }

    let html = `<div class="relative">`;
    let i = 0;
    let dropCounter = 0;

    const renderToggleNode = (id, count, isAfter, isKrlSeparator = false) => {
        let labelText = isKrlSeparator ? `Arah Balik (${count} pemberhentian)` : `Lihat ${count} pemberhentian ${isAfter ? 'selanjutnya' : 'sebelumnya'}`;
        let lineTop = isKrlSeparator ? 'top-[-10px]' : 'top-0';
        
        return `
        <div class="relative pb-6 flex items-start font-sans">
            <div class="absolute left-[11px] ${lineTop} bottom-0 w-[6px] z-0" style="background-color: ${mainRouteColor}; opacity: 0.3;"></div>
            <div class="w-[28px] flex justify-center shrink-0 relative z-10 mt-[4px]">
                <div class="bg-white rounded-full p-0.5 shadow-sm border border-gray-200">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
            <div class="ml-3 flex-1 min-w-0 pr-2 md:pr-0 relative z-10">
                <button onclick="document.getElementById('${id}').classList.toggle('hidden'); this.querySelector('.chevron-btn').classList.toggle('rotate-180')" class="w-full flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-300 shadow-sm focus:outline-none group">
                    <span class="text-[13.5px] font-medium text-gray-600 group-hover:text-gray-800 transition-colors">${labelText}</span>
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 chevron-btn transition-transform duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
        </div>`;
    };

    while (i < stops.length) {
        if (!stops[i]) {
            i++;
            continue;
        }

        if (stops[i].isSeparator) {
            let startHidden = i + 1;
            let endHidden = stops.length - 1;
            let hiddenCount = endHidden - startHidden + 1;
            
            if (hiddenCount > 0) {
                let dropId = 'drop-group-' + dropCounter++;
                html += renderToggleNode(dropId, hiddenCount, true, true);
                html += `<div id="${dropId}" class="hidden">`;
                for (let j = startHidden; j <= endHidden; j++) {
                    let isLastOverall = (j === stops.length - 1);
                    html += renderStopHtml(stops[j], j, isLastOverall);
                }
                html += `</div>`;
            }
            break; 
        } else if (isVisible[i]) {
            let isLastOverall = (i === stops.length - 1);
            html += renderStopHtml(stops[i], i, isLastOverall);
            i++;
        } else {
            let startHidden = i;
            while (i < stops.length && !isVisible[i] && stops[i] && !stops[i].isSeparator) {
                i++;
            }
            let endHidden = i - 1;
            let hiddenCount = endHidden - startHidden + 1;
            let dropId = 'drop-group-' + dropCounter++;
            let terdekatIdx = stops.findIndex(s => s && (s.label || s.isActive));
            let isAfter = startHidden > terdekatIdx;
            
            html += renderToggleNode(dropId, hiddenCount, isAfter, false);
            html += `<div id="${dropId}" class="hidden">`;
            for (let j = startHidden; j <= endHidden; j++) {
                let isLastOverall = (j === stops.length - 1);
                html += renderStopHtml(stops[j], j, isLastOverall);
            }
            html += `</div>`;
        }
    }
    
    html += `</div>`;
    container.innerHTML = html;
}

function renderDetail() {
    const routeSlug = getRouteSlug();
    const route = getRouteData(routeSlug);
    if (!route) return;

    currentRouteDetail = route;
    
    const headerCodeEl = document.getElementById('header-code');
    if (headerCodeEl) headerCodeEl.textContent = route.code || '';
    
    const mainColor = route.badgeColor || '#0072bc';
    
    const mapWrapper = document.getElementById('map-container')?.parentElement;
    if (mapWrapper) {
        const existingOverlay = document.getElementById('map-overlay-notif');
        if (existingOverlay) existingOverlay.remove();
        
        const blockedRoutes = [];
        if (blockedRoutes.includes(route.code)) {
            const overlayHtml = `
            <div id="map-overlay-notif" class="absolute inset-0 bg-white/40 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 rounded-[2.5rem]">
                <div class="bg-white px-6 py-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 text-center max-w-[280px]">
                    <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <p class="text-[15px] font-bold text-gray-800 font-sans mb-1.5">Peta Belum Tersedia</p>
                    <p class="text-xs text-gray-500 font-sans leading-relaxed">Visualisasi jalur di peta untuk rute ini sedang dalam tahap pengembangan.</p>
                </div>
            </div>`;
            mapWrapper.insertAdjacentHTML('beforeend', overlayHtml);
        }
    }

    const infoBar = document.getElementById('route-info-bar');
    if (infoBar) {
        infoBar.className = "w-full text-white px-4 py-5 relative z-10 bg-primary transition-colors duration-300 shadow-md";
        infoBar.style.backgroundColor = ""; 

        const isTJ = route.mode === 'brt' || route.mode === 'nbrt';
        let tarifPromoHtml = '';
        if (isTJ) {
            tarifPromoHtml = `<span class="block mt-1 text-[10px] text-blue-100 font-bold bg-black/20 w-max px-1.5 py-0.5 rounded shadow-sm">Rp 2.000,- (05.00-07.00)</span>`;
        }

        let codeHtml = '';
        if (route.code && route.code.startsWith('JAK')) {
            const num = route.code.replace('JAK', '').trim();
            codeHtml = `<div class="flex flex-col leading-none items-center justify-center text-white"><span class="text-[10px] font-bold tracking-widest">JAK</span><span class="text-xl mt-0.5">${num}</span></div>`;
        } else {
            codeHtml = `<span class="text-xl">${route.code || ''}</span>`;
        }

        const details = route.details || {};
        
        let opsContainerHtml = '';
        if (route.code === '7P') {
            opsContainerHtml = `
            <div class="flex flex-col sm:col-span-2 mt-2 pt-4 border-t border-white/10">
                <div class="flex items-center gap-2.5 mb-3">
                    <svg class="w-4 h-4 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold">Jam Operasional</span>
                </div>
                <div class="bg-black/20 rounded-xl overflow-hidden border border-white/5">
                    <table class="w-full text-center divide-y divide-white/10">
                        <thead>
                            <tr class="divide-x divide-white/10 bg-white/5">
                                <th colspan="2" class="py-2 px-1 font-bold text-[11px] uppercase tracking-wider text-white">Keberangkatan Awal</th>
                                <th colspan="2" class="py-2 px-1 font-bold text-[11px] uppercase tracking-wider text-white">Keberangkatan Akhir</th>
                            </tr>
                            <tr class="divide-x divide-white/10 text-[10px] text-white/80 bg-white/5">
                                <th class="py-1 px-1 font-normal w-1/4">Jam</th>
                                <th class="py-1 px-1 font-normal w-1/4">Dari</th>
                                <th class="py-1 px-1 font-normal w-1/4">Jam</th>
                                <th class="py-1 px-1 font-normal w-1/4">Dari</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/10 text-[12px] md:text-[13px] text-white">
                            <tr class="divide-x divide-white/10">
                                <td class="py-2.5 px-1 font-bold">05.00</td>
                                <td class="py-2.5 px-1 font-medium">Pondok Kelapa</td>
                                <td class="py-2.5 px-1 font-bold">21.30</td>
                                <td class="py-2.5 px-1 font-medium">Pondok Kelapa</td>
                            </tr>
                            <tr class="divide-x divide-white/10 bg-white/5">
                                <td class="py-2.5 px-1 font-bold">05.30</td>
                                <td class="py-2.5 px-1 font-medium leading-tight">Cawang Cililitan</td>
                                <td class="py-2.5 px-1 font-bold">22.00</td>
                                <td class="py-2.5 px-1 font-medium leading-tight">Cawang Cililitan</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`;
        } else {
            opsContainerHtml = `
            <div class="flex items-start gap-2.5">
                <svg class="w-4 h-4 mt-0.5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div class="flex flex-col">
                    <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold mb-0.5">Jam Operasional</span>
                    <span class="text-sm font-bold leading-none">${details.ops || '--'}</span>
                </div>
            </div>`;
        }

        let infoGridHtml = '';
        if (route.code === '7P') {
            infoGridHtml = `
            <div class="flex flex-col gap-0 mt-2 bg-black/10 rounded-xl p-4 border border-white/10 font-sans">
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-start gap-2.5">
                        <svg class="w-4 h-4 mt-0.5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <div class="flex flex-col">
                            <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold mb-0.5">Tarif</span>
                            <span class="text-sm font-bold leading-none">${details.tarif || '--'}</span>
                            ${tarifPromoHtml}
                        </div>
                    </div>
                    <div class="flex items-start gap-2.5">
                        <svg class="w-4 h-4 mt-0.5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div class="flex flex-col">
                            <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold mb-0.5">Headway</span>
                            <span class="text-sm font-bold leading-none">${details.headway || '--'}</span>
                        </div>
                    </div>
                </div>
                ${opsContainerHtml}
            </div>`;
        } else {
            infoGridHtml = `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-2 bg-black/10 rounded-xl p-4 border border-white/10 font-sans">
                <div class="flex items-start gap-2.5">
                    <svg class="w-4 h-4 mt-0.5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold mb-0.5">Tarif</span>
                        <span class="text-sm font-bold leading-none">${details.tarif || '--'}</span>
                        ${tarifPromoHtml}
                    </div>
                </div>
                <div class="flex items-start gap-2.5">
                    <svg class="w-4 h-4 mt-0.5 shrink-0 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold mb-0.5">Headway</span>
                        <span class="text-sm font-bold leading-none">${details.headway || '--'}</span>
                    </div>
                </div>
                ${opsContainerHtml}
            </div>`;
        }

        infoBar.innerHTML = `
        <div class="max-w-4xl mx-auto flex flex-col gap-4">
            <div class="flex items-center gap-4">
                <div class="w-[52px] h-[52px] shrink-0 rounded-xl shadow-md border-2 border-white/20 flex items-center justify-center font-bold font-sans" style="background-color: ${mainColor};">
                    ${codeHtml}
                </div>
                <h2 class="text-2xl md:text-3xl font-bold leading-tight font-sans drop-shadow-sm">${route.name || ''}</h2>
            </div>
            ${infoGridHtml}
        </div>
        <div class="h-10 md:h-12"></div>
        `;
    }

    const endIcon = document.getElementById('route-end-icon');
    const endDot = document.getElementById('route-end-dot');
    if (endIcon) endIcon.style.borderColor = mainColor;
    if (endDot) endDot.style.backgroundColor = mainColor;

    let floatingCardContainer = document.getElementById('floating-card-wrapper');
    if (!floatingCardContainer) {
        const swapBtn = document.getElementById('btn-swap-dir');
        if (swapBtn) {
            floatingCardContainer = swapBtn.closest('.relative.z-20.mb-6');
            if (floatingCardContainer) floatingCardContainer.id = 'floating-card-wrapper';
        }
    }

    if (floatingCardContainer) {
        floatingCardContainer.style.display = 'block'; 

        if (route.directions && route.directions.length === 1) {
            floatingCardContainer.style.display = 'none';
        } else if (route.mode === 'krl' || route.mode === 'lrt') {
            floatingCardContainer.innerHTML = `
                <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex items-center justify-between border border-gray-100">
                    <div class="flex items-center justify-between w-full bg-gray-50 p-1.5 rounded-xl border border-gray-100 gap-1.5">
                        ${(route.directions || []).map((dir, i) => `
                            <button id="btn-dir-${i}" onclick="switchDirection(${i})" class="flex-1 py-3 px-2 rounded-xl text-[13px] font-bold text-gray-500 hover:bg-white/50 transition-all duration-300 font-sans">${dir.name || ''}</button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            floatingCardContainer.innerHTML = `
                <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 md:p-5 flex items-center justify-between border border-gray-100">
                    <div class="flex flex-col relative w-full pr-4 gap-4">
                        <div class="absolute left-[11px] top-[24px] bottom-[24px] border-l-[2px] border-dotted border-gray-300 z-0"></div>
                        <div class="flex items-center gap-3 z-10 bg-white relative">
                            <div class="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                            <span id="route-start" class="font-medium text-gray-800 text-[14px] md:text-[15px] truncate transition-opacity duration-300">--</span>
                        </div>
                        <div class="flex items-center gap-3 z-10 bg-white relative">
                            <div id="route-end-icon" class="w-6 h-6 rounded-full border-[3px] bg-white flex items-center justify-center shrink-0" style="border-color: ${mainColor};">
                                <div id="route-end-dot" class="w-2 h-2 rounded-full" style="background-color: ${mainColor};"></div>
                            </div>
                            <span id="route-end" class="font-medium text-gray-800 text-[14px] md:text-[15px] truncate transition-opacity duration-300">--</span>
                        </div>
                    </div>
                    <button id="btn-swap-dir" onclick="toggleDirection()" class="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 shrink-0 transition-colors shadow-sm border border-red-100 group">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                    </button>
                </div>
            `;
        }
    }

    currentDirectionIndex = 0;
    switchDirection(0); 
    
    document.title = `${route.code || ''} - ${route.name || ''} | Transportasi MAN 9 Jakarta`;
}

function renderGlobalFooter() {
    const footers = document.querySelectorAll('footer');
    if (!footers || footers.length === 0) return;

    const footerHTML = `
        <div class="max-w-7xl mx-auto px-6">
            <div class="mb-8">
                <img src="assets/images/icons_sublogo.svg" alt="Logo Transportasi MAN 9" class="h-10 w-auto object-contain mb-5">
                <p class="text-gray-300 text-[15px] leading-relaxed font-sans max-w-xl">Platform informasi untuk memudahkan aksesibilitas penggunaan transportasi umum di sekitar MAN 9 Jakarta.</p>
            </div>
            <div class="flex flex-row gap-8 sm:gap-16 mb-8">
                <div class="flex-1">
                    <h3 class="font-bold text-lg mb-4 underline underline-offset-[6px] decoration-2">Kontak</h3>
                    <ul class="space-y-3.5">
                        <li><a href="mailto:manine@tfmanine.web.id" class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-[14px] sm:text-[15px] font-sans"><svg class="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> Email</a></li>
                        <li><a href="https://instagram.com/transportmanine" target="_blank" class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-[14px] sm:text-[15px] font-sans"><svg class="w-[18px] h-[18px] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Direct Message</a></li>
                    </ul>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-lg mb-4 underline underline-offset-[6px] decoration-2">Media Sosial</h3>
                    <ul class="space-y-3.5">
                        <li><a href="https://instagram.com/transportmanine" target="_blank" class="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-[14px] sm:text-[15px] font-sans"><svg class="w-[18px] h-[18px] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.7-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 pt-5 pb-2 text-center text-[13px] md:text-[14px] text-gray-400 font-sans flex flex-col items-center justify-center gap-1.5">
                <p>© 2026 Transportasi MAN 9 Jakarta.</p>
                <p>v1.4.9 (Beta)</p>
            </div>
        </div>
    `;

    footers.forEach(f => {
        f.className = "bg-[#1f2937] text-white pt-12 pb-6 mt-auto w-full font-sans";
        f.innerHTML = footerHTML;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('category-grid')) renderCategories();
    if (document.getElementById('guides-container')) initGuides();
    if (document.getElementById('map-container')) renderDetail();
    
    renderGlobalFooter();

    const searchInput = document.getElementById('route-search');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase();
            updateRouteListUI();
        });
    }
});
