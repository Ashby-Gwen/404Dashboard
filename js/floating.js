// js/floating.js

document.addEventListener('DOMContentLoaded', () => {
    initFloatingWindow();
});

function initFloatingWindow() {
    const windowEl = document.getElementById('floating-window');
    const tabBtn = document.getElementById('popup-tab');
    const closeBtn = document.getElementById('close-popup');

    if (!windowEl || !tabBtn) return;

    // Toggle the window when clicking the tab
    tabBtn.addEventListener('click', () => {
        windowEl.classList.toggle('translate-x-[calc(100%-48px)]');
        windowEl.classList.toggle('translate-x-0');
    });

    // Close window when clicking the X
    closeBtn.addEventListener('click', () => {
        windowEl.classList.add('translate-x-[calc(100%-48px)]');
        windowEl.classList.remove('translate-x-0');
    });
}
