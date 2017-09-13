// Слайдер брендов
$('.js-brands-slider').owlCarousel({
  loop:true,
	navText: ['',''],
	autoplayHoverPause:true,
	autoplayTimeout: 5000, // Время смены слайдов
	smartSpeed:1750, // плавность смены слайда
  margin:0,
  nav:true,
	responsive : {
    0 : {
      items:1
    },
    768 : {
       items:3
    },
    1200 : {
      items:4
    }
	}
});

//Кнопка "Наверх"
$('#back_top').click(function () {
	$('body,html').animate({
		scrollTop: 0
	}, 600);
	return false;
});

// Модальные окна
$(".js-open-modal").fancybox({
	wrapCSS: 'fb-modal-win',
	padding : 0,
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

// Галерея карточки товара
if(document.documentElement.clientWidth < 320) {
	$(".photosgallery-vertical").sliderkit({
		circular:true,
		mousewheel:true,
		shownavitems:99,
		verticalnav:true,
		navclipcenter:true,
		auto:false
	});
} else {
	$(".photosgallery-vertical").sliderkit({
		circular:true,
		mousewheel:true,
		shownavitems:4,
		verticalnav:true,
		navclipcenter:true,
		auto:false
	});
}