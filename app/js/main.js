var app = app || {},
	D = $(document),
	W = $(window),
	activeClass = "active";




D.ready(function() {
	B = $("body"),
	H = $('html'),
	HB = $("html, body"),
	app.init();
	
	deviceType();
});


app.init = function() {
	return this.initElems().onResize().bindActions();
};


app.bindActions = function() {
	this.slideBlock();
	this.searchMobile();
	this.mainMenu();
	this.mobileMenu();
	return this;
};


app.initElems = function() {
	this.initSlick();
	this.initCalendar();
	return this;
};



app.onResize = function() {
	
	W.on("resize", function() {
		deviceType();
	});
	
	return this;
}






// главное меню
app.mainMenu = function() {
	let menu = $('.main-menu');
	let menuItem = $('.main-menu__item');
	let menuInnerBtn = menu.find('div.hidden-item__title');
	
	menuInnerBtn.on('click', function() {
		let target = $(this).data('target');
		let menuLeft = $(this).closest('.wrap__left')
		let menuRight = $(this).closest('.main-menu__hidden').find('.wrap__right');
		
		if(!$(this).is('.active')) {
			menuLeft.find('.hidden-item__title.active').removeClass('active');
			let $this = $(this);
			menuRight.find('.hidden-item__wrap.open').removeClass('open').fadeOut(150, function() {
				$this.addClass('active');
				$('#' + target).fadeIn(200).addClass('open');
			})
		}
		
		
	})
	
	menuItem.hover(function () {
		let $this = $(this);

        intervalID = setTimeout(function() {
            	$this.addClass('open').find('.main-menu__hidden').fadeIn(200);
				$this.find('.wrap__pointer').css('left', $this.width() / 2)
            }, 70);
      },

      function () {
        $(this).removeClass('open').find('.main-menu__hidden').fadeOut(200);
        clearInterval(intervalID);
      })
	
}





// мобильное меню
app.mobileMenu = function() {
	$('.h-menu-btn').on('click', function() {
		if($('#header').is('.m-menu-show')) {
			closeOverlay();
		} else {
			$('.mobile-menu').fadeIn(250).animate({'left': 0}, 250);
			showOverlay();
		}
	})
	
	$('.mobile-menu-overlay').on('click', function() {
		closeOverlay();
	})
	
	function closeOverlay(status) {
		if(!status == true) {
			$('.mobile-menu').animate({'left': -600}, 250).fadeOut(250);
			B.removeClass('show-overlay').find('.mobile-menu-overlay').fadeOut(300);
		}
	}


	function showOverlay() {
		B.addClass('show-overlay').find('.mobile-menu-overlay').fadeIn(300);
	}
}



// поиск на мобильных
app.searchMobile = function() {
	$('.h-search-mobile').on('click', function() {
		let search = $('.h-search');
		
		if(search.is('.open')) {
			search.slideUp(250);
			search.removeClass('open')
		} else {
			search.slideDown(250);
			$('.h-search__field').focus();
			search.addClass('open')
		}
	})
	
	
	if($('.js-menu').length) {
		$('body').on('click', '.js-menu-btn', function (event) {
			var $this = $(this),
				$wrap = $this.parent('.js-menu'),
				$target = $wrap.children('.js-menu-hidden');


			if($wrap.is('.open')) {
				$wrap.removeClass('open');
				$target.slideUp(300);
			} else {
				$wrap.addClass('open');
				$target.slideDown(300);
			}
		});
	}
}



//раскрывающиеся блоки
app.slideBlock = function() {
	
	if($('.js-show').length) {
		$('body').on('click', '.js-show-btn', function (event) {
			var $this = $(this),
				$wrap = $this.closest('.js-show'),
				$target = $wrap.find('.js-show-hidden');


			if($wrap.is('.open')) {
				$wrap.removeClass('open');
				$target.slideUp(300);
			} else {
				$wrap.addClass('open');
				$target.slideDown(300);
			}
		});
	}
	
	if($('.js-sect').length) {
		$('body').on('click', '.js-sect-btn', function (event) {
			var $this = $(this),
				$wrap = $this.closest('.js-sect'),
				$target = $wrap.find('.js-sect-hidden');


			if($wrap.is('.open')) {
				$wrap.removeClass('open');
				$target.slideUp(300);
			} else {
				let $targetID = $target.attr('id')
				$wrap.addClass('open');
				$target.slideDown(300);
				
				setTimeout(function() {
					$('#' + $targetID).slick("init");
					setTimeout(function() {
						if ($('#' + $targetID).find('.slick-track').width() == 0) {
							$('#' + $targetID).slick('setPosition').slick();
						}
					}, 10)
					
					$(window).resize();
				}, 20)
			}
		});
	}
	
	if($('.category-menu').length) {
		$('body').on('click', '.category-menu__btn', function (event) {
			var $this = $(this),
				$wrap = $('.category-menu'),
				$target = $wrap.find('.category-menu__list');


			if($wrap.is('.open')) {
				$wrap.removeClass('open');
				$target.slideUp(300);
			} else {
				$wrap.addClass('open');
				$target.slideDown(300);
			}
		});
	}
	
	if($('.js-slide-close').length) {
		$('.js-slide-close').on('click', function() {
			let wrap = $(this).data('id');
			
			
			$('#' + wrap).slideUp(300)
		})
	}
}




// карусели/слайдеры
app.initSlick = function() {
	
	if($('#bday-slider').length) {
		$('#bday-slider').slick({
			arrows: true,
			speed: 550,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			adaptiveHeight: true,
			responsive: [
				{
				  breakpoint: 2900,
				  settings: "unslick"
				},
				
				{
				  breakpoint: 1100,
				  settings: {
					slidesToShow: 3,
					dots: false
				  }
				},
				
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 3,
					dots: true, 
				  }
				},
				
				{
				  breakpoint: 700,
				  settings: {
					slidesToShow: 2,
					dots: true, 
				  }
				},
				
				{
				  breakpoint: 450,
				  settings: {
					slidesToShow: 1,
					dots: true, 
				  }
				}
				
			  ]
		})
	}
	
	let sliderNewsParams = {
		arrows: true,
		dots: true,
		speed: 550,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		adaptiveHeight: true,
		responsive: [
			{
			  breakpoint: 2900,
			  settings: "unslick"
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 2,
			  }
			},
			
			{
			  breakpoint: 700,
			  settings: {
				slidesToShow: 2,
			  }
			},
			
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 1,
			  }
			}
			
		]
	}
	
	if($('#slider-news').length) {
		$('#slider-news').slick(sliderNewsParams)
	}
	
	if($('#slider-news-industry').length) {
		$('#slider-news-industry').slick(sliderNewsParams)
	}
	
	if($('#slider-news-law').length) {
		$('#slider-news-law').slick(sliderNewsParams)
	}
	
	if($('#slider-news-life').length) {
		$('#slider-news-life').slick(sliderNewsParams)
	}
	
}



//раскрывающиеся блоки
app.initCalendar = function() {
	
	if($('.datepicker').length) {
	    
	    $.datepicker.setDefaults($.datepicker.regional['ru']);

	    $('.datepicker').datepicker({
	        regional: 'ru',
	        dateFormat: "dd.mm.yy",
	        showOtherMonths: true
	    });
	}
}


let flag_resize_mobile;//флаги для проверки предыдущего разрешения
let flag_resize_mobile2;
let flag_resize_pad;
let flag_resize_desktop;


//тип девайса
function deviceType() {
	
	let windowWScroll = function () {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };
    
	let window_width = windowWScroll();
    
    
	let device_desktop = 1100, //варианты ширины девайсов
		device_pad = 768,
		device_mobile = 320,
		device_mobile2 = 480;
	
	
	
	switch(true) {
		case (window_width >= device_desktop):
			$('body').addClass('desktop').removeClass('desktop_pad').removeClass('desktop_mobile').removeClass('desktop_mobile2');
			
			if (flag_resize_desktop != true ) {
				flag_resize_mobile = false;
				flag_resize_mobile2 = false;
				flag_resize_pad = false;
				
				flag_resize_desktop = true;
				
				// if($('#slider-opinions').length) {
				// 	$('#slider-opinions').slick("unslick");
				// }
				
			}
			
				
			break;
			
			
		case (window_width >= device_pad && window_width < device_desktop):
			$('body').addClass('desktop_pad').removeClass('desktop_mobile').removeClass('desktop_mobile2').removeClass('desktop');
			
			if (flag_resize_pad != true ) {
					
				flag_resize_mobile = false;
				flag_resize_mobile2 = false;
				flag_resize_desktop = false;
				
				flag_resize_pad = true;
				
				if($('#bday-slider').length) {
					if( !$('#bday-slider').is('.slick-slider')) {
						$('#bday-slider').slick("reinit");
					}
				}
				
			}
				
			break;
			
		case (window_width < device_pad):
			$('body').addClass('desktop_mobile2').removeClass('desktop_mobile').removeClass('desktop').removeClass('desktop_pad');
			
			if (flag_resize_mobile2 != true ) {
				flag_resize_pad = false;
				flag_resize_desktop = false;
				flag_resize_mobile = false;
				
				flag_resize_mobile2 = true; 
				
				if($('#bday-slider').length) {
					if( !$('#bday-slider').is('.slick-slider')) {
						$('#bday-slider').slick("reinit");
					}
				}
				
				if($('.js-sect.open').length) {
					$('.js-sect.open').each(function() {
						let slider = $(this).find('.js-sect-hidden').attr('id');
						
						if( !$('#' + slider).is('.slick-slider')) {
							$('#' + slider).slick("init");
						}
					})
				}
				
			}
			
			break;
	}
	
}