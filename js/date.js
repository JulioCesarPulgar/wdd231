document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    var lm = document.getElementById('lastModified');
    if (lm) lm.textContent = 'Last Modified: ' + document.lastModified;
});
