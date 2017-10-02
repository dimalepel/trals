$(function() {
	
	/*получить числовое значение из элемента*/
	$.fn.getN = function(){
		var $elem = $( this );
		var value = $elem.is('input') ? $elem.val() : $elem.text();
		value = value.replace(/[^,\d]/g, ''); //удаляем НЕ цифры и запятую
		value = (value == '') ? false : parseInt(value);

		return value;
	}

	/*получить float значение из элемента*/
	$.fn.getFlN = function(){
		var $elem = $( this );
		var value = $elem.is('input') ? $elem.val() : $elem.text();
		value = value.replace(/[^.,\d]/g, ''); //Убираем все кроме точки и запятой
		value = value.replace(',', '.'); //Заменяем запятую на точку
		value = (value == '') ? false : parseFloat(value);
		if(isNaN(value)) value = '';

		return value;
	}

	/*Записать в элемент числовое значение*/
	$.fn.setN = function(value){

		var $elem	  = $( this );

		if($elem.length == 0) return;

		unit = '&nbsp;руб.';

		var is_input  = $elem.is('input'), //это текстовое поле (может быть просто html-элемент),
			human = true;

		$elem.data('value', value); //запоминаем число в чистом виде

		if( value === false ) value = '';
		if( is_input ){
			human = $elem.attr('maxlength') > 3;
		}

		if ( human && value > 0 ) {
			//приводим к виду X XXX XXX
			value = humanNumber(value);
		}

		if(is_input && human) {
			//получим позицию курсора
			position = $elem.getCursorPosition();
			position += value.toString().length - $elem.val().length;

			$elem.val(value);
			$elem.setCursorPosition(position);
			$elem.data('parsed_value', value);
		}
		else if(is_input) {
			$elem.val(value);
		}
		else{
			$elem.html(value+unit);
		}

		return value;
	}

	
	
	

	

	


	/*фокус на поле ввода*/
	$('input[type=text], textarea, select').live('focus', function(){
		$('.cr-state-focus').removeClass('cr-state-focus');
		$(this).closest('.g-form__inputwrap').addClass('cr-state-focus');
		$(this).blur(function(){$(this).closest('.g-form__inputwrap').removeClass('cr-state-focus');})
	});
	var counter = counter_limit = $("#j-filter__counter").html()-0;
	



	





});




/*************************************************************************/
/**Global Functions*******************************************************/
/*************************************************************************/
var humanNumber = function(number, round, is_price){
	//делает число в человеческий вид
	//приводим к виду X XXX XXX
	if(is_price === undefined && !round){
		is_price = true;
	}

    if( !number ) return '0';
	
	if(is_price){
		number = parseFloat(number).toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').replace('.', ',');
	}
	else{
		if(round == 'down'){
			number = Math.floor(number);
		}
		if(round == 'up'){
			number = Math.ceil(number);
		}

		if(number > 1000){
			number += '';
			number = (number<1000000 ? '' : number.slice(-9, -6)+' ') + number.slice(-6, -3) + ' ' + number.slice(-3);
		}
	}

	return number;
}



// Функции для работы с cookie
//установки cookie
function setCookie (name, value, expires, path, domain, secure) {
	if(!domain) domain = settings.cookie_domain;
	document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}
//чтение cookie
function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

// Cookie expires
var datetime = new Date();
var time = datetime.getTime();
time += 1000 * 3600 * 24 * 28;
datetime.setTime(time);




$(function() {
		
		
		/*Слайдеры для заполнения полей*/
		$( ".j-slider_range" ).each(function(){
			var $inputs = $( this ).find("input"),
				$from	= $( $inputs[0] ), //текстовое поле для значения "от"
				$to		= $( $inputs[1] ), //текстовое поле для значения "до"
				min_value	= $( this ).attr('from')-0,
				max_value	= $( this ).attr('to')-0;

			var step = 1;

			var $slider = $('<div />').insertAfter( $(this) );
			
			$slider.slider({
				create: function(ui){
					
					$slider.wrap($('<div class="ui-slider-container" />'));
				
					$from.bind('change', function(){
						//В поле "от" было введено значение вручную
						var value = $(this).getFlN();

						//Даем возможность убрать цену, не сбрасывая всю форму
						if(value == ""){
							$(this).val(null);
							$slider.slider("values", 0, $slider.slider("option", "min"));
							return;
						}

						//Не больше максимального
						//Не меньше минимального
						if(value < $slider.slider("option", "min")){
							value = $slider.slider("option", "min");
						}
						else if(value > $slider.slider("option", "max")){
							value = $slider.slider("option", "max");
						}
						//Если больше верхнего, то верхнее сбрасывается
						if(value > $slider.slider("values", 1)){
							$slider.slider("values", 1, $slider.slider("option", "max"));
							$to.val(humanNumber($slider.slider("option", "max"), "up"));
						}

						$(this).val(humanNumber(value, 'down'));

						if($to.getN() && value > $to.getN()) value = $to.getN();
						$slider.slider("values", 0, value); //меняем положение 1 ползунка
					});
					var max = $to.bind('change', function(){
						//В поле "до" было введено значение вручную
						var value = $(this).getFlN();

						//Даем возможность убрать цену, не сбрасывая всю форму
						if(value == ""){
							$(this).val(null);
							$slider.slider("values", 1, $slider.slider("option", "max"));
							return;
						}

						//Не больше максимального
						//Не меньше минимального
						if(value < $slider.slider("option", "min")){
							value = $slider.slider("option", "min");
						}
						else if(value > $slider.slider("option", "max")){
							value = $slider.slider("option", "max");
						}
						//Если меньше нижнего, то нижнее сбрасывается
						if(value < $slider.slider("values", 0)){
							$slider.slider("values", 0, $slider.slider("option", "min"));
							$from.val(humanNumber($slider.slider("option", "min"), "down"));
						}

						$(this).val(humanNumber(value, 'up'));
						
						if(value < $from.getN()) value = $from.getN();
						$slider.slider("values", 1, value); //меняем положение 2 ползунка
					})
					.getN();
	
					if(max) $slider.slider("values", 1, max);
					
				},
				range: true,
				step: step,//шаг, с которым двигается ползунок
				min: min_value, //минимально возможное значение
				max: max_value, //максимально возможное значение
				values: [ $from.getN(), max_value ], //установим ползунки в первоначальные положения (в соот-ии со значениями, введенными в поля)
				slide: function( event, ui ) {
					//пользователь начал двигает ползунок - меняем зн-е в соотв. поле
					if(ui.values[0] == ui.value){
						$from.val(humanNumber(ui.value, 'down'));
					}
					else{
						$to.val(humanNumber(ui.value, 'up'));
					}
				},
				stop: function( event, ui ) {
					//пользователь перестал двигать ползунок - уберем выделение с поля, в котором менялось зн-е
					getAndSetFilterData();
				}
			});
		});
	
		

	

	
	
	

});