const routes = {
    '/board/write': '/html/board/boardForm.html',
    '/board/edit': '/html/board/boardForm.html',
    // 기타 라우트도 필요 시 추가
};

function parsePath() {
    const hash = window.location.hash.slice(1); // 예: '#/board/write' → '/board/write'

    if (hash.startsWith('/board/edit/')) {
        return '/board/edit';
    }
    return hash || '/';
}

async function loadPage() {
    const path = parsePath();
    const htmlPath = routes[path] || '/html/404.html';
    const res = await fetch(htmlPath);
    const html = await res.text();
    document.getElementById('app').innerHTML = html;

    if (path === '/board/write' || path === '/board/edit') {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '/js/board/boardForm.js';
        document.body.appendChild(script);
    }
}

document.addEventListener('DOMContentLoaded', loadPage);
window.addEventListener('hashchange', loadPage);
