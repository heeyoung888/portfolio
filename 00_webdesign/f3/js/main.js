$(function(){
    $('header nav ul.gnb>li,header nav .nav_bg').hover(function(){
      $('header nav .nav_bg,header nav ul.gnb>li>ul').stop().slideDown()
    },function(){
      $('header nav .nav_bg,header nav ul.gnb>li>ul').stop().slideUp()
    });

    //슬라이드 
    let slideI = 0;
    setInterval(function(){
        if(slideI<2){
            slideI++;
        }else{
            slideI = 0;
        }
        console.log(slideI);
        $('.main_visual ul.slide').animate({
            left : (slideI * -100) + '%',
        },500);
    },2900);
});