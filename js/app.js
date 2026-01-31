async function loadHTML(id, url) {
    try {
        const response = await fetch(url);
        
        // Check if the file actually exists (status 200-299)
        if (!response.ok) {
            return false; 
        }

        const text = await response.text();
        document.getElementById(id).innerHTML = text;
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
    ingredients: 'INGREDIENT COSTS'
  };

  document.getElementById('pageTitle').innerText = titles[view];
  (await loadHTML('content', `views/${view}.html`)) || 
  (await loadHTML('content', 'views/filenotfound.html'));

  if (window.innerWidth < 768) toggleSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('hidden');
}

function setupNavigation() {
    // We look for the container holding the buttons
    const navContainer = document.querySelector('.flex.gap-3.flex-wrap');

    if (!navContainer) return;

    navContainer.addEventListener('click', (event) => {
        // Check if what was clicked is a button with our data attribute
        const btn = event.target.closest('[data-view]');
        
        if (btn) {
            const view = btn.getAttribute('data-view');
            console.log(`Navigating to: ${view}`);
            
            // Call the function we built in the previous step
            navigateTo(view);
        }
    });
}

// Call this once your components are loaded
window.addEventListener('DOMContentLoaded', () => {
    // ... your other loadHTML calls ...
    setupNavigation();
});

/* Initial Load */
(async () => {
  await loadHTML('sidebar', 'components/sidebar.html');
  await loadHTML('header', 'components/header.html');
  await showView('executive');
})();

