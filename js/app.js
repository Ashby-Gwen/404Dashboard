async function loadHTML(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return false;

        const text = await response.text();
        const container = document.getElementById(id);
        if (container) container.innerHTML = text;

        return true;
    } catch {
        return false;
    }
}

async function showView(view) {
    const titles = {
        executive: 'EXECUTIVE OVERVIEW',
        sales: 'SALES PERFORMANCE',
        trends: 'TRENDS COMPARISON',
        ingredients: 'INGREDIENT COSTS',
        dataentry: 'DATA ENTRY & UPLOAD',
        profile: 'USER PROFILE SETTINGS',
        alerts: 'SYSTEM ALERTS',

        // 🔹 ANALYTICS VIEWS
        'sales-analytics': 'SALES ANALYTICS',
        'trends-analytics': 'TRENDS ANALYTICS',
        'ingredients-analytics': 'INGREDIENT ANALYTICS'
    };

    const titleEl = document.getElementById('pageTitle');
    if (titleEl) {
        titleEl.innerText = titles[view] || 'PAGE NOT FOUND';
    }

    // Attempt to load the requested view
    const success = await loadHTML('content', `views/${view}.html`);

    // Fallback to 404 view if missing
    if (!success) {
        await loadHTML('content', 'views/filenotfound.html');
    }

    // Auto-close sidebar on mobile
    if (window.innerWidth < 768) toggleSidebar();
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.toggle('hidden');
}

function setupNavigation() {
    // Delegated navigation: works for dynamically loaded content
    document.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-view]');
        if (!btn) return;

        const view = btn.getAttribute('data-view');
        showView(view);
    });
}

/* Initial Load */
(async () => {
    await loadHTML('sidebar', 'components/sidebar.html');
    await loadHTML('header', 'components/header.html');

    setupNavigation();

    await showView('executive');
})();
