var App = (function() {
    var currentSection = 'notes';
    var currentNote = null;
    var currentTheme = 'dark';

    function showSection(sectionName) {
        currentSection = sectionName;
        currentNote = null;
        document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('visible'); });
        document.getElementById('noteDetail').classList.remove('visible');
        document.getElementById('section-' + sectionName).classList.add('visible');
        document.querySelectorAll('.nav-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-section') === sectionName);
        });
        var nav = document.querySelector('.nav');
        var overlay = document.getElementById('navOverlay');
        var btn = document.getElementById('burgerBtn');
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            overlay.classList.remove('open');
            btn.classList.remove('open');
            btn.textContent = '☰';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openNote(section, id) {
        var allItems = KERNEL_DATA.getAll();
        var item = allItems.find(function(i) { return i.section === section && i.id === id; });
        if (!item) return;
        currentNote = item;
        document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('visible'); });
        document.getElementById('noteDetail').classList.add('visible');
        document.getElementById('detailTitle').textContent = item.title;
        document.getElementById('detailMeta').textContent = item.date + ' · ' + (item.tags || []).join(', ');
        var content = document.getElementById('detailContent');
        content.innerHTML = typeof item.content === 'function' ? item.content() : item.content;
        wrapWideTables(content);
        if (typeof hljs !== 'undefined') {
            content.querySelectorAll('pre code').forEach(function(block) { hljs.highlightElement(block); });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Гарантированно оборачивает КАЖДУЮ таблицу в контейнер с горизонтальным
    // скроллом — независимо от того, какие классы/инлайн-стили у неё заданы
    // в конкретном конспекте (ws-table, ws-bit-table и т.п.). Раньше скролл
    // держался на CSS-трюке "display:block на самой <table>", который в паре
    // с широкими таблицами (например ws-bit-table в конспекте по Wireshark)
    // создавал два вложенных скролл-контейнера сразу — из-за этого браузер
    // путал, что именно скроллить, и вместо таблицы начинала скроллиться
    // вся страница вбок. Явная обёртка через JS убирает эту неоднозначность
    // раз и навсегда, для любого текущего и будущего конспекта.
    function wrapWideTables(container) {
        if (!container) return;
        container.querySelectorAll('table').forEach(function(table) {
            if (table.closest('.table-wrap')) return; // уже обёрнута вручную в контенте
            var wrap = document.createElement('div');
            wrap.className = 'table-wrap';
            table.parentNode.insertBefore(wrap, table);
            wrap.appendChild(table);
        });
    }

    function closeNote() {
        currentNote = null;
        document.getElementById('noteDetail').classList.remove('visible');
        document.getElementById('section-' + currentSection).classList.add('visible');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== НОВЫЕ ТЕМЫ =====
    function selectTheme(theme) {
        currentTheme = theme;
        
        // Убираем все старые классы тем
        var themes = ['dark', 'light', 'neon', 'retro', 'glass', 'brutal', 'nature'];
        themes.forEach(function(t) {
            document.body.classList.remove(t + '-theme');
        });
        
        // Добавляем новый класс
        document.body.classList.add(theme + '-theme');
        
        // Обновляем активный класс в панели выбора
        document.querySelectorAll('.theme-option').forEach(function(el) {
            el.classList.toggle('active', el.getAttribute('data-theme') === theme);
        });
        
        // Обновляем кнопку темы
        var themeBtn = document.getElementById('themeToggle');
        var icons = {
            'dark': '🌑',
            'light': '☀️',
            'neon': '💜',
            'retro': '📜',
            'glass': '🔮',
            'brutal': '⬛',
            'nature': '🌿'
        };
        themeBtn.textContent = icons[theme] || '🎨';
        
        localStorage.setItem('kernel-theme', theme);
        closeThemePicker();
    }

    function toggleTheme() {
        if (currentTheme === 'dark') {
            selectTheme('light');
        } else {
            selectTheme('dark');
        }
    }

    function loadTheme() {
        var saved = localStorage.getItem('kernel-theme') || 'dark';
        selectTheme(saved);
    }

    function openThemePicker() {
        var overlay = document.getElementById('themePickerOverlay');
        if (overlay) overlay.classList.add('open');
    }

    function closeThemePicker() {
        var overlay = document.getElementById('themePickerOverlay');
        if (overlay) overlay.classList.remove('open');
    }

    function toggleMenu() {
        var nav = document.querySelector('.nav');
        var overlay = document.getElementById('navOverlay');
        var btn = document.getElementById('burgerBtn');
        nav.classList.toggle('open');
        overlay.classList.toggle('open');
        btn.classList.toggle('open');
        btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
    }

    function renderCards(containerId, items) {
        var container = document.getElementById(containerId);
        if (!container || !items) return;
        container.innerHTML = items.map(function(item) {
            return '<button class="card" onclick="App.openNote(\'' + item.section + '\', ' + item.id + ')">' +
                '<div class="card-title">' + item.title + '</div>' +
                '<div class="card-desc">' + item.desc + '</div>' +
                '<div class="card-tags">' + (item.tags || []).map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
                '</button>';
        }).join('');
    }

    function init() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        loadTheme();
        renderCards('notesGrid', KERNEL_DATA.notes);
        renderCards('practiceGrid', KERNEL_DATA.practice);
        renderCards('libraryGrid', KERNEL_DATA.library);
        console.log('KERNEL v3.0 — 7 unique styles');
    }

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function createCodeBlock(code, language) {
        return '<div class="code-block"><pre><code class="language-' + (language || 'plaintext') + '">' + escapeHtml(code) + '</code></pre></div>';
    }

    return {
        showSection: showSection,
        openNote: openNote,
        closeNote: closeNote,
        toggleTheme: toggleTheme,
        selectTheme: selectTheme,
        openThemePicker: openThemePicker,
        closeThemePicker: closeThemePicker,
        toggleMenu: toggleMenu,
        init: init,
        escapeHtml: escapeHtml,
        createCodeBlock: createCodeBlock
    };
})();
