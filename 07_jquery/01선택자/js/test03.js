$(function(){
    /* 클래스가 txt 인 애를 클릭했을때
  css font-size 50px
  */
        $('.txt').click(function(){
            $('.txt').css('font-size','50px');
           /*  $(this).css({
                fontSize : '50px',
                backgroundColor : '#ccc',
            }); */
        });

})//ready end
