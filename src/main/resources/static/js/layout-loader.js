document.addEventListener('DOMContentLoaded', () => {
    axios.get('/html/fragments/layout.html')
        .then(response => {
            const doc = new DOMParser().parseFromString(response.data, 'text/html');

            // 조각 삽입
            document.querySelector('#header').innerHTML  = doc.querySelector('#header').innerHTML;
            document.querySelector('.sideBar').innerHTML = doc.querySelector('.sideBar').innerHTML;

            // header.js 동적 로드
            const headerScript = document.createElement('script');
            headerScript.src = '/js/header.js';
            headerScript.defer = true;
            document.head.appendChild(headerScript);
        })
        .catch(err => console.error('layout 로드 실패:', err));
});
