$(document).ready(function() {
	// Слайдер брендов
  $('.js-brands-slider').owlCarousel({ 
		stopOnHover : true,
		navigationText: ['',''],
		slideSpeed: 1000,
		navigation : true,
		items : 4,
		itemsDesktop : [1199,3],
		itemsMobile : [479,1]
  });

// Миниатюры товара
$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: true,
	vertical: true,
  centerMode: false,
  focusOnSelect: true
});

//Кнопка "Наверх"
if(document.documentElement.clientWidth <= 480) {
	$("#back_top").hide();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 700) {
				$('#back_top').fadeIn();
			} else {
				$('#back_top').fadeOut();
			}
		});
			$('#back_top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 600);
			return false;
		});
	});
} else {
	$('#back_top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
		return false;
	});
}

// Модальные окна
$(".js-open-modal").fancybox({
	wrapCSS: 'fb-modal-win',
	padding : 0,
	//width: 280,
	//height: 662,
	//fitToView: false,
	//autoSize: false,
	helpers: {
		overlay: {
			locked: false
		}
	}
});
$(".js-img-modal").fancybox({
	wrapCSS: 'fb-modal-win',
	padding : 30,
	helpers: {
		overlay: {
			locked: false
		}
	}
});

// Ползунки параметров
function SliderMinMax(selector,min,max,step,range){
	$(selector).slider({
		min: min,
		max: max,
		step: step,
		values: [min,max],
		range: range,
		stop: function(event, ui) {
			jQuery(this).parent().siblings('.slider-input').children('div').children('input.min').val(jQuery(this).slider("values",0));
			jQuery(this).parent().siblings('.slider-input').children('div').children('input.max').val(jQuery(this).slider("values",1));
		},
		slide: function(event, ui){
			jQuery(this).parent().siblings('.slider-input').children('div').children('input.min').val(jQuery(this).slider("values",0));
			jQuery(this).parent().siblings('.slider-input').children('div').children('input.max').val(jQuery(this).slider("values",1));
		}
	});
};
SliderMinMax('.factory',0.75,4,0.05,true);

// Спойлер для списков фильтра
var maxLi = 10, text = ["Скрыть", "Показать еще"];
$("ul.checkbox").each(function() {
    var li = $(this).find("li");
    if (li.length > maxLi) {
        li = li.slice(maxLi).hide();
        var btn = $("<div>", {
            text: text[1],
            "class": "btn gray see-more",
            click: function() {
                li.stop().slideToggle(500, function() {
                    btn.text(text[+$(this).is(":hidden")])
                })
            }
        }).appendTo(this)
    }
});

// Аккордион
$('.accordion-item').click(function(){
	$(this).siblings('.data').slideToggle();
	$(this).toggleClass('close');
})

// Вызов меню слева
$(".mobile-trigger").click(function() {
	$(".bd-site").toggleClass('mob-nav-open');
	$("body").toggleClass('overflow');
});
$(".mobile-aside__nav__close").click(function() {
	$(".bd-site").toggleClass('mob-nav-open');
	$("body").toggleClass('overflow');
});

/* Контакты справа */
$(".mobile-address-trigger").click(function() {
	$(".bd-site").toggleClass('mob-contact-open');
	$("body").toggleClass('overflow');
});
$(".mobile-aside__contact__close").click(function() {
	$(".bd-site").toggleClass('mob-contact-open');
	$("body").toggleClass('overflow');
});

// Выпадающее мобильное меню
$(".has-children a").click(function() {
	$(".has-children ul").slideToggle();
});

// Вызов мобильного фильтра
$(".mobile-filter-trigger").click(function() {
	$(".bd-site").toggleClass('mob-filter-open');
	$("body").toggleClass('overflow');
});
$(".aside__filter__close").click(function() {
	$(".bd-site").toggleClass('mob-filter-open');
	$("body").toggleClass('overflow');
});

// Обрезаем текст для превью статей планшета
function title() {  
  var elem, size, text;
  elem = document.getElementsByClassName('prew');
  text = elem.innerHTML;
  size = 180; 
  for(var i = 0; i < elem.length; i++) { 
    if(elem[i].innerHTML.length > size) {
      text = elem[i].innerHTML.substr(0, size);
    }    
    elem[i].innerHTML = text + '...';
  }
}
if(document.documentElement.clientWidth < 1200) {
	title();
}

// Обрезаем текст каталога
function catalogPrew() {  
  var elem, size, text;
  elem = document.getElementsByClassName('catalog-prew');
  text = elem.innerHTML;
  size = 250; 
  for(var i = 0; i < elem.length; i++) { 
    if(elem[i].innerHTML.length > size) {
      text = elem[i].innerHTML.substr(0, size);
    }    
    elem[i].innerHTML = text + '...';
  }
}
if(document.documentElement.clientWidth <= 480) {
	catalogPrew();
}

});