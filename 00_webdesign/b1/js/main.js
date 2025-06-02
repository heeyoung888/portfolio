$(function(){/*  */
    $('header nav ul').hover(function(){
      $('ul.sub').stop().slideDown();
    },function(){
      $('ul.sub').stop().slideUp();
    });
  });