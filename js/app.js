async function navigate(view) {
  const container = document.getElementById('content');
  const title = document.getElementById('pageTitle');
  const file = `views/${view}.html`;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error('Not found');

    container.innerHTML = await res.text();
    title.innerText = formatTitle(view);

  } catch {
    const fallback = await fetch('views/filenotfound.html');
    container.innerHTML = await fallback.text();
    title.innerText = 'PAGE NOT FOUND';
  }
}

function formatTitle(view) {
  const map = {
    executive: 'EXECUTIVE OVERVIEW',
    sales: 'SALES PERFORMANCE',
    trends: 'TRENDS COMPARISON',
    ingredients: 'INGREDIENT COSTS'
  };
  return map[view] || 'PAGE NOT FOUND';
}

// Load default page
navigate('executive');
