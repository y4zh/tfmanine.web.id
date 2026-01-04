let currentFilter = null;

// --- FUNGSI RENDER KATEGORI ---
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
            <span class="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">${cat.name}</span>
        </button>
    `).join('');
}

// Filter routes
function filterRoute(mode) {
    currentFilter = mode;
    const section = document.getElementById('route-list-section');
    const container = document.getElementById('route-list');
    const title = document.getElementById('route-list-title');
    const count = document.getElementById('route-count');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active', 'border-primary');
    });

    const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'border-primary');
    }

    let filteredRoutes = [];
    let titleText = 'Daftar Rute';

    if (!window.appData) {
        console.error("Database routes belum dimuat!");
        return;
    }

    if (mode === 'brt') {
        filteredRoutes = window.appData.routes.filter(r => r.mode === 'brt' || r.mode === 'nbrt');
        titleText = 'Rute Transjakarta';
    } else if (mode === 'mikro') {
        filteredRoutes = window.appData.routes.filter(r => r.mode === 'mikro');
        filteredRoutes.sort((a, b) => {
            if (a.subtype === 'rusun' && b.subtype !== 'rusun') return -1;
            if (a.subtype !== 'rusun' && b.subtype === 'rusun') return 1;
            return 0;
        });
        titleText = 'Rute Mikrotrans & Rusun';
    } else if (mode === 'krl') {
        filteredRoutes = window.appData.routes.filter(r => r.mode === 'krl');
        titleText = 'KRL Commuter Line';
    } else if (mode === 'lrt') {
        filteredRoutes = window.appData.routes.filter(r => r.mode === 'lrt');
        titleText = 'LRT Jabodebek';
    } else {
        filteredRoutes = window.appData.routes.filter(r => r.mode === mode);
    }

    title.textContent = titleText;
    count.textContent = `(${filteredRoutes.length} rute)`;

    const formatBadge = (code, color) => {
        if (code.startsWith('JAK ')) {
            const number = code.replace('JAK ', '');
            return `<div class="flex flex-col items-center justify-center text-white font-bold rounded-xl px-3 py-2 min-w-[52px]" style="background-color: ${color}">
                <span class="text-[10px] leading-none">JAK</span>
                <span class="text-base leading-tight">${number}</span>
            </div>`;
        }
        return `<span class="text-white text-sm font-bold px-3 py-1.5 rounded-lg" style="background-color: ${color}">${code}</span>`;
    };

    container.innerHTML = filteredRoutes.map(route => `
        <div class="route-card bg-white rounded-xl p-4 shadow-sm cursor-pointer border border-gray-100" onclick="openDetail('${route.id}')">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    ${formatBadge(route.code, route.badgeColor || '#0072bc')}
                    <div>
                        <div class="flex items-center space-x-2">
                            <h3 class="font-semibold text-gray-800">${route.name}</h3>
                            ${route.subtype === 'rusun' ? '<span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">RUSUN</span>' : ''}
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    `).join('');

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearFilter() {
    currentFilter = null;
    const section = document.getElementById('route-list-section');
    if (section) section.classList.add('hidden');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active', 'border-primary');
    });
}

function initGuides() {
    const container = document.getElementById('guides-container');
    if (!container || !window.appData) return;

    container.innerHTML = window.appData.guides.map((guide, index) => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button onclick="toggleAccordion(${index})" class="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-3">
                    <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm">${index + 1}</span>
                    <span class="font-semibold text-gray-800">${guide.title}</span>
                </div>
                <svg id="accordion-icon-${index}" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="accordion-content-${index}" class="accordion-content">
                <div class="px-4 pb-4 pt-2 border-t border-gray-100">
                    <ol class="space-y-3 font-data">
                        ${guide.steps.map((step, stepIndex) => `
                            <li class="flex items-start space-x-3">
                                <span class="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">${stepIndex + 1}</span>
                                <span class="text-gray-700 text-sm leading-relaxed">${step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')}</span>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleAccordion(index) {
    const content = document.getElementById(`accordion-content-${index}`);
    const icon = document.getElementById(`accordion-icon-${index}`);

    if (content && icon) {
        content.classList.toggle('open');
        icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
    }
}

function openDetail(routeId) {
    if (!window.appData) return;
    const route = window.appData.routes.find(r => r.id === routeId);
    if (route) {
        const slug = route.code.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        window.location.href = 'route-detail.html?rute=' + slug;
    }
}

function goBack() {
    window.location.href = '/';
}

function getRouteSlug() {
    const pathMatch = window.location.pathname.match(/\/rute\/([a-zA-Z0-9-]+)/);
    if (pathMatch) return pathMatch[1];

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('rute');
}

function getRouteData(slug) {
    if (!slug || !window.appData) return null;
    return window.appData.routes.find(route => {
        const routeSlug = route.code.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        return routeSlug === slug.toLowerCase();
    });
}

function getModeLabel(mode) {
    const labels = {
        'brt': { text: 'BRT', bg: 'bg-red-100', color: 'text-red-600' },
        'nbrt': { text: 'Non-BRT', bg: 'bg-orange-100', color: 'text-orange-600' },
        'mikro': { text: 'Mikrotrans', bg: 'bg-blue-100', color: 'text-blue-600' },
        'rusun': { text: 'Rusun', bg: 'bg-green-100', color: 'text-green-600' },
        'rail': { text: 'KRL / LRT', bg: 'bg-purple-100', color: 'text-purple-600' },
        'krl': { text: 'KRL Commuter', bg: 'bg-cyan-100', color: 'text-cyan-600' },
        'lrt': { text: 'LRT Jabodebek', bg: 'bg-emerald-100', color: 'text-emerald-600' }
    };
    return labels[mode] || { text: mode, bg: 'bg-gray-100', color: 'text-gray-600' };
}

let currentRouteDetail = null;
let currentDirectionIndex = 0;

function switchDirection(index) {
    if (!currentRouteDetail || !currentRouteDetail.directions || !currentRouteDetail.directions[index]) return;

    currentDirectionIndex = index;

    const directions = currentRouteDetail.directions;
    directions.forEach((dir, i) => {
        const btn = document.getElementById(`btn-dir-${i}`);
        if (btn) {
            if (i === index) {
                btn.className = "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm bg-white text-primary ring-1 ring-black/5 scale-[1.02]";
                btn.classList.remove('text-gray-500', 'hover:bg-white/50');
            } else {
                btn.className = "flex-1 py-3 px-4 rounded-xl text-sm font-medium text-gray-500 hover:bg-white/50 transition-all duration-300";
            }
        }
    });

    renderTimeline(currentRouteDetail.directions[index].stops);
}

// --- FUNGSI RENDER TIMELINE FINAL FIX ---
function renderTimeline(stops) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    if (currentRouteDetail && currentRouteDetail.routeMapImage) {
        container.classList.remove('pl-6', 'md:pl-4');
        const dirContainer = container.previousElementSibling; 
        if (dirContainer && dirContainer.classList.contains('flex') && dirContainer.classList.contains('items-center')) {
            dirContainer.style.display = 'none';
        }

        container.innerHTML = `
            <div class="flex flex-col items-center">
                <img src="${currentRouteDetail.routeMapImage}" alt="Peta Rute" class="w-full h-auto rounded-2xl shadow-lg border border-gray-100">
                <p class="mt-2 text-sm text-gray-400">Peta rute resmi Transjakarta</p>
            </div>
        `;
        return;
    }

    container.classList.add('pl-6', 'md:pl-4');

    if (!stops || stops.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Data pemberhentian tidak tersedia.</p>';
        return;
    }

    let firstActiveIndex = stops.findIndex(s => s.isActive);
    let separatorIndex = stops.findIndex(s => s.isSeparator || s.name === '---');
    if (firstActiveIndex === -1) firstActiveIndex = 0;

    // Helper functions
    const renderHalteInfo = (stop) => {
        if (!stop.halteInfo) return '';
        const { type, halte, routes, stops: halteStops } = stop.halteInfo;
        const typeLabel = type === 'integrasi' ? 'Integrasi Halte' : (type === 'stasiun' ? 'Integrasi' : 'Halte Terdekat');
        let halteHtml = '';

        if (halteStops && Array.isArray(halteStops)) {
            halteHtml = halteStops.map(stopItem => {
                const routeBadges = stopItem.routes.map(r => {
                    let color = "#6b7280";
                    if (window.routeColors) {
                        if (window.routeColors[r]) color = window.routeColors[r];
                        else if (r.startsWith("JAK")) color = window.routeColors["JAK"];
                    }
                    return `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style="background-color: ${color}">${r}</span>`;
                }).join('');
                return `<div class="flex flex-wrap items-center gap-1"><span class="text-gray-700 font-medium">${stopItem.halte}</span> ${routeBadges}</div>`;
            }).join('');
        } else if (halte && routes) {
            halteHtml = halte.map(h => {
                const routeBadges = routes.map(r => {
                    let color = "#6b7280";
                    if (window.routeColors) {
                        if (window.routeColors[r]) color = window.routeColors[r];
                        else if (r.startsWith("JAK")) color = window.routeColors["JAK"];
                    }
                    return `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style="background-color: ${color}">${r}</span>`;
                }).join('');
                return `<div class="flex flex-wrap items-center gap-1"><span class="text-gray-700 font-medium">${h}</span> ${routeBadges}</div>`;
            }).join('');
        }

        let stationIntegrationHtml = '';
        if (stop.stationIntegration) {
            const { station, trainLines } = stop.stationIntegration;
            const trainBadges = trainLines.map(line => {
                let color = window.routeColors?.[line] || "#6b7280";
                return `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold text-white" style="background-color: ${color}">${line}</span>`;
            }).join('');
            stationIntegrationHtml = `
            <div class="mt-2 pt-2 border-t border-gray-200">
                <span class="text-[10px] font-semibold text-gray-500 uppercase">Integrasi Stasiun:</span>
                <div class="flex flex-wrap items-center gap-1 mt-1">
                    <span class="text-gray-700 font-medium">${station}</span> ${trainBadges}
                </div>
            </div>`;
        }

        return `
        <div class="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
            <span class="text-[10px] font-semibold text-gray-500 uppercase">${typeLabel}:</span>
            <div class="space-y-1 mt-1 text-xs">
                ${halteHtml}
            </div>
            ${stationIntegrationHtml}
        </div>`;
    };

    const renderStationIcons = (stop) => {
        let iconsHtml = '';
        if (stop.icons && stop.icons.length > 0) {
            iconsHtml += stop.icons.map(icon =>
                `<img src="assets/images/${icon}" alt="${icon.replace('.svg', '')}" class="h-5 w-5 inline-block ml-1">`
            ).join('');
        }
        if (stop.halteInfo) {
            iconsHtml += `<img src="assets/images/icon-bus.svg" alt="bus" class="h-5 w-5 inline-block ml-1">`;
        }
        return iconsHtml;
    };

    const createStopItem = (stop, idx, totalStops, globalIdx) => {
        if (stop.isSeparator || stop.name === '---') return '';

        const isFirst = globalIdx === 0;
        const isLast = globalIdx === totalStops - 1;
        const isActive = stop.isActive;
        const label = stop.label || (isActive ? "TERDEKAT" : null);

        let dotHtml = '';
        if (isFirst) {
            // FIX POSITION: Center on vertical line (w-6 = 24px, left should be -12px)
            dotHtml = `<div class="absolute -left-[12px] top-3 h-6 w-6 rounded-full border-4 border-white bg-blue-500 shadow-sm z-10 flex items-center justify-center">
                <div class="h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>`;
        } else if (isLast) {
            // FIX POSITION: Center on vertical line (w-6 = 24px, left should be -12px)
            dotHtml = `<div class="absolute -left-[12px] top-3 h-6 w-6 rounded-full border-4 border-white bg-red-500 shadow-sm z-10 flex items-center justify-center">
               <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>`;
        } else if (isActive) {
            let codeDisplay = currentRouteDetail.code || '';
            let contentHtml = '';

            if (codeDisplay.startsWith('JAK')) {
                const num = codeDisplay.replace(/JAK/i, '').trim();
                contentHtml = `
                    <div class="flex flex-col items-center justify-center leading-none">
                        <span class="text-[7px] font-bold opacity-90 mb-[1px]">JAK</span>
                        <span class="text-[11px] font-bold">${num}</span>
                    </div>
                `;
            } else {
                contentHtml = `<span class="text-[10px] font-bold">${codeDisplay}</span>`;
            }

            // FIX POSITION: Center on vertical line
            dotHtml = `<div class="absolute -left-[20px] top-[-2px] h-10 w-10 rounded-full border-4 border-white bg-primary shadow-md z-10 animate-pulse"></div>
                       <div class="absolute -left-[20px] top-[-2px] h-10 w-10 rounded-full border-4 border-white bg-primary shadow-md z-10 flex items-center justify-center text-white">
                           ${contentHtml}
                       </div>`;

        } else {
            // FIX POSITION: Center on vertical line (w-4 = 16px, left should be -8px)
            dotHtml = `<div class="absolute -left-[8px] top-4 h-4 w-4 rounded-full border-2 border-white bg-gray-300 shadow-sm z-10 group-hover/stop:bg-gray-400 transition-colors"></div>`;
        }

        const cardClass = isActive
            ? "bg-gradient-to-r from-blue-50 to-white border-blue-200 shadow-md"
            : "hover:bg-gray-50 border-transparent hover:border-gray-100";

        // GENERATE TRANSFERS HTML (Badge Rute)
        let transfersHtml = '';
        if (stop.transfers && stop.transfers.length > 0) {
            transfersHtml = `<div class="flex flex-wrap gap-1 mt-2">`; 
            stop.transfers.forEach(t => {
                let color = "#6b7280";
                if (window.routeColors) {
                    if (window.routeColors[t]) color = window.routeColors[t];
                    else if (t.startsWith("JAK")) color = window.routeColors["JAK"];
                    else if (t.includes("KRL") || t.includes("Commuter")) color = window.routeColors["KRL"];
                    else {
                        const key = Object.keys(window.routeColors).find(k => t.includes(k));
                        if (key) color = window.routeColors[key];
                    }
                }
                transfersHtml += `<span class="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm" style="background-color: ${color}">${t}</span>`;
            });
            transfersHtml += `</div>`;
        }

        const halteInfoHtml = renderHalteInfo(stop);
        const stationIconsHtml = renderStationIcons(stop);

        // --- UPDATE LOGIC TAMPILAN KARTU ---
        let cardContent = '';

        if (isActive) {
            // LOGIKA AKTIF (TERDEKAT): Nama -> Badge Rute -> Label Terdekat
            cardContent = `
            <div class="flex justify-between items-start">
                <div class="w-full">
                    <h4 class="text-sm md:text-base font-bold text-gray-800 ${isActive ? 'text-primary' : ''} leading-none">${stop.name}${stationIconsHtml}</h4>
                    ${transfersHtml} ${label ? `<div class="mt-3"><span class="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">${label}</span></div>` : ''} </div>
                ${isFirst ? '<span class="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Mulai</span>' : ''}
                ${isLast ? '<span class="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">Selesai</span>' : ''}
            </div>
            `;
        } else {
            // LOGIKA TIDAK AKTIF (NORMAL): Nama -> (Badge Mulai/Selesai) -> Badge Rute (di luar flex)
            cardContent = `
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="text-sm md:text-base font-bold text-gray-800 leading-none">${stop.name}${stationIconsHtml}</h4>
                </div>
                ${isFirst ? '<span class="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Mulai</span>' : ''}
                ${isLast ? '<span class="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">Selesai</span>' : ''}
            </div>
            ${transfersHtml}
            `;
        }

        // --- RENDER FINAL ---
        return `
        <div class="relative pb-4 last:pb-0 group/stop fade-in">
             ${!isLast ? '<div class="absolute left-[-1px] top-2 bottom-[-10px] w-0.5 bg-gray-200 group-hover/stop:bg-gray-300 transition-colors"></div>' : ''}
             ${dotHtml}
             <div class="ml-3 py-2 px-3 rounded-2xl border transition-all duration-300 ${cardClass}">
                 ${cardContent}
                 ${halteInfoHtml}
             </div>
        </div>
        `;
    };

    // --- FIX JARAK DROPDOWN: 'mt-8 mb-16' (Sangat Lega) ---
    const createCollapsibleSection = (sectionStops, sectionId, label, startIndex, isExpanded = false) => {
        const validStops = sectionStops.filter(s => !s.isSeparator && s.name !== '---');
        if (validStops.length === 0) return '';

        const count = validStops.length;
        const iconRotate = isExpanded ? 'rotate-180' : '';
        const contentHidden = isExpanded ? '' : 'hidden';

        return `
        <div class="collapsible-section mt-8 mb-16"> <button onclick="toggleStopSection('${sectionId}')" 
                    class="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                <span class="text-sm font-semibold text-gray-600">
                    <svg class="w-4 h-4 inline-block mr-2 transition-transform ${iconRotate}" id="icon-${sectionId}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    ${label.replace('{count}', count)}
                </span>
                <span class="text-xs text-gray-500">${count} pemberhentian</span>
            </button>
            <div id="section-${sectionId}" class="mt-2 pl-2 ${contentHidden}">
                ${validStops.map((stop, idx) => {
                    const realIndex = startIndex + idx; 
                    return createStopItem(stop, idx, stops.length, realIndex);
                }).join('')}
            </div>
        </div>`;
    };

    let html = '';
    const COLLAPSE_THRESHOLD = 7; 

    // --- LOGIKA TAMPILAN UTAMA ---
    
    if (separatorIndex > -1) {
        // UNTUK KRL (Ada Separator)
        const beforeSeparator = stops.slice(0, separatorIndex);
        const afterSeparator = stops.slice(separatorIndex + 1);
        
        beforeSeparator.forEach((stop, idx) => {
            html += createStopItem(stop, idx, stops.length, idx);
        });

        if (afterSeparator.length > 0) {
             html += createCollapsibleSection(afterSeparator, 'after-separator', 'Lihat {count} Pemberhentian Selanjutnya', separatorIndex + 1);
        }

    } else {
        // UNTUK BUS/ANGKOT (Tanpa Separator)
        html += createStopItem(stops[0], 0, stops.length, 0); 

        if (firstActiveIndex > 1) {
            const beforeActive = stops.slice(1, firstActiveIndex);
            if (beforeActive.length <= COLLAPSE_THRESHOLD) {
                beforeActive.forEach((stop, bIdx) => {
                    html += createStopItem(stop, bIdx, stops.length, 1 + bIdx);
                });
            } else {
                html += createCollapsibleSection(beforeActive, 'before-active', 'Lihat {count} Pemberhentian Sebelumnya', 1);
            }
        }

        const activeStart = Math.max(1, firstActiveIndex);
        const activeEnd = Math.min(stops.length - 1, firstActiveIndex + 3);
        
        for (let i = activeStart; i < activeEnd; i++) {
            html += createStopItem(stops[i], i, stops.length, i);
        }

        if (activeEnd < stops.length - 1) {
            const afterActive = stops.slice(activeEnd, -1); 
            if (afterActive.length <= COLLAPSE_THRESHOLD) {
                afterActive.forEach((stop, aIdx) => {
                    html += createStopItem(stop, aIdx, stops.length, activeEnd + aIdx);
                });
            } else {
                html += createCollapsibleSection(afterActive, 'after-active', 'Lihat {count} Pemberhentian Sesudahnya', activeEnd);
            }
        }

        if (stops.length > 1) {
            html += createStopItem(stops[stops.length - 1], stops.length - 1, stops.length, stops.length - 1);
        }
    }

    container.innerHTML = html;
}

function toggleStopSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    const icon = document.getElementById(`icon-${sectionId}`);

    if (section && icon) {
        section.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
}

function renderDetail() {
    console.log("🔍 DEBUG: Memulai renderDetail...");

    if (!window.appData) {
        console.error("CRITICAL ERROR: window.appData kosong!");
        return; 
    }

    const routeSlug = getRouteSlug();
    console.log("🔍 DEBUG: Slug URL =", routeSlug);

    if (!routeSlug) { 
        console.error("ERROR: URL tidak valid.");
        return; 
    }

    const route = getRouteData(routeSlug);
    
    if (!route) { 
        console.error("ERROR: Data rute not found for slug:", routeSlug);
        return; 
    }

    currentRouteDetail = route; 

    const heroImg = document.getElementById('hero-image');
    if (heroImg && route.details && route.details.heroImage) heroImg.src = route.details.heroImage;

    const heroContainer = document.getElementById('hero-image-container');
    const heroInfoCard = document.getElementById('hero-info-card');

    if (route.code === '11P' || route.hideHeroImage) {
        if (heroContainer) heroContainer.style.display = 'none';
        if (heroInfoCard) {
            heroInfoCard.classList.remove('absolute', '-bottom-24', 'left-4', 'right-4', 'md:left-8', 'md:right-8');
            heroInfoCard.classList.add('relative', 'w-full', 'mt-4');
        }
        const parentSection = heroInfoCard?.closest('.relative.mb-32.z-10');
        if (parentSection) {
            parentSection.classList.remove('mb-32');
            parentSection.classList.add('mb-8');
        }
    } else {
        if (heroContainer) heroContainer.style.display = 'block';
        if (heroInfoCard) {
            heroInfoCard.classList.add('absolute', '-bottom-24', 'left-4', 'right-4', 'md:left-8', 'md:right-8');
            heroInfoCard.classList.remove('relative', 'w-full', 'mt-4');
        }
        const parentSection = heroInfoCard?.closest('.relative.mb-8.z-10');
        if (parentSection) {
            parentSection.classList.remove('mb-8');
            parentSection.classList.add('mb-32');
        }
    }

    const badgeContainer = document.getElementById('route-badge-container');
    if (badgeContainer) {
        if (route.code.startsWith('JAK ')) {
            const number = route.code.replace('JAK ', '');
            badgeContainer.innerHTML = `<div class="w-16 h-16 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white font-bold border-2 border-white" style="background-color: ${route.badgeColor || '#0072bc'}">
                <span class="text-xs leading-none">JAK</span>
                <span class="text-2xl leading-tight">${number}</span>
            </div>`;
        } else {
            badgeContainer.innerHTML = `<div class="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl font-bold border-2 border-white" style="background-color: ${route.badgeColor || '#0072bc'}">${route.code}</div>`;
        }
    }

    document.getElementById('route-name').textContent = route.name;
    const modeInfo = getModeLabel(route.mode); 
    const metaContainer = document.getElementById('route-meta');
    if (metaContainer) {
        metaContainer.innerHTML = `
            <span class="w-2 h-2 rounded-full" style="background-color: ${route.badgeColor || '#ccc'}"></span>
            <span>${modeInfo.text}</span>
        `;
    }

    if (route.details) {
        document.getElementById('route-tarif').textContent = route.details.tarif || '--';
        const tarifNote = document.getElementById('route-tarif-note');
        if (tarifNote) {
            tarifNote.textContent = route.details.tarifNote || '';
            if (!route.details.tarifNote) tarifNote.classList.add('hidden');
        }

        const headwayEl = document.getElementById('route-headway');
        if (headwayEl) {
            headwayEl.className = "flex flex-col items-center justify-center"; 
            const noteText = route.details.headwayNote || "Situasional"; 
            headwayEl.innerHTML = `
                <div class="flex items-center space-x-2">
                    <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-bold">${route.details.headway || '--'}</span>
                </div>
                <span class="text-xs font-medium text-gray-500 mt-1">${noteText}</span>
            `;
        }

        document.getElementById('route-ops').textContent = route.details.ops || '--';
        const opsNote = document.getElementById('route-ops-note');
        if (opsNote) {
            opsNote.textContent = route.details.opsNote || '';
            if (!route.details.opsNote) opsNote.classList.add('hidden');
        }
    }

    if (route.directions && route.directions.length > 0) {
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
        switchDirection(0);
    }

    document.title = `${route.code} - ${route.name} | TF MANINE`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('guides-container')) {
        initGuides();
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        if (mode) {
            setTimeout(() => { filterRoute(mode); }, 100);
        }
        if (window.location.pathname.endsWith('index.html')) {
            const cleanUrl = window.location.pathname.replace('index.html', '');
            window.history.replaceState({}, document.title, cleanUrl || '/');
        }
    }
    if (document.getElementById('hero-image')) {
        renderDetail();
        const routeSlug = getRouteSlug();
        if (routeSlug && window.location.search.includes('rute=')) {
            const cleanUrl = '/rute/' + routeSlug;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }
});
