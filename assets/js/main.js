let currentFilter = null;

// Filter routes by mode (Index Page)
function filterRoute(mode) {
    currentFilter = mode;
    const section = document.getElementById('route-list-section');
    const container = document.getElementById('route-list');
    const title = document.getElementById('route-list-title');
    const count = document.getElementById('route-count');

    // Clear active states
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active', 'border-primary');
    });

    // Set active state
    const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'border-primary');
    }

    // Filter routes
    let filteredRoutes = [];
    let titleText = 'Daftar Rute';

    if (mode === 'brt') {
        // For Transjakarta, show both BRT and Non-BRT
        filteredRoutes = window.appData.routes.filter(r => r.mode === 'brt' || r.mode === 'nbrt');
        titleText = 'Rute Transjakarta';
    } else if (mode === 'mikro') {
        // Mikrotrans includes rusun routes - sort so rusun is first
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

    // Helper to format route badge (multi-line for JAK routes)
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

    // Generate route cards
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

    // Show section
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Clear filter (Index Page)
function clearFilter() {
    currentFilter = null;
    const section = document.getElementById('route-list-section');
    if (section) section.classList.add('hidden');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active', 'border-primary');
    });
}

// Initialize guides (Index Page)
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

// Toggle accordion (Index Page)
function toggleAccordion(index) {
    const content = document.getElementById(`accordion-content-${index}`);
    const icon = document.getElementById(`accordion-icon-${index}`);

    if (content && icon) {
        content.classList.toggle('open');
        icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
    }
}

// Open detail page (Shared)
function openDetail(routeId) {
    if (!window.appData) return;
    const route = window.appData.routes.find(r => r.id === routeId);
    if (route) {
        const slug = route.code.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        // Works both locally and on server
        window.location.href = 'route-detail.html?rute=' + slug;
    }
}

// Go back (Shared)
function goBack() {
    window.location.href = '/';
}

// Get route slug (Detail Page)
function getRouteSlug() {
    // Check URL path first (e.g., /rute/jak-85)
    const pathMatch = window.location.pathname.match(/\/rute\/([a-zA-Z0-9-]+)/);
    if (pathMatch) return pathMatch[1];

    // Fallback to query parameter (e.g., ?rute=jak-85)
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('rute');
}

// Get route data by slug (Detail Page)
function getRouteData(slug) {
    if (!slug || !window.appData) return null;
    return window.appData.routes.find(route => {
        const routeSlug = route.code.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        return routeSlug === slug.toLowerCase();
    });
}

// Get mode label (Detail Page)
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

// Global state for detail page
let currentRouteDetail = null;
let currentDirectionIndex = 0;

function switchDirection(index) {
    if (!currentRouteDetail || !currentRouteDetail.directions || !currentRouteDetail.directions[index]) return;

    currentDirectionIndex = index;

    // Update buttons state
    const directions = currentRouteDetail.directions;
    directions.forEach((dir, i) => {
        const btn = document.getElementById(`btn-dir-${i}`);
        if (btn) {
            if (i === index) {
                // Active
                btn.className = "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm bg-white text-primary ring-1 ring-black/5 scale-[1.02]";
                btn.classList.remove('text-gray-500', 'hover:bg-white/50');
            } else {
                // Inactive
                btn.className = "flex-1 py-3 px-4 rounded-xl text-sm font-medium text-gray-500 hover:bg-white/50 transition-all duration-300";
            }
        }
    });

    renderTimeline(currentRouteDetail.directions[index].stops);
}

function renderTimeline(stops) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    // Check for route map image (e.g., for 11P)
    if (currentRouteDetail && currentRouteDetail.routeMapImage) {
        
        // --- Hapus padding kiri biar gambar pas di tengah ---
        container.classList.remove('pl-6', 'md:pl-4');
        // --------------------------------------------------

        // Hide direction buttons specific to this timeline
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

    // --- Kembalikan padding untuk rute biasa ---
    container.classList.add('pl-6', 'md:pl-4');
    // ------------------------------------------

    if (!stops || stops.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-4">Data pemberhentian tidak tersedia.</p>';
        return;
    }

    // Find first active stop index and separator index
    let firstActiveIndex = stops.findIndex(s => s.isActive);
    let separatorIndex = stops.findIndex(s => s.isSeparator || s.name === '---');

    // If no active stop found, show all stops
    if (firstActiveIndex === -1) firstActiveIndex = 0;

    // Helper to render halte integration info for KRL/LRT
    const renderHalteInfo = (stop) => {
        if (!stop.halteInfo) return '';

        const { type, halte, routes, stops: halteStops } = stop.halteInfo;
        const typeLabel = type === 'integrasi' ? 'Integrasi Halte' : (type === 'stasiun' ? 'Integrasi' : 'Halte Terdekat');

        let halteHtml = '';

        // New format: stops array with individual halte/routes
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
        }
        // Old format: halte array + routes array (shared routes for all halte)
        else if (halte && routes) {
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

        // Station integration (for train connections like Sudirman C line)
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

    // Helper to render station icons (train icons + auto bus icon for halte integrations)
    const renderStationIcons = (stop) => {
        let iconsHtml = '';

        // Render explicit icons (KCIC, KAJJ, MRT, train, etc.)
        if (stop.icons && stop.icons.length > 0) {
            iconsHtml += stop.icons.map(icon =>
                `<img src="assets/images/${icon}" alt="${icon.replace('.svg', '')}" class="h-5 w-5 inline-block ml-1">`
            ).join('');
        }

        // Auto-add bus icon if station has halte integration with bus routes
        if (stop.halteInfo) {
            iconsHtml += `<img src="assets/images/icon-bus.svg" alt="bus" class="h-5 w-5 inline-block ml-1">`;
        }

        return iconsHtml;
    };

    // Helper to render a stop item
    const createStopItem = (stop, idx, totalStops, globalIdx) => {
        // Skip separator items in normal rendering
        if (stop.isSeparator || stop.name === '---') return '';

        const isFirst = globalIdx === 0;
        const isLast = globalIdx === totalStops - 1;
        const isActive = stop.isActive;
        // Changed from "Dekat MAN 9" to "TERDEKAT"
        const label = stop.label || (isActive ? "TERDEKAT" : null);

        // Dot Style
        let dotHtml = '';
        if (isFirst) {
            dotHtml = `<div class="absolute -left-[11px] top-1 h-6 w-6 rounded-full border-4 border-white bg-blue-500 shadow-sm z-10 flex items-center justify-center">
                <div class="h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>`;
        } else if (isLast) {
            dotHtml = `<div class="absolute -left-[11px] top-1 h-6 w-6 rounded-full border-4 border-white bg-red-500 shadow-sm z-10 flex items-center justify-center">
               <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>`;
        } else if (isActive) {
            dotHtml = `<div class="absolute -left-[13px] top-0 h-7 w-7 rounded-full border-4 border-white bg-primary shadow-md z-10 animate-pulse"></div>
                       <div class="absolute -left-[13px] top-0 h-7 w-7 rounded-full border-4 border-white bg-primary shadow-md z-10 flex items-center justify-center">
                           <span class="text-[8px] font-bold text-white">${currentRouteDetail.code || ''}</span>
                       </div>`;
        } else {
            dotHtml = `<div class="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-white bg-gray-300 shadow-sm z-10 group-hover/stop:bg-gray-400 transition-colors"></div>`;
        }

        // Card Style (highlight active)
        const cardClass = isActive
            ? "bg-gradient-to-r from-blue-50 to-white border-blue-200 shadow-md transform scale-[1.02]"
            : "hover:bg-gray-50 border-transparent hover:border-gray-100";

        // Transfer Pills
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

        // Halte integration info (for KRL/LRT)
        const halteInfoHtml = renderHalteInfo(stop);
        const stationIconsHtml = renderStationIcons(stop);

        return `
        <div class="relative pb-10 last:pb-0 group/stop fade-in">
             ${!isLast ? '<div class="absolute left-[-1px] top-2 bottom-[-10px] w-0.5 bg-gray-200 group-hover/stop:bg-gray-300 transition-colors"></div>' : ''}
             
             ${dotHtml}

             <div class="ml-4 p-3 rounded-2xl border transition-all duration-300 ${cardClass}">
                 <div class="flex justify-between items-start">
                     <div>
                         <h4 class="text-sm md:text-base font-bold text-gray-800 ${isActive ? 'text-primary' : ''}">${stop.name}${stationIconsHtml}</h4>
                         ${label ? `<span class="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md">${label}</span>` : ''}
                     </div>
                     ${isFirst ? '<span class="text-[10px] font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Mulai</span>' : ''}
                     ${isLast ? '<span class="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">Selesai</span>' : ''}
                 </div>
                 
                 ${transfersHtml}
                 ${halteInfoHtml}
             </div>
        </div>
        `;
    };

    // Create collapsible section HTML
    const createCollapsibleSection = (sectionStops, sectionId, label, isExpanded = false) => {
        const validStops = sectionStops.filter(s => !s.isSeparator && s.name !== '---');
        if (validStops.length === 0) return '';

        const count = validStops.length;
        const iconRotate = isExpanded ? 'rotate-180' : '';
        const contentHidden = isExpanded ? '' : 'hidden';

        return `
        <div class="collapsible-section mb-4">
            <button onclick="toggleStopSection('${sectionId}')" 
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
                ${validStops.map((stop, idx) => createStopItem(stop, idx, stops.length, sectionStops.indexOf(stop))).join('')}
            </div>
        </div>`;
    };

    let html = '';

    // Check if this is a KRL route with separator
    if (separatorIndex > -1) {
        // Split into before separator and after separator
        const beforeSeparator = stops.slice(0, separatorIndex);
        const afterSeparator = stops.slice(separatorIndex + 1);

        // Find active stops in each section
        const activeInBefore = beforeSeparator.some(s => s.isActive);
        const activeInAfter = afterSeparator.some(s => s.isActive);

        // Render before separator section
        if (beforeSeparator.length > 0) {
            if (activeInBefore) {
                // Show first stop, then collapsible "sebelumnya", then active area, then collapsible "sesudahnya"
                const firstActiveInBefore = beforeSeparator.findIndex(s => s.isActive);

                // First stop always visible
                html += createStopItem(beforeSeparator[0], 0, stops.length, 0);

                // Stops between first and active (collapsible)
                if (firstActiveInBefore > 1) {
                    const middleStops = beforeSeparator.slice(1, firstActiveInBefore);
                    html += createCollapsibleSection(middleStops, 'before-active-1', 'Lihat {count} Pemberhentian Sebelumnya');
                }

                // Active stops and nearby
                const activeAreaStart = Math.max(1, firstActiveInBefore);
                const activeAreaEnd = Math.min(beforeSeparator.length, firstActiveInBefore + 3);
                for (let i = activeAreaStart; i < activeAreaEnd; i++) {
                    html += createStopItem(beforeSeparator[i], i, stops.length, i);
                }

                // Remaining stops before separator (collapsible)
                if (activeAreaEnd < beforeSeparator.length) {
                    const remainingStops = beforeSeparator.slice(activeAreaEnd);
                    html += createCollapsibleSection(remainingStops, 'after-active-1', 'Lihat {count} Pemberhentian Sesudahnya');
                }
            } else {
                // No active in this section - show first and last, collapse middle
                html += createStopItem(beforeSeparator[0], 0, stops.length, 0);
                if (beforeSeparator.length > 2) {
                    const middleStops = beforeSeparator.slice(1, -1);
                    html += createCollapsibleSection(middleStops, 'middle-1', 'Lihat {count} Pemberhentian');
                }
                if (beforeSeparator.length > 1) {
                    html += createStopItem(beforeSeparator[beforeSeparator.length - 1], beforeSeparator.length - 1, stops.length, separatorIndex - 1);
                }
            }
        }

        // Separator dropdown for after section
        if (afterSeparator.length > 0) {
            html += createCollapsibleSection(afterSeparator, 'after-separator', 'Lihat {count} Pemberhentian Selanjutnya');
        }

    } else {
        // Normal route without separator
        // Show first stop
        html += createStopItem(stops[0], 0, stops.length, 0);

        // Collapsible section before active stop
        if (firstActiveIndex > 1) {
            const beforeActive = stops.slice(1, firstActiveIndex);
            html += createCollapsibleSection(beforeActive, 'before-active', 'Lihat {count} Pemberhentian Sebelumnya');
        }

        // Show active stop(s) and a few around it
        const activeStart = Math.max(1, firstActiveIndex);
        const activeEnd = Math.min(stops.length - 1, firstActiveIndex + 3);
        for (let i = activeStart; i < activeEnd; i++) {
            html += createStopItem(stops[i], i, stops.length, i);
        }

        // Collapsible section after active area
        if (activeEnd < stops.length - 1) {
            const afterActive = stops.slice(activeEnd, -1);
            html += createCollapsibleSection(afterActive, 'after-active', 'Lihat {count} Pemberhentian Sesudahnya');
        }

        // Show last stop
        if (stops.length > 1) {
            html += createStopItem(stops[stops.length - 1], stops.length - 1, stops.length, stops.length - 1);
        }
    }

    container.innerHTML = html;
}

// Toggle collapsible stop sections
function toggleStopSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    const icon = document.getElementById(`icon-${sectionId}`);

    if (section && icon) {
        section.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
}

// Render detail page (Detail Page)
function renderDetail() {
    const routeSlug = getRouteSlug();
    if (!routeSlug) { window.location.href = 'index.html'; return; }

    const route = getRouteData(routeSlug);
    if (!route) { window.location.href = 'index.html'; return; }

    currentRouteDetail = route; // Store global

    // 1. Update Hero & Meta
    const heroImg = document.getElementById('hero-image');
    if (heroImg && route.details && route.details.heroImage) heroImg.src = route.details.heroImage;

    // Special layout for 11P (No Hero Image)
    const heroContainer = document.getElementById('hero-image-container');
    const heroInfoCard = document.getElementById('hero-info-card');

    if (route.code === '11P' || route.hideHeroImage) {
        if (heroContainer) heroContainer.style.display = 'none';

        if (heroInfoCard) {
            heroInfoCard.classList.remove('absolute', '-bottom-24', 'left-4', 'right-4', 'md:left-8', 'md:right-8');
            heroInfoCard.classList.add('relative', 'w-full', 'mt-4');
        }

        // Adjust parent container margin if needed? 
        // The parent .relative.mb-32.z-10 might need less margin bottom since there's no overlap
        const parentSection = heroInfoCard?.closest('.relative.mb-32.z-10');
        if (parentSection) {
            parentSection.classList.remove('mb-32');
            parentSection.classList.add('mb-8');
        }

    } else {
        // Reset defaults (in case of SPA navigation)
        if (heroContainer) heroContainer.style.display = 'block';

        if (heroInfoCard) {
            heroInfoCard.classList.add('absolute', '-bottom-24', 'left-4', 'right-4', 'md:left-8', 'md:right-8');
            heroInfoCard.classList.remove('relative', 'w-full', 'mt-4');
        }

        const parentSection = heroInfoCard?.closest('.relative.mb-8.z-10'); // Check if it was modified
        if (parentSection) {
            parentSection.classList.remove('mb-8');
            parentSection.classList.add('mb-32');
        }
    }

    const badgeContainer = document.getElementById('route-badge-container');
    if (badgeContainer) {
        // Multi-line badge for JAK routes
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

    // Route Meta (Mode)
    const modeInfo = getModeLabel(route.mode); // Reuse existing helper
    const metaContainer = document.getElementById('route-meta');
    if (metaContainer) {
        metaContainer.innerHTML = `
            <span class="w-2 h-2 rounded-full" style="background-color: ${route.badgeColor || '#ccc'}"></span>
            <span>${modeInfo.text}</span>
        `;
    }

    // Docs / Stats
    if (route.details) {
        document.getElementById('route-tarif').textContent = route.details.tarif || '--';
        const tarifNote = document.getElementById('route-tarif-note');
        if (tarifNote) {
            tarifNote.textContent = route.details.tarifNote || '';
            if (!route.details.tarifNote) tarifNote.classList.add('hidden');
        }

        document.getElementById('route-headway').innerHTML = `
            <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>${route.details.headway || '--'}</span>
        `;
        document.getElementById('route-ops').textContent = route.details.ops || '--';
        const opsNote = document.getElementById('route-ops-note');
        if (opsNote) {
            opsNote.textContent = route.details.opsNote || '';
            if (!route.details.opsNote) opsNote.classList.add('hidden');
        }
    }

    // 2. Setup Directions
    if (route.directions && route.directions.length > 0) {
        // Setup buttons
        route.directions.forEach((dir, i) => {
            const btn = document.getElementById(`btn-dir-${i}`);
            if (btn) {
                btn.textContent = dir.name;
                btn.classList.remove('hidden');
            }
        });

        // Hide unused buttons if < 2 directions (e.g. circle or one-way logic)
        if (route.directions.length < 2) {
            const btn1 = document.getElementById(`btn-dir-1`);
            if (btn1) btn1.classList.add('hidden');
        }

        // Render Initial Direction (0)
        switchDirection(0);
    }

    document.title = `${route.code} - ${route.name} | TF MANINE`;
}


document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the index page (by checking for guides-container)
    if (document.getElementById('guides-container')) {
        initGuides();

        // Check for mode filter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        if (mode) {
            setTimeout(() => { filterRoute(mode); }, 100);
        }

        // Clean URL
        if (window.location.pathname.endsWith('index.html')) {
            const cleanUrl = window.location.pathname.replace('index.html', '');
            window.history.replaceState({}, document.title, cleanUrl || '/');
        }
    }

    // Check if we are on the detail page (by checking for hero-image which is unique to new detail)
    if (document.getElementById('hero-image')) {
        renderDetail();

        // Clean URL for detail page
        const routeSlug = getRouteSlug();
        if (routeSlug && window.location.search.includes('rute=')) {
            const cleanUrl = '/rute/' + routeSlug;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }
});
