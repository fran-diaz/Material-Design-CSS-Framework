$(document).on('mouseenter','[data-hover-class]',function(e){
    /*var classes = $(this).data("hover-class").split(" ");
    for(i=0;i<classes.length;i++){
        $(this).addClass(classes[i]);
    }*/
});

$(document).on('mouseleave','[data-hover-class]',function(e){
    var classes = $(this).data("hover-class").split(" ");
    for(i=0;i<classes.length;i++){
        $(this).removeClass(classes[i]);
    }
});

$(document).on('focusin','[data-hover-class]',function(e){
    var classes = $(this).data("hover-class").split(" ");
    for(i=0;i<classes.length;i++){
        $(this).addClass(classes[i]);
    }
});

$(document).on('focusout','[data-hover-class]',function(e){
    var classes = $(this).data("hover-class").split(" ");
    for(i=0;i<classes.length;i++){
        $(this).removeClass(classes[i]);
    }
});

$(document).on('click','[data-active-class]',function(e){
    target = $(this);
    classes = target.data("active-class").split(" ");
    for(i=0;i<classes.length;i++){
        target.addClass(classes[i]);
    }

    setTimeout(function(){
        for(i=0;i<classes.length;i++){
            target.removeClass(classes[i]);
        }
    },400);
});

$(document).on('click','.btn',function(e){
    target = $(this);    
    var parentOffset = target.offset();
    var left = e.pageX - parentOffset.left;
    var top = e.pageY - parentOffset.top;

      target.append('<div class="ripple" style="top:'+top+'px;left:'+left+'px;"></div>')
      setTimeout(function(){
        target.find('.ripple:first-of-type').remove();
      },1500);
});