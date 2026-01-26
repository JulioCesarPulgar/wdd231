// Enhanced UI behaviors: responsive nav, directory search + filter, and form validation
document.addEventListener('DOMContentLoaded', function () {
    // Responsive nav toggle (supports multiple pages)
    function setupNavToggle(buttonId) {
        var btn = document.getElementById(buttonId);
        var nav = document.getElementById('main-nav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () {
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('show');
            if (!expanded) {
                nav.querySelector('a')?.focus();
            }
        });
    }
    setupNavToggle('nav-toggle');
    setupNavToggle('nav-toggle-discover');
    setupNavToggle('nav-toggle-directory');
    setupNavToggle('nav-toggle-join');

    // Directory: search + category filter
    var search = document.getElementById('directory-search');
    var list = document.getElementById('business-list');
    var category = document.getElementById('category-filter');
    function filterDirectory() {
        if (!list) return;
        var q = (search?.value || '').toLowerCase().trim();
        var cat = (category?.value || 'all');
        Array.from(list.querySelectorAll('.business')).forEach(function (item) {
            var name = (item.dataset.name || '').toLowerCase();
            var c = (item.dataset.category || '');
            var matchesText = q === '' || name.indexOf(q) !== -1 || c.toLowerCase().indexOf(q) !== -1;
            var matchesCat = cat === 'all' || c === cat;
            item.style.display = (matchesText && matchesCat) ? '' : 'none';
        });
    }
    if (search) search.addEventListener('input', filterDirectory);
    if (category) category.addEventListener('change', filterDirectory);

    // Join form: validation and feedback (client-only)
    var form = document.getElementById('join-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var msg = document.getElementById('form-message');
            msg.textContent = '';
            var required = Array.from(form.querySelectorAll('[required]'));
            var missing = required.filter(function (f) { return !f.value || !String(f.value).trim(); });
            var email = form.querySelector('input[type="email"]');
            if (missing.length) {
                msg.textContent = 'Please complete all required fields.';
                msg.style.color = 'crimson';
                missing[0].focus();
                return;
            }
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                msg.textContent = 'Please provide a valid email address.';
                msg.style.color = 'crimson';
                email.focus();
                return;
            }
            // Success (demo): show confirmation and reset form
            msg.style.color = 'var(--success)';
            msg.textContent = 'Thank you — your application has been received (demo).';
            form.reset();
        });
    }

    // Optional: lightweight weather fetch example (disabled by default)
    // To enable: set `WEATHER_API_KEY` and `CITY_ID` below and uncomment call to `fetchWeather()`.
    var WEATHER_API_KEY = '';
    var CITY_ID = '';
    function fetchWeather() {
        if (!WEATHER_API_KEY || !CITY_ID) return;
        var url = `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&lang=en&units=metric&appid=${WEATHER_API_KEY}`;
        fetch(url).then(function (r) { return r.json(); }).then(function (data) {
            var el = document.getElementById('weather');
            if (!el) return;
            el.innerHTML = `<p>${data.name}: ${Math.round(data.main.temp)}°C — ${data.weather[0].description}</p>`;
        }).catch(function () {/* ignore errors in demo */ });
    }
    // fetchWeather(); // enable when configured
});

