document.addEventListener('DOMContentLoaded', () => {
    axios.get(`${window.location.origin}/html/fragments/layout.html`)
        .then(response => {
            const doc = new DOMParser().parseFromString(response.data, 'text/html');

            // 조각 삽입
            document.querySelector('#header').innerHTML  = doc.querySelector('#header').innerHTML;
            document.querySelector('.sideBar').innerHTML = doc.querySelector('.sideBar').innerHTML;

            // header.js 동적 로드
            setTimeout(() => {
                const headerScript = document.createElement('script');
                headerScript.src = '/js/header.js';
                headerScript.onload = () => {};
                document.body.appendChild(headerScript);
            }, 0);
        })
        .catch(err => console.error('layout 로드 실패:', err));
});
