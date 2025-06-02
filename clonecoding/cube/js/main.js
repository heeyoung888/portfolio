//아이디가 circle인 요소를 찾아서 저장
const circle = document.querySelector('#circle');
//console.log(circle);
//태그명이 article인 요소를 찾아서 저장
const articles = document.querySelectorAll('article');
//console.log(articles);

//article 요소의 개수만큼 반복
for(let el of articles){
    //article에 마우스 포인터를 올리면 부모인 #circle의 animationPlayState paused로 변경
    el.addEventListener('mouseenter',()=>{
        circle.style.animationPlayState = 'paused';
    });

    //article에 마우스 포인터를 떠나면 부모인 #circle의 animationPlayState running으로 변경
    el.addEventListener('mouseleave',()=>{
        circle.style.animationPlayState = 'running';
    });
}