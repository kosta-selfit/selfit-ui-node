// /static/js/layout-loader.js
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';
import { initHeader } from '/js/header.js';

export async function initLayout() {
    try {
        // 1) layout fragment 가져오기
        const res = await axios.get('/html/fragments/layout.html');
        const doc = new DOMParser().parseFromString(res.data, 'text/html');

        // 2) 헤더 · 사이드바 주입
        const headerEl = document.querySelector('#header');
        const sideEl   = document.querySelector('.sideBar');
        if (headerEl && sideEl) {
            headerEl.innerHTML = doc.querySelector('#header').innerHTML;
            sideEl.innerHTML   = doc.querySelector('.sideBar').innerHTML;
        } else {
            console.warn('layout-container not found yet');
        }

        // 3) 헤더 스크립트 로드 (한 번만)
        if (!document.querySelector('script[src="/js/header.js"]')) {
            const s = document.createElement('script');
            s.type  = 'module';             // ← 여기 추가
            s.src   = '/js/header.js';
            document.head.appendChild(s);
        }

        // 4) 헤더가 DOM에 삽입된 직후, 토글·회원정보 바인딩 실행
        await initHeader();

    } catch (err) {
        console.error('layout 로드 실패:', err);
    }
}
