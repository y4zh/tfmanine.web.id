let currentFilter = null;

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

    if (!window.appData) return;

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
    }

    title.textContent = titleText;
    count.textContent = `(${filteredRoutes.length} rute)`;

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
        <div class="route-card bg-white rounded-xl p-4 shadow-sm cursor-pointer border border-gray-100 font-sans" onclick="openDetail('${route.id}')">
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

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearFilter() {
    currentFilter = null;
    document.getElementById('route-list-section')?.classList.add('hidden');
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active', 'border-primary'));
}

function initGuides() {
    const container = document.getElementById('guides-container');
    if (!container || !window.appData) return;

    container.innerHTML = window.appData.guides.map((guide, index) => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-sans">
            <button onclick="toggleAccordion(${index})" class="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <div class="flex items-center space-x-3">
                    <span class="font-semibold text-gray-800 font-sans">${guide.title}</span>
                </div>
                <svg id="accordion-icon-${index}" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div id="accordion-content-${index}" class="accordion-content hidden px-4 pb-4 pt-2 border-t border-gray-100">
                <ol class="space-y-3 font-data font-sans">
                    ${guide.steps.map((step, stepIndex) => `
                        <li class="flex items-start space-x-3">
                            <span class="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">${stepIndex + 1}</span>
                            <span class="text-gray-700 text-sm leading-relaxed">${step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')}</span>
                        </li>
                    `).join('')}
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
    if (!currentRouteDetail || !currentRouteDetail.directions?.[index]) return;
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

    container.innerHTML = stops.map((stop, idx) => {
        if (stop.name === '---') return '<div class="h-px bg-gray-100 my-4 ml-4"></div>';
        const isFirst = idx === 0;
        const isLast = idx === stops.length - 1;
        const color = isFirst ? 'bg-blue-500' : (isLast ? 'bg-red-500' : 'bg-gray-300');
        
        // Logika Transit Route Colors
        let transfersHtml = '';
        if (stop.transfers && stop.transfers.length > 0) {
            transfersHtml = `<div class="flex flex-wrap gap-1 mt-1">`;
            stop.transfers.forEach(t => {
                let badgeColor = "#6b7280"; // Default Gray 
                if (window.routeColors) {
                    if (window.routeColors[t]) badgeColor = window.routeColors[t];
                    else if (t.startsWith("JAK")) badgeColor = window.routeColors["JAK"];
                    else if (t.includes("KRL") || t.includes("Commuter")) badgeColor = window.routeColors["KRL"];
                }
                transfersHtml += `<span class="px-2 py-0.5 rounded text-[9px] font-bold text-white font-sans" style="background-color: ${badgeColor}">${t}</span>`;
            });
            transfersHtml += `</div>`;
        }

        // Logika Label "Terdekat"
        let labelHtml = '';
        if (stop.label || stop.isActive) {
            const labelText = stop.label || "TERDEKAT";
            labelHtml = `<div class="mt-1"><span class="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-md font-sans">${labelText}</span></div>`;
        }

        return `
        <div class="relative pb-6 last:pb-0 flex items-start group font-sans">
            <div class="absolute left-[10px] top-2 bottom-0 w-0.5 bg-gray-100 group-last:hidden"></div>
            <div class="relative z-10 w-5 h-5 rounded-full border-4 border-white ${color} shadow-sm mt-1 flex-shrink-0"></div>
            <div class="ml-4 flex-1">
                <h4 class="text-sm font-bold text-gray-800 leading-tight">${stop.name}</h4>
                ${transfersHtml}
                ${labelHtml}
            </div>
        </div>`;
    }).join('');
}

function renderDetail() {
    const routeSlug = getRouteSlug();
    const route = getRouteData(routeSlug);
    if (!route) return;

    currentRouteDetail = route;
    document.getElementById('route-name').textContent = route.name;
    document.getElementById('route-tarif').textContent = route.details.tarif;
    document.getElementById('route-headway').textContent = route.details.headway;
    document.getElementById('route-ops').textContent = route.details.ops;
    document.getElementById('route-meta').textContent = getModeLabel(route.mode).text;

    const badgeContainer = document.getElementById('route-badge-container');
    if (route.code.startsWith('JAK ')) {
        const num = route.code.replace('JAK ', '');
        badgeContainer.innerHTML = `<div class="w-16 h-16 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white font-bold" style="background-color: ${route.badgeColor || '#0072bc'}"><span class="text-xs">JAK</span><span class="text-2xl">${num}</span></div>`;
    } else {
        badgeContainer.innerHTML = `<div class="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl font-bold" style="background-color: ${route.badgeColor || '#0072bc'}">${route.code}</div>`;
    }

    // Update Teks Tombol Arah secara Dinamis 
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
    
    document.title = `${route.code} - ${route.name} | Transportasi MAN 9 Jakarta`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('category-grid')) renderCategories();
    if (document.getElementById('guides-container')) initGuides();
    if (document.getElementById('map-container')) renderDetail();
});
