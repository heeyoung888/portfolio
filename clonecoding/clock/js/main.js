$(function(){
    let ht = $(window).height();
    $(window).resize(function(){
        ht = $(window).height();
        $('section').height(ht);
    });
    /* 스크롤 이벤트 = 메뉴 on class */
    $(window).on('scroll',function(){
        let ht = $(window).height();
        let sct = $(window).scrollTop();
        let sectionLength = $('#wrap section').length;
        for(let i=0; i<sectionLength; i++){
            if(sct >= ht*i && sct < ht*(i+1)){
                $('ul#menu li').removeClass().eq(i).addClass('on');
            }   
        }
    });

    let isScrolling = false; //스크롤 중복 방지
    $('section').on('wheel mousewheel DOMMouseScroll',function(e){
        if(isScrolling) return; //스크롤 중이라면 중복 실행 방지
        e.preventDefault();
        let delta = e.originalEvent.deltaY || -e.originalEvent.wheelDelta || e.originalEvent.detail;
        let nav = delta > 0 ?$(this).next() : $(this).prev();
        //위로 밑으로 스크롤

        if(nav.length){
            isScrolling = true;
            let moveTop = nav.offset().top;
            $('html, body').stop().animate({
                scrollTop : moveTop
            },400,function(){
                isScrolling =false; //스크롤 완료 후 다시 허용
            })
        }
    })


    //마우스 무브 이벤트
    $('section').on('mousemove',function(e){
        let posX = e.pageX;
        let posY = e.pageY;
        
       $('.p11').css({
        bottom: 20 - (posY/30),
        right: 20 - (posX/30)
       });
       $('.p12').css({
        bottom: -40 + (posY/30),
        right: 130 + (posX/20)
       });
       $('.p13').css({
        top: 180 - (posY/50),
        right: 60 + (posX/1)
       });

       $('.p21').css({
        bottom : 20 - (posY/30),
        right : 20 - (posX/20),
       })
       $('.p22').css({
        bottom: -70 + (posY/30),
        right: 150 + (posX/20)
       })

       $('.p31').css({
        bottom : 20 - (posY/30),
        right : 20 - (posX/20),
       })
       $('.p32').css({
        bottom: -70 + (posY/30),
        right: 20 + (posX/20)
       })
       $('.p33').css({
        bottom: 200 - (posY/20),
        right: 70 + (posX/20)
       })

       $('.p41').css({
        top : 20 - (posY/30),
        left : 20 - (posX/20),
       })
       $('.p42').css({
        bottom: -10 + (posY/30),
        left: -150 + (posX/20)
       })
    });
    

});
