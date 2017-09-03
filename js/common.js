// Слайдер брендов
$('.brands-slider').owlCarousel({
  loop:true,
	navText: ['',''],
	autoplayHoverPause:true,
	autoplayTimeout: 5000, // Время смены слайдов
	smartSpeed:1750, // плавность смены слайда
  margin:0,
  nav:true,
  items:4
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
	padding : 30,
	helpers: {
		overlay: {
			locked: false
		}
	}
});
// Галерея карточки товара
$(".photosgallery-vertical").sliderkit({
	circular:true,
	mousewheel:true,
	shownavitems:4,
	verticalnav:true,
	navclipcenter:true,
	auto:false
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
			jQuery(this).siblings('.slider-input').children('div').children('input.min').val(jQuery(this).slider("values",0));
			jQuery(this).siblings('.slider-input').children('div').children('input.max').val(jQuery(this).slider("values",1));
		},
		slide: function(event, ui){
			jQuery(this).siblings('.slider-input').children('div').children('input.min').val(jQuery(this).slider("values",0));
			jQuery(this).siblings('.slider-input').children('div').children('input.max').val(jQuery(this).slider("values",1));
		}
	});
};
SliderMinMax('.factory',0.75,4,0.05,true);
// Спойлер для списков фильтра
$('ul.checkbox').each(function(){
	$(this).find('li:gt(9)').hide();
	if ($(this).find('li').length > 10) {
		$(this).append('<div class = "btn gray see-more" title = "">Показать еще</div>');
	}
})
$('div.see-more').click(function(){
	var ul = $(this).parent();
	// ul.find('li:hidden:lt(99)').show();
	ul.find('li:gt(9)').slideToggle();
	ul.find('li:hidden:lt(99)').slideToggle();
	if (ul.find('li.hidden').length == 0) {
		// $(this).html('Скрыть');
		$(this).hide();
	}
})
// Аккордион
$(function($) {
  var allAccordions = $('.accordion div.data');
  var allAccordionItems = $('.accordion .accordion-item');
  $('.accordion .aside__filter__item > .accordion-item').click(function() {
    if($(this).hasClass('open'))
    {
      $(this).removeClass('open');
      $(this).next().slideUp("slow");
    }
    else
    {
    allAccordions.slideUp("slow");
    allAccordionItems.removeClass('open');
    $(this).addClass('open');
    $(this).next().slideDown("slow");
    return false;
    }
  });
});