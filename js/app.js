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

/* Initial Load */
(async () => {
  await loadHTML('sidebar', 'components/sidebar.html');
  await loadHTML('header', 'components/header.html');
  await showView('executive');
})();


