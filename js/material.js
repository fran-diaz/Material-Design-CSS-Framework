/* Ripple */
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
    if(!target.is('input[type="radio"] + label') && !target.is('input[type="checkbox"] + label')){
        target.addClass(target.data('active-class'));
    
        setTimeout(function(){
            target.removeClass(target.data('active-class'));
        },400);
    }
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

$(document).on('click','input[type="checkbox"] + label',function(e){
    if($(this).hasClass('checked')){
        $(this).removeClass('checked');
        $(this).prev('input[type="checkbox"]').prop('checked',false);
    }else{
        $(this).addClass('checked');
        $(this).prev('input[type="checkbox"]').prop('checked',true);
    }
});

/* ---------------------- */

$(document).on('click','input[type="radio"] + label',function(e){
    if($(this).hasClass('checked')){
        if($(this).data('active-class') !== undefined){
            $(this).html($(this).find('span').text());
            $(this).removeClass($(this).data('active-class'));
        }
        $(this).removeClass('checked');
        $(this).prev('input[type="radio"]').prop('checked',false);
    }else{
        if($(this).data('active-class') !== undefined){
            $(this).html('<span>'+$(this).text()+'</span>');
            $(this).addClass($(this).data('active-class'));
        }
        $(this).addClass('checked '+$(this).data('active-class'));
        $(this).prev('input[type="radio"]').prop('checked',true);
    }
});

/* --------------------------------- */