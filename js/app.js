const CONTENT_ID = 'content';

async function loadView(viewName) {
  const container = document.getElementById(CONTENT_ID);
  const viewPath = `views/${viewName}.html`;

  try {
    const response = await fetch(viewPath);

    if (!response.ok) {
      throw new Error(`404: ${viewPath} not found`);
    }

    container.innerHTML = await response.text();
  } catch (err) {
    console.error(err);

    // Fallback to file-not-found view
    const fallback = await fetch('views/filenotfound.html');
    container.innerHTML = await fallback.text();

    document.getElementById('pageTitle').innerText = 'PAGE NOT FOUND';
  }
}

function showView(viewName, btn = null) {
  const titles = {
    executive: 'EXECUTIVE OVERVIEW',
    sales: 'SALES PERFORMANCE',
    trends: 'TRENDS COMPARISON',
    ingredients: 'INGREDIENT COSTS'
  };

  document.getElementById('pageTitle').innerText =
    titles[viewName] || 'PAGE NOT FOUND';

  // nav button state
  document.querySelectorAll('.nav-btn')
    .forEach(b => b.classList.remove('active'));

  if (btn) btn.classList.add('active');

  loadView(viewName);

  // auto-close sidebar on mobile
  if (window.innerWidth < 768) toggleSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar')
    .classList.toggle('hidden');
}
