async function loadHTML(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(file);
  el.innerHTML = await res.text();
}

async function showView(view) {
  const titles = {
    executive: 'EXECUTIVE OVERVIEW',
    sales: 'SALES PERFORMANCE',
    trends: 'TRENDS COMPARISON',
    ingredients: 'INGREDIENT COSTS'
  };

  document.getElementById('pageTitle').innerText = titles[view];
  await loadHTML('content', `views/${view}.html`);

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
