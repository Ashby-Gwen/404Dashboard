async function navigate(view) {
  const container = document.getElementById('content');
  const file = `views/${view}.html`;

  try {
    const res = await fetch(file);

    if (!res.ok) throw new Error('View not found');

    container.innerHTML = await res.text();
    updateTitle(view);
    setActive(view);

  } catch {
    const fallback = await fetch('views/filenotfound.html');
    container.innerHTML = await fallback.text();
    updateTitle('notfound');
    clearActive();
  }
}

function updateTitle(view) {
  const titles = {
    executive: 'EXECUTIVE OVERVIEW',
    sales: 'SALES PERFORMANCE',
    trends: 'TRENDS COMPARISON',
    ingredients: 'INGREDIENT COSTS',
    notfound: 'PAGE NOT FOUND'
  };

  document.getElementById('pageTitle').innerText =
    titles[view] || 'PAGE NOT FOUND';
}

function setActive(view) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle(
      'active',
      btn.textContent.toLowerCase().includes(view)
    );
  });
}

function clearActive() {
  document.querySelectorAll('.nav-btn')
    .forEach(btn => btn.classList.remove('active'));
}
