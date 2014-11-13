function drawRipple(target,e){  
    var left = e.pageX - target.offset().left;
    var top = e.pageY - target.offset().top;

    target.append('<div class="ripple" style="top:'+top+'px;left:'+left+'px;"></div>');
    setTimeout(function(){
      target.find('.ripple:first-of-type').remove();
    },1500);
}

$(document).on('mouseenter','[data-hover-class]',function(e){
    $(this).addClass($(this).data('hover-class'));
});

$(document).on('mouseleave','[data-hover-class]',function(e){
    $(this).removeClass($(this).data('hover-class'));
});

$(document).on('focusin','[data-hover-class]',function(e){
    $(this).addClass($(this).data('hover-class'));
});

$(document).on('focusout','[data-hover-class]',function(e){
    $(this).removeClass($(this).data('hover-class'));
});

$(document).on('click','[data-active-class]',function(e){
    target = $(this);
    target.addClass(target.data('active-class'));

    setTimeout(function(){
        target.removeClass(target.data('active-class'));
    },400);
});

$(document).on('click','.btn,button',function(e){
    drawRipple($(this),e);
});

$(document).on('mouseenter','.raised',function(e){
    $(this).prepend('<span class="shadow_overlay"></span>');
});

$(document).on('mouseleave','.raised',function(e){
    $(this).find('.shadow_overlay').remove();
});

$(document).on('focusin','.raised',function(e){
    $(this).prepend('<span class="shadow_overlay"></span>');
});

$(document).on('focusout','.raised',function(e){
    $(this).find('.shadow_overlay').remove();
});