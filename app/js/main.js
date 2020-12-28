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
	this.mobileMenu();
	return this;
};


app.initElems = function() {
	this.initSlick();
	this.initTabs();
	this.initValidate();
	return this;
};



app.onResize = function() {
	
	W.on("resize", function() {
		deviceType();
	});
	
	return this;
}





// мобильное меню
app.mobileMenu = function() {
	let menu = $('.mobile-menu');
	let wrapper = $('#wrapper');
	
	$('.mobile-menu__btn').on('click', function() {
		
		if (wrapper.is('.mobile-menu-show')) {
			mobileMenuControl.menuClose()
		} else {
			mobileMenuControl.menuOpen()
		}
	})
	
	$('.mobile-menu-overlay').on('click', function() {
		mobileMenuControl.menuClose()
	})
	
	$('.mobile-menu__close').on('click', function() {
		mobileMenuControl.menuClose();
	})
	
	
	$('.mobile-menu__list .item__btn').on('click', function() {
		let menu = $('.mobile-menu');
		let wrapper = $(this).closest('.mobile-menu__list-wrap');
		let item = $(this).closest('.item-slide');
		let hidden = item.find('.item__hidden');
		
		wrapper.attr('data-height', wrapper.height());
		
		item.addClass('active');
		
		if(wrapper.height() < hidden.height()) {
			wrapper.animate({'minHeight': hidden.height(), left: '-290px'}, 500);
		} else {
			wrapper.animate({left: '-290px'}, 500);
			wrapper.css('minHeight', wrapper.height());
		}
		
		setTimeout(() => {
			menu.addClass('opened');
		}, 500)
	})
	
	$('.mobile-menu__back').on('click', function() {
		let menu = $('.mobile-menu');
		let wrapper = menu.find('.mobile-menu__list-wrap');
		let item = menu.find('.item-slide.active');
		let hidden = item.find('.item__hidden');
		
		wrapper.animate({'minHeight': wrapper.data('height'), left: 0}, 500, function() {
			item.removeClass('active');
		});
		menu.removeClass('opened');
	})
}


let mobileMenuControl = {
	menu: $('.mobile-menu'),
	wrapper: $('#wrapper'),
	menuOpen: function() {
		this.menu.fadeIn(300);
		this.wrapper.addClass('mobile-menu-show');
		this.showOverlay();
	},
	menuClose: function() {
		this.closeOverlay();
		this.menu.fadeOut(300);
		
		this.wrapper.removeClass('mobile-menu-show');
	},
	closeOverlay: function() {
		$('#wrapper').removeClass('show-overlay').find('.mobile-menu-overlay').fadeOut(200);
	},
	showOverlay: function() {
		$('#wrapper').addClass('show-overlay').find('.mobile-menu-overlay').fadeIn(200);
	}
}




app.initTabs = function() {
	if($('.tabs').length) {
		function Tabs() {
		  var bindAll = function() {
		    var menuElements = document.querySelectorAll('[data-tab]');
		    for(var i = 0; i < menuElements.length ; i++) {
		      menuElements[i].addEventListener('click', change, false);
		    }
		  }

		  var clear = function() {
		    var menuElements = document.querySelectorAll('[data-tab]');
		    for(var i = 0; i < menuElements.length ; i++) {
		      menuElements[i].classList.remove('active');
		      var id = menuElements[i].getAttribute('data-tab');
		      document.getElementById(id).classList.remove('active');
		    }
		  }

		  var change = function(e) {
		  	e.preventDefault();
		    clear();
		    e.target.classList.add('active');
		    var id = e.currentTarget.getAttribute('data-tab');
		    document.getElementById(id).classList.add('active');
		  }

		  bindAll();
		}
		
		var connectTabs = new Tabs();
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
	
	if($('#carousel-news').length) {
		$('#carousel-news').slick({
			arrows: false,
			speed: 400,
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			adaptiveHeight: true,
			dots: false,
			responsive: [
				{
				  breakpoint: 2900,
				  settings: {
					slidesToShow: 3,
				  }
				},
				
				{
				  breakpoint: 1000,
				  settings: {
					slidesToShow: 2
				  }
				},
				
				{
				  breakpoint: 650,
				  settings: {
					slidesToShow: 1,
				  }
				}
				
			  ]
		})
		
		
		document.querySelector('.carousel-news__prev').addEventListener('click', function() {
			$('#carousel-news').slick('slickPrev');
		})
		
		document.querySelector('.carousel-news__next').addEventListener('click', function() {
			$('#carousel-news').slick('slickNext');
		})
	}
	
	if($('#carousel-main').length) {
		$('.slider-main').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			fade: true,
			speed: 400,
			infinite: true,
			adaptiveHeight: true,
			asNavFor: '.carousel-main'
		});
		
		$('.carousel-main').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.slider-main',
			dots: false,
			arrows: false,
			centerMode: false,
			speed: 400,
			infinite: true,
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 3000,
			responsive: [
				{
				  breakpoint: 2900,
				  settings: {
					slidesToShow: 3,
				  }
				},
				
				{
				  breakpoint: 1100,
				  settings: {
					slidesToShow: 2
				  }
				},
				
				{
				  breakpoint: 900,
				  settings: {
					slidesToShow: 2
				  }
				},
				
			  ]
		});
		
		document.querySelector('.carousel-main__prev').addEventListener('click', function() {
			$('#carousel-main').slick('slickPrev');
		})
		
		document.querySelector('.carousel-main__next').addEventListener('click', function() {
			$('#carousel-main').slick('slickNext');
		})
	}
	
	if($('#slider-promo-text').length) {
		
		$('#slider-promo-img').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			fade: true,
			speed: 400,
			infinite: true,
			adaptiveHeight: true,
			asNavFor: '#slider-promo-text'
		});
		
		
		$('#slider-promo-text').slick({
			slidesToScroll: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			fade: true,
			speed: 400,
			infinite: true,
			adaptiveHeight: true,
			asNavFor: '#slider-promo-img',
		});
		
		let paging = document.querySelector('.about-promo__paging');
		let dots = document.querySelector('#slider-promo-text .slick-dots');
		
		function updatePaging() {
			let numActive = 1;
			
			for(var i = 0; i < dots.childElementCount; i++) {
				let el = dots.children;
				
				if(el[i].classList.contains("slick-active")) {
					numActive = i + 1;
				}
			}
			
			paging.innerHTML = `
				<span class="a">${twoDigits(numActive)}</span>
				<span class="sep">/</span>
				<span class="n">${twoDigits(dots.childElementCount)}</span>
				`;
		}
		
		function twoDigits(num) {
		  return ('0' + num).slice(-2);
		}
		
		updatePaging();
		
		$('#slider-promo-text').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			setTimeout(function() {
				updatePaging();
			}, 30)
		});
		
		
		document.querySelector('.about-promo__prev').addEventListener('click', function() {
			$('#slider-promo-text').slick('slickPrev');
		})
		
		document.querySelector('.about-promo__next').addEventListener('click', function() {
			$('#slider-promo-text').slick('slickNext');
		})
	}
	
	
	if($('#carousel-prod').length) {
		$('#carousel-prod').slick({
			arrows: false,
			speed: 400,
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			adaptiveHeight: true,
			dots: false,
			responsive: [
				{
				  breakpoint: 2900,
				  settings: {
					slidesToShow: 3,
				  }
				},
				
				{
				  breakpoint: 900,
				  settings: {
					slidesToShow: 2
				  }
				},
			  ]
		})
		
		
		document.querySelector('.carousel-prod__prev').addEventListener('click', function() {
			$('#carousel-prod').slick('slickPrev');
		})
		
		document.querySelector('.carousel-prod__next').addEventListener('click', function() {
			$('#carousel-prod').slick('slickNext');
		})
	}
	
	
	if($('#slider-feedback').length) {
		$('#slider-feedback').slick({
			arrows: false,
			speed: 600,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			adaptiveHeight: true,
			dots: false,
			fade: true,
		})
		
		document.querySelector('.slider-feedback__prev').addEventListener('click', function() {
			$('#slider-feedback').slick('slickPrev');
		})
		
		document.querySelector('.slider-feedback__next').addEventListener('click', function() {
			$('#slider-feedback').slick('slickNext');
		})
	}
	
	
	
	if($('#slider-news-mini').length) {
		$('#slider-news-mini').slick({
			arrows: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			adaptiveHeight: true,
			dots: false,
			responsive: [
				{
				  breakpoint: 2900,
				  settings: {
					slidesToShow: 1,
				  }
				},
				
				{
				  breakpoint: 1100,
				  settings: {
					slidesToShow: 2
				  }
				},
				
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 1
				  }
				},
			  ]
		})
		
		
		document.querySelector('.slider-news__prev').addEventListener('click', function() {
			$('#slider-news-mini').slick('slickPrev');
		})
		
		document.querySelector('.slider-news__next').addEventListener('click', function() {
			$('#slider-news-mini').slick('slickNext');
		})
	}
	
}





app.initValidate = function() {
	
    if($('#form-partnership').length) {
    	
	  	$('input[name="phone"]').mask("7(999)99-99-999");

        $("#form-partnership").validate({
            rules:{
                company:{
                    required: true,
                    minlength: 1,
                    maxlength: 30
                },
                
                name:{
                    required: true,
                    minlength: 1,
                    maxlength: 30
                },

                phone: {
                    required: true,
                    minlength: 4,
                    maxlength: 17,
                    digits: false
                },
                
                mail: {
                    required: true,
                    email: true
                },
                
                message:{
                    required: true,
                    minlength: 1,
                },
            },
            
            
            messages:{

                company:{
                    required: "Это поле обязательно для заполнения",
                    maxlength: "Максимальное число символов - 30"
                },

                name: {
                    required: "Это поле обязательно для заполнения",
                    maxlength: "Максимальное число символов - 30"
                },


                phone: {
                    digits: "Неверный формат телефона",
                    required: "Это поле обязательно для заполнения",
                    minlength: "Телефон должен состоять минимум из 4-х цифр"
                },
                
                mail:{
                    required: "Это поле обязательно для заполнения",
                    email: "Неверный формат email"
                },
                
                message:{
                    required: "Это поле обязательно для заполнения"
                }
                

            },
            
            submitHandler: function() {
			}
        });
    }
    
    
    
    if($('#form-feedback').length) {
    	
	  	$('input[name="phone"]').mask("7(999)99-99-999");

        $("#form-feedback").validate({
            rules:{
                name:{
                    required: true,
                    minlength: 1,
                    maxlength: 30
                },

                mail: {
                    required: true,
                    email: true
                },
                
                message:{
                    required: true,
                    minlength: 1,
                },
            },
            
            
            messages:{

                name: {
                    required: "Это поле обязательно для заполнения",
                    maxlength: "Максимальное число символов - 30"
                },

                mail:{
                    required: "Это поле обязательно для заполнения",
                    email: "Неверный формат email"
                },
                
                message:{
                    required: "Это поле обязательно для заполнения"
                }
                

            },
            
            submitHandler: function() {
			}
        });
    }
    
    
    if($('#form-subscribe').length) {
    	
        $("#form-subscribe").validate({
            rules:{
                mail: {
                    required: true,
                    email: true
                },
            },
            
            
            messages:{
                mail:{
                    required: "Это поле обязательно для заполнения",
                    email: "Неверный формат email"
                },
            },
            
            submitHandler: function() {
			}
        });
    }
    
    
    
    if($('#form-consultation').length) {
    	
	  	$('input[name="phone"]').mask("7(999)99-99-999");

        $("#form-consultation").validate({
            rules:{

                phone: {
                    required: true,
                    minlength: 4,
                    maxlength: 17,
                    digits: false
                },
            },
            
            
            messages:{

                phone: {
                    digits: "Неверный формат телефона",
                    required: "Это поле обязательно для заполнения",
                    minlength: "Телефон должен состоять минимум из 4-х цифр"
                },
                
            },
            
            submitHandler: function() {
			}
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
				
				// if($('#bday-slider').length) {
				// 	if( !$('#bday-slider').is('.slick-slider')) {
				// 		$('#bday-slider').slick("reinit");
				// 	}
				// }
				
			}
				
			break;
			
		case (window_width < device_pad):
			$('body').addClass('desktop_mobile2').removeClass('desktop_mobile').removeClass('desktop').removeClass('desktop_pad');
			
			if (flag_resize_mobile2 != true ) {
				flag_resize_pad = false;
				flag_resize_desktop = false;
				flag_resize_mobile = false;
				
				flag_resize_mobile2 = true; 
				
				// if($('#bday-slider').length) {
				// 	if( !$('#bday-slider').is('.slick-slider')) {
				// 		$('#bday-slider').slick("reinit");
				// 	}
				// }
				
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