$(function(){
    /* let chk = 0; */
    $('.btn1').click(function(){
        /* if(chk ==0){
            $('ul#menu li').first().hide();
            $('.btn1').text('내용1 열기');
            chk++;
        }else{
            $('ul#menu li').first().show();
            $('.btn1').text('내용1 닫기');
            chk =0; // 그래야 왔다갔다 거림 
        }*/

        $('ul#menu li').first().toggle();/*  */
    });

    let style1 = {
        backgroundColor : 'pink',
        color :'#fff',
    }
    let style2 = {
        backgroundColor :'transparent',//투명
        color :'#000',
    }
    
    let chk2 = true;
    $('.btn2').click(function(){
        if(chk2){
            $('ul#menu li').last().css(style1);
            chk2 = false;
        }else{
            $('ul#menu li').last().css(style2);
            chk2 = true;
        }
    });
});