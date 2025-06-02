$(function(){
    $('.h_left button').click(function(){
        $(this).removeClass('on').siblings().addClass('on');
        $('header .mobile_nav').toggle();
    });
});