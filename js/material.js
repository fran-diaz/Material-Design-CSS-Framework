/* Modal 
 * 
 * Events:
 * - modalPopulated: triggered at modal_populate function end
 * 
*/

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (( $(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    
    return this;
};

jQuery.fn.inside_center = function () {
    var top = ((this.parent().height() - this.outerHeight()) / 2);
    var left = (( this.parent().width() - this.outerWidth() ) / 2);
    this.parent().css("position","relative");
    this.css("position","absolute");
    this.css("top", top + "px");
    this.css("left", left + "px");
    return this;
};

function modal_open(title, url, autofill){
    modal_close_btn = '<span id="modal_close" title="Close dialog" class="btn fab raised mini mdi" data-hover-class="red_bg white"></span>';
    modal_create($('body'));
    
    if(typeof title === 'string'){
        $('#modal_title').html(title);
    }else if(typeof title === 'object'){
        $('#modal_title').remove();
        $('#modal_head').prepend(title);
    }else{
        $('#modal_head').remove();
    }
    
    if(url !== "/"){
        if(typeof title === 'string' || typeof title === 'object'){
            $("#modal_head").append(modal_close_btn);
        }
    }
    
    modal_populate(url);
}

function modal_create_back(parent){
    parent.append('<div id="modal_back" style="position:absolute;top:0;left:0;height:100%;width:100%;"></div>');
}

function modal_create(parent){
    if(parent.is('body')){
        modal_create_back(parent);
        parent = $('#modal_back');
    }
    
    parent.append('<div id="modal">\n\
        <div id="modal_head" class="clearfix">\n\
            <span id="modal_title"></span>\n\
        </div>\n\
        <div id="modal_body" class="clearfix"></div>\n\
    </div>');
}

function modal_populate(url){
    if(!typeof url === 'object'){
        url_aux = url.split(' #');
        $.when($.get(url_aux[0], {}, function(data) {
            if(url_aux[1] === undefined){$("#modal_body").html(data);}
            else{$("#modal_body").html($(data).find('#'+url_aux[1]));}
            })
        ).then(function(){
            $('#modal').trigger('modalPopulated');
            modal_center(); 
        });
    }else{
        $("#modal_body").html(url);
        if($('#modal_close').length !== 1){$('#modal_body').prepend(modal_close_btn);}
        $('#modal').trigger('modalPopulated');
        modal_center();
    }
    
}

function modal_center(){
    if($('#modal').parent().is('#modal_back')){
        $("#modal_back").fadeIn(400,function(){
            $("#modal").show('fold',{},400,function(){
                $('#modal_body input').eq(0).focus();
            });
        });
        $("#modal").center();
        $("#modal").draggable({handle: '#modal_head'});
        $("#modal").resizable();
    }else{
        $("#modal").show('fold',{},400,function(){
            $('#modal_body input').eq(0).focus();
        });
        $("#modal").inside_center();
    }
}

function modal_closer(){
    $("div#modal").remove();
    $("div#modal_back").remove();
}

$(document).on('click','#modal_close',modal_closer);
$(document).on('click','#modal_back',modal_closer);

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

$(document).on('click','.basic-modal',function(e){
    e.preventDefault();
    
    modal_open('Basic modal',$('<p>Lorem ipsum dolor sit amet adepisci elit.<p>'));
});

$(document).on('click','.custom-modal',function(e){
    e.preventDefault();
    
    modal_open(false,$('<p>Lorem ipsum dolor sit amet adepisci elit.<p><div id="modal_actions">test</div>'));
});

$(document).on('modalPopulated','#modal',function(){
    var a_height = $('#modal_actions').outerHeight() - parseInt($('#modal_body').css('paddingBottom')) ;
    $('#modal_actions').before('<div style="height:'+a_height+'px;display:block;" class="clearfix"></div>');
});