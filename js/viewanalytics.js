(function () {

  function navigateToAnalytics(viewName) {
    const target = `views/analytics/${viewName}.html`;

    fetch(target, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.location.href = target;
        } else {
          window.location.href = 'views/filenotfound.html';
        }
      })
      .catch(() => {
        window.location.href = 'views/filenotfound.html';
      });
  }

  // Attach to ALL buttons automatically
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.view-analytics-btn');
    if (!btn) return;

    const view = btn.dataset.view;
    navigateToAnalytics(view);
  });

})();
