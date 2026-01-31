async function loadHTML(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return false; 
        const text = await response.text();
        const container = document.getElementById(id);
        if (container) container.innerHTML = text;
        return true;
    } catch (error) {
        return false;
    }
}

async function showView(view) {
    const titles = {
        executive: 'EXECUTIVE OVERVIEW',
        sales: 'SALES PERFORMANCE',
        trends: 'TRENDS COMPARISON',
        ingredients: 'INGREDIENT COSTS',
        alerts: 'ALERTS',
        profile: 'PROFILE'
    };

    const titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.innerText = titles[view] || 'PAGE NOT FOUND';

    // Try loading the view, fallback to 404 if it fails
    const success = await loadHTML('content', `views/${view}.html`);
    if (!success) {
        await loadHTML('content', 'views/filenotfound.html');
    }

    if (window.innerWidth < 768) toggleSidebar();
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.toggle('hidden');
}

function setupNavigation() {
    // Listen for clicks on the document and delegate
    // This works even if buttons are inside loaded components
    document.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-view]');
        if (btn) {
            const view = btn.getAttribute('data-view');
            showView(view); // Fixed function name
        }
    });
}

/* Initial Load */
(async () => {
    // Load structure first
    await loadHTML('sidebar', 'components/sidebar.html');
    await loadHTML('header', 'components/header.html');
    
    // Setup listeners after HTML is injected
    setupNavigation();
    
    // Initial view
    await showView('executive');
})();

