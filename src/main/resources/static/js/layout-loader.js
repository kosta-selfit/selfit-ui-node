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

        // header.js 동적 로드
        setTimeout(() => {
            const headerScript = document.createElement('script');
            headerScript.type  = 'module';
            headerScript.src = '/js/header.js';
            headerScript.onload = () => {};
            document.body.appendChild(headerScript);
        }, 0);
    } catch (err) {
        console.error('layout 로드 실패:', err);
    }
}
