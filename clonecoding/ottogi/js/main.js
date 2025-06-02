$(function () {

    /* sns 탭메뉴 */
    $('ul.tab_menu li').click(function () {
        $('ul.tab_con>li,ul.tab_menu li').removeClass('on');
        $(this).addClass('on');
        let i = $(this).index();
        // console.log(i);
        $('ul.tab_con>li').eq(i).addClass('on');
    })
    /* sns 탭메뉴 end*/

    /* 메인 슬라이드 시작 */
    let slideI = 0;
    const slideLength = $('.main_visual ul.slide li').length - 1;
    $('.main_visual ul.slide li').eq(slideI).siblings().hide();
    let inter = setInterval(goSlide,3000);

    function goSlide(){
        if(slideI<slideLength){
            slideI++;
        }else{
            slideI = 0;
        }
       rollingSlide();
    }

    function backSlide(){
        if(slideI == 0){
            slideI = slideLength;
        }else{
            slideI--;
        }
        rollingSlide();
    }


    function rollingSlide(){
        $('.main_visual ul.slide li').eq(slideI).fadeIn().siblings().fadeOut();
        $('.main_visual ul.pager li').removeClass('active')
        .eq(slideI).addClass('active');
    }

    $('.main_visual .pause_play .pause').click(function(){
        clearInterval(inter);
    });

    $('.main_visual .pause_play .play').click(function(){
        inter = setInterval(goSlide,3000);
    });

    $('.main_visual .ltrt_btn .right_btn').click(function(){
        //인터벌 없애고
        clearInterval(inter);
        //슬라이드 돌게
        goSlide();
        //인터벌 세팅
        inter = setInterval(goSlide,3000);
    });

    $('.main_visual .ltrt_btn .left_btn').click(function(){
        //인터벌 없애고
        clearInterval(inter);
        //슬라이드 돌게
        backSlide();
        //인터벌 세팅
        inter = setInterval(goSlide,3000);
    });

    $('.main_visual ul.pager li').click(function(){
        clearInterval(inter);
        slideI = $(this).index();
        rollingSlide();
        inter = setInterval(goSlide,3000);
    });
    /* 메인 슬라이드 끝 */


    // 이벤트 슬라이드 시작
    let eventSi = 0;
    setInterval(()=>{
        if(eventSi < 1) {
            eventSi++;
        }else{
            eventSi = 0;
        }
        $('.contents2 .event .event_slide ul').animate({
            left : eventSi * (-100) + '%',
        },500)
    },3000)
    // 이벤트 슬라이드 끝


    //pnSwiper 시작
    let pnSwiper = new Swiper(".product_new_slide", {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".product_new_slide .swiper-pagination",
          clickable: true,
        },
        loop : true,
      });

      //재생버튼
      $('.pn_pager_btnall .pause_play .play').click(function(){
        pnSwiper.autoplay.start();
      });


      $('.pn_pager_btnall .pause_play .pause').click(function(){
        pnSwiper.autoplay.stop();
      });
      //멈춤버튼

    //pnSwiper 끝


    //
    let faProductSwiper = new Swiper(".fa_slide_wrap", {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 10,
        navigation: {
            nextEl: ".fa_product .fa_lt_rt button.fa_gt",
            prevEl: ".fa_product .fa_lt_rt button.fa_lt",
          },
      });
    //
});/* ready end */