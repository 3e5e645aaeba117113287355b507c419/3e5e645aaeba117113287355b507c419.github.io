function openForm(text) {
    $('#modal-form6').arcticmodal({
        afterOpen: function() {
            if(text.length){
                $('#modal-form6').find('#title-form').val(text);
            }
        },
        afterClose: function() {
            $('#modal-form6').find('#title-form').val('');
        }
    })
}
$(function(){
    $('#menu').slicknav({label: ''});
});
$(document).ready(function(){
    $('input[placeholder], textarea[placeholder]').placeholder();
    $('.main-slick-slider').slick({
      infinite: true,
      dots: true,
      autoplay: true,
      slidesToShow: 4,
      slidesToScroll: 1
    });
    $("a.slick-doc").fancybox();
    $("a.slick-doc_pdf").fancybox({
		width  : 600,
		height : 300,
		type   :'iframe'
	});
	$('.slide1').slick({
      infinite: true,
      dots: true,
     // autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
	 variableWidth: true
    });
   $('.slide_doc').slick({
      infinite: true,
      dots: true,
     // autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
	 variableWidth: true
    });
	//$('#videoId').get(0).play();
});



// Плавный скролл к верху страницы
$("a[href^='#block']").click(function() {
    var element = $(this).attr('href');
    var offset = $(element).offset().top;
    $("html, body").animate({ scrollTop: offset }, "slow");
    return false;
});

$(document).ready(function() {
    $('input[placeholder], textarea[placeholder]').placeholder();
    $("input[name=phone]").mask("+7(999)999-99-99");
});


//menu
var isiPad = navigator.userAgent.match(/iPad/i) != null;
var isIPhone = navigator.userAgent.match(/iPhone/i) != null;
var isAndroid = /Android/i.test(navigator.userAgent);
var isWebKit = /WebKit/i.test(navigator.userAgent);
var isTouchable = isiPad || isIPhone || isAndroid;
var mode = oldMode = 1001;

var header, products,advantages,clients,pay_delivery,contacts, idevice_fix;

var useTransition = false; //($.browser.msie && $.browser.version<=9) ? false:true;

$(document).ready(function()
{
    if(isiPad || isIPhone)
    {
        $(".interview_tmp").css('display', 'none');
    }

    // nav
    header = $('.header');
    products = $('#products');
    advantages = $('#advantages');
    clients = $('#clients');
    pay_delivery = $('#pay_delivery');
    contacts = $('#contacts');

    idevice_fix = $('#idevice_fix');


    var top_a = $('.header a, a.nav');
    var nav_a = $('.nav a');
    var scrollNav = false;
    event_name = isTouchable?"touchstart":"click";

    if(isIPhone || isiPad){
        idevice_fix.show().height(0);
    }
    top_a.on('click', function()
    {
        scrollNav = true;
        hrefAr = $(this).attr('href').split('-');
        href = hrefAr[0];
        sub_page = hrefAr[1];

        nav_a.removeClass('active');
        nav_a.filter('[href='+href+']').addClass('active');

        var minOffset = mode > 1000 ? 155 : (mode > 480 ? 195 : 175);
        var paddingTop = Math.max(minOffset - parseInt($(href).css('padding-top')), 0);
        var pos = $(href).offset().top - paddingTop;

        if(isIPhone || isiPad){
            idevice_fix.css('height', '200px');
        }

        if(sub_page)
        {
            $(href+'-'+sub_page+'-bm').find('a').trigger('click');
        }

        $('html,body').animate({scrollTop: pos}, 'slow', function()
        {
            scrollNav = false;

            var this_id = href.substr(1);
            if(isIPhone || isiPad) idevice_fix.css('height', '100px');
        });
    });

    // global scroll
    var page_sections = $('#products,#advantages,#clients,#pay_delivery,#contacts');
    $(document).scroll(function()
    {
        var this_ = $(this);
        $('.h2').each(function() {
            var st = this_.scrollTop();
            var this_top = $(this).offset().top;
            var this_pos = this_top - st;
            if(this_pos >= 0 && this_pos < 800) {
                $(this).animate({opacity:1},500);
            }
        });

        if(!scrollNav)
        {
            var st = $(this).scrollTop();
            page_sections.each(function()
            {
                this_id = $(this).attr('id');
                this_top = $(this).offset().top;
                this_pos = this_top - st;
                if(this_pos >= 0 && this_pos < 300)
                {
                    nav_a.removeClass('active');
                    nav_a.filter('[href="#'+this_id+'"]').addClass('active');
                    if(window.location.hash != '#'+this_id)
                    {
                        scrollNav = true;
                        var scrollmem = $(document).scrollTop();
                        window.location.hash = this_id;
                        $(document).scrollTop(scrollmem);
                        scrollNav = false;
                    }
                }
            });
        }
    });

    $(document).scroll(function(menuH){
        st = $(this).scrollTop();
        if(st>68) {
            $('.h-list').addClass('fix');
            $('.slicknav_menu').addClass('fix');
        } else {
            $('.h-list').removeClass('fix');
            $('.slicknav_menu').removeClass('fix');
        }
    });
	
	
	
});


$(function(){
    var dateObj   = new Date();
    var currentDay  = dateObj.getDay();
    var monday      = 1;
    var toEvent = new Date();
    var days = 7 - dateObj.getDay();
    var hours = 24 - dateObj.getHours();
    var minutes = 60 - dateObj.getMinutes();
    var seconds = 60 - dateObj.getSeconds();

    toEvent = new Date(toEvent.setDate(toEvent.getDate()+days));
    toEvent.setHours(hours);
    toEvent.setMinutes(minutes);
    toEvent.setSeconds(seconds);

    $('#countdown').countdown({timestamp  : toEvent});
    $('.close').on('click',function(){
        $.arcticmodal('close');
        return false;
    });
});

$(document).ready(function()
{
    //Анімаціия при скроле-----------------
    $('.scroll-animate').each(function () {
    var block = $(this);
    $(window).scroll(function() {
        var top = block.offset().top;
        var bottom = block.height() + top;
        top = top - $(window).height();
        var scroll_top = $(this).scrollTop();
        if ((scroll_top > top) && (scroll_top < bottom)) {
            if (!block.hasClass('animated')) {
                block.addClass('animated');
                block.trigger('animateIn');
            }
        } else {
            block.removeClass('animated');
            block.trigger('animateOut');
        }
    });

});

// $('.factWrapper .factBlock').on('animateIn', function() {
//     var inter = 0;
//     $(this).find('.anim').each(function() {
//         var block = $(this);
//         setTimeout(function() {
//             block.css('opacity', 1);
//             block.css('transform', 'scale(1.0, 1.0)');
//         }, inter * 100);
//         inter++;
//     });
// }).on('animateOut', function() {
//     $(this).find('.anim').each(function() {
//         $(this).css('opacity', 0);
//         $(this).css('transform', 'scale(1.5, 1.5)');
//     });
// });
// })

$('.benefitsWrapper .benefitsBlock').on('animateIn', function() {
    var inter = 0;
    $(this).find('.anim').each(function() {
        var block = $(this);
        setTimeout(function() {
            block.css('opacity', 1);
            block.css('transform', 'scale(1.0, 1.0)');
        }, inter * 100);
        inter++;
    });
}).on('animateOut', function() {
    $(this).find('.anim').each(function() {
        $(this).css('opacity', 0);
        $(this).css('transform', 'scale(1.5, 1.5)');
    });
});
})
function animate_opacity(element){	
		var element_=$(element);
	//console.log(element);
	
	if(element_.css('opacity')!=1){
		time_1 = element_.data('time');
		//console.log(time_1);
		setTimeout(animate_1(element_,time_1),time_1);		
				
		return true;
	}
		return false;
		
	}
	function animate_1(elment, time_1){
		elment.animate(  {		
		opacity: 1	}, time_1);
	}
$(document).scroll(function(){	
	
	if($('.js_box ').offset().top < window.pageYOffset+500){	
		$('.js_box .why_item').each(
			function(element){
				animate_opacity(this);
			}
		);
		
		//if(animate_opacity('.js_box .why_item')){	}
	}	/*
	if($('.eight_block_container_box_item ').offset().top < window.pageYOffset+200){	
		if(animate_opacity('.eight_block_container_box_item_1')){		
		if(animate_opacity('.eight_block_container_box_item_2')){		
		animate_opacity('.eight_block_container_box_item_3')		
		}		}					}	
		if($('.container_twelve_block_box_item ').offset().top < window.pageYOffset+200){
			if(animate_opacity('.container_twelve_block_box_item_1')){			
			if(animate_opacity('.container_twelve_block_box_item_2')){	
				animate_opacity('.container_twelve_block_box_item_3')				
			}		}			}	  //	console.log(window.pageYOffset)
			*/
			});