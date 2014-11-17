/* Modal */
function modal_open(titular, subtitular, url, autofill){
    var img_src = "../img";    

    modal_create($('body'));
    $('#modal_title').html(titular);
    $('#modal_subtitle').html(subtitular);
    if(url != "/"){$("div#modal_head").append('<img id="modal_close" src="'+img_src+'/modal_close.png" alt="Cerrar menú flotante" onclick="modal_closer();" />');}
    modal_populate(url);
    //modal_center();
}

function modal_create_back(parent){
    var total_height = $(document).height();
    parent.append('<div id="modal_back" style="display:none;position:absolute;height:'+total_height+'px;"></div>');
}

function modal_create(parent){
    if(parent.is('body')){modal_create_back(parent);parent = $('#modal_back');}
    
    parent.append('<div id="modal" style="display:none;">\n\
        <div id="modal_head">\n\
            <span id="modal_title" class="modal_title_font"></span>\n\
            <span id="modal_subtitle" class="modal_subtitle_font"></span>\n\
        </div>\n\
        <div id="modal_body" class="clearfix"></div>\n\
    </div>');
}

function modal_populate(url){
    var url_aux = url.split(' #');
    $.when($.get(url_aux[0], {}, function(data) {
        if(url_aux[1] === undefined){$("#modal_body").html(data);}
        else{$("#modal_body").html($(data).find('#'+url_aux[1]));}
        })
    ).then(function(){
        modal_center();
        M.parseMath($('#modal_body').get(0));
        jscolor.init();
        if ($('input[name="start_date"]').length >= 1 &&  $('input[name="start_date"]')[0].type !== 'date' ) {$('input[name="start_date"]').datepicker(datepicker_es);}
        if ($('input[name="end_date"]').length >= 1 && $('input[name="end_date"]')[0].type !== 'date' ) {$('input[name="end_date"]').datepicker(datepicker_es);}
    });
}

function modal_center(){
    if($('#modal').parent().is('#modal_back')){
        $("#modal").draggable({handle: '#modal_head'});
        $("#modal").resizable();
        $("#modal_back").fadeIn(400,function(){$("#modal").show('fold',{},400,function(){$('#modal_body input').eq(0).focus();});});
        $("#modal").center();
    }else{
        $("#modal").show('fold',{},400,function(){$('#modal_body input').eq(0).focus();});
        $("#modal").inside_center();
    }
}

function modal_closer(){
    $("div#modal").remove();
    $("div#modal_back").remove();
}

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