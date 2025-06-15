import { initLayout } from '/js/layout-loader.js';

// 실제 SPA 라우트 맵 (board만 예시)
const routes = {
    '/board/write':  '/html/board/boardForm.html',
    '/board/edit':  '/html/board/boardForm.html',
    '/board/list':   '/html/board/board.html',
    '/board/detail': '/html/board/boardDetail.html',
};

function parsePath() {
    const hash = location.hash.slice(1) || '/board/list';
    return hash.split('?')[0];
}
async function loadPage() {
    const path     = parsePath();
    const htmlPath = routes[path] || '/html/error/404.html';

    // 1) fragment 로드
    let fragment;
    try {
        const res  = await fetch(htmlPath);
        const text = await res.text();
        const doc  = new DOMParser().parseFromString(text, 'text/html');
        fragment   = doc.querySelector('body').innerHTML;
    } catch (err) {
        console.error(err);
        fragment = '<p>페이지를 로드할 수 없습니다.</p>';
    }

    // 2) #app에 삽입
    document.getElementById('app').innerHTML = fragment;

    // 3) 공통 레이아웃 주입
    await initLayout();

    // 4) 뷰 모듈 스크립트 재삽입
    let viewScript = null;
    if (path === '/board/write')  viewScript = '/js/board/boardForm.js';
    if (path === '/board/edit')  viewScript = '/js/board/boardForm.js';
    if (path === '/board/list')   viewScript = '/js/board/board.js';
    if (path === '/board/detail') viewScript = '/js/board/boardDetail.js';

    if (viewScript) {
        document.querySelectorAll(`script[src^="${viewScript}"]`)
            .forEach(el => el.remove());

        const s = document.createElement('script');
        s.type = 'module';
        s.src  = `${viewScript}?t=${Date.now()}`;
        document.body.appendChild(s);
    }
}

window.addEventListener('load',     loadPage);
window.addEventListener('hashchange', loadPage);
