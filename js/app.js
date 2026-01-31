async function loadHTML(id, file) {
  const el = document.getElementById(id);

  try {
    const res = await fetch(file);

    if (!res.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    el.innerHTML = await res.text();
  } catch (error) {
    console.error(error);
    const fallback = await fetch('views/filenotfound.html');
    el.innerHTML = await fallback.text();
    document.getElementById('pageTitle').innerText = 'PAGE NOT FOUND';
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

