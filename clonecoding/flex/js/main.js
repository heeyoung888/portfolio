//모든 article 요소를 상수 items에 저장
const items = document.querySelectorAll('article');
const aside = document.querySelector('aside');/* 한개 */
const close = aside.querySelector('span');

//article 요소의 개수만큼 반복
for(let el of items){
el.addEventListener('mouseenter',e => {
    e.currentTarget.querySelector('video').play();
});
el.addEventListener('mouseleave',e => {
    e.currentTarget.querySelector('video').pause();
})



    el.addEventListener('click', e =>{
        let tit = e.currentTarget.querySelector('h2').innerText;
        let txt = e.currentTarget.querySelector('p').innerText;
        let vidSrc = e.currentTarget.querySelector('video')
        .getAttribute('src');
        //console.log(tit,txt,vidSrc);
        aside.querySelector('h2').innerText = tit;
        aside.querySelector('p').innerText = txt;
        aside.querySelector('video').setAttribute('src',vidSrc);
        aside.querySelector('video').play();
        aside.classList.add('on');

        close.addEventListener('click',e =>{
            aside.classList.remove('on');
            aside.querySelector('video').pause();
        });
    });
}