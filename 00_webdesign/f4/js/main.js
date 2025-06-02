$(function(){
    $('nav').hover(function(){
      $('ul.sub,.nav_bg').stop().slideDown();
    },function(){
      $('ul.sub,.nav_bg').stop().slideUp();
    });
  });//ready end
  //메서드 괄호 반드시 있어야 함
  $(function(){
    $('header nav ul.gnb>li,header nav .nav_bg').hover(function(){
      $('header nav .nav_bg,header nav ul.gnb>li>ul').stop().slideDown()
    },function(){
      $('header nav .nav_bg,header nav ul.gnb>li>ul').stop().slideUp()
    });

    //슬라이드 
    let slideI = 0;
    const leng = $('.main_visual ul.slide').length -1;
    //console.log(leng);
    setInterval(function(){
      if(slideI<leng){
        slideI++;
      }else{
        slideI = 0;
      }
      $('.main_visual ul.slide').animate({
        top:`${slideI*(-100)}%`,
      })
    },3000);
});