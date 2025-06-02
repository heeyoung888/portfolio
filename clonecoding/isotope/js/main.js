//페이지 로드 이벤트 - 자바스크립트
window.addEventListener('load',()=>{
    const grid = new Isotope('section',{ //배치할 요소를 감싸고 있는 부모 요소명
        itemSelector : 'article', //배치할 요소명
        columnWidth : 'article', //너비값을 구할 요소명
        transitionDuration : '0.5s', //화면 재배치시 요소가 움직이는 속도
    })/* 화면 너비 여백을 적절히 없애줌 */

    /* 화면 상단 버튼 눌렀을 때 */
    const btns = document.querySelectorAll('main ul li');/* 모든 버튼 변수에 저장 */
    
    for(let el of btns){
        el.addEventListener('click',e =>{
            e.preventDefault();/* 이벤트를 기본값으로 바꿔주기 */
            //변수 sort에 클릭한 대상의 자식인 a요소의 href 속성값 저장
            const sort = e.currentTarget.querySelector('a').getAttribute('href');
            //console.log(sort);
            grid.arrange({
                filter : sort,
            })

            //다시 모든 버튼의 개수만큼 반복
            for(let el of btns){
                //자바스크립트 문법
                el.classList.remove('on');
            }
            
            //클릭한 대상만 선택해서 클래스 명 on을 추가해 활성화
            e.currentTarget.classList.add('on');
        })
    }
})

//currentTarget : 클릭한 나 자신