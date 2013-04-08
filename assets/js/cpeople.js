/*
 * If you have any questions or comments about this script or if you'd like to report a bug please contact ask.dev at gmail.com
 */
	
var loadTimeout = false;
$(document).ready(function() {
	if ($('#presentation-slides').length) {
		Modernizr.load([{
			test: Modernizr.touch,
			yep: BASE_PATH+'js/jquery.touch.js',
			nope: BASE_PATH+'js/jquery.tinyscrollbar.js',
			complete: loadComplete
		},{
			test: Modernizr.mq('only all'),
			nope: BASE_PATH+'js/respond.js'
		}]);
		
		loadTimeout = setTimeout(initializeLight, 10000);
	}
	if ($('#portfolio-wrapper').length) {
		Modernizr.load([{
			test: Modernizr.mq('only all'),
			nope: BASE_PATH+'js/respond.js',
			complete: initializePortfolio
		}]);
	}
});


function loadComplete() {
	clearTimeout(loadTimeout);
	initializePresentation();
}

function initializeLight() {
	//script load timeout
	$('#container').removeClass('loading').append('<img class="default-image" alt="" src="/img/slides/bg/00.jpg">');
	
	function resizeLight() {
		var _parentWidth = $(window).width(),
			_parentHeight = $(window).height(),
			_imgKoef = 16/9,
			_imgWidth, _imgHeight, _imgMargin;
		if (_parentWidth/_parentHeight >= _imgKoef) {
			_imgWidth = _parentWidth;
			_imgHeight = _parentWidth / _imgKoef;
			_imgMargin = '-'+( Math.round((_imgHeight - _parentHeight) / 2) )+'px 0px';
		} else {
			_imgHeight = _parentHeight;
			_imgWidth = _parentHeight * _imgKoef;
			_imgMargin = '0px -'+( Math.round((_imgWidth - _parentWidth) / 2) )+'px';
		}
				
		$('.default-image').css({width: Math.round(_imgWidth), height: Math.round(_imgHeight), margin: _imgMargin});
	}
	
	resizeLight();
	$(window).bind('resize', resizeLight);
}

function initializePresentation() {
	presentation.init();
	
	if (!Modernizr.touch && $('#popup-video').length) {
		popupMod.init();
		popupVideo.init();
		popupPhoto.init();
	}
	
	if (!$.browser.mobile) {
		$('body').on('click', 'a[href^="tel:"]', function() {
				$(this).attr('href', $(this).attr('href').replace(/^tel:/, 'callto:'));
		});
	}
}
function initializePortfolio() {
	portfolio.init();
}

var presentation = function() {
	var elements, params;
		
    function init() {
		elements = {
			container: $('#container'),
			slides: $('#presentation-slides'),
			slidesContainer: $('#presentation-slides-container'),
			navigation: $('#presentation-nav'),
			navigationContainer: $('#presentation-nav-container'),
			navigationWrapper: $('#presentation-nav-wrapper'),
			navigationSlider: $('#presentation-nav-slider>SPAN')
			
		};
		params = {
			itemLength: 0,
			preloadNavLength: 0,
			
			bgPreloadIndex: 0,
			bgPreloadData: {},
			preloadData: {},
			
			curIndex: 0,
			newIndex: 0, 
			
			listMargin: 0,
			itemWidth: 0,
			
			animDuration: 750, 
			
			animDir: false,
			animLinear: true,
			animFlag: false,
			
			navTimer: false,
			navShiftDir: false,
			
			previewWidth: 121,
			previewMargin: 120,
			previewOverflow: 0,
			
			minHeight: 650,
			windowHeight: 650,
			
			bindFlag: false
		};
		
		params.itemLength = $('.presentation-slide', elements.slides).length;
		//elements.container.addClass('loading');
		
		var index = 0;
		$('.presentation-slide', elements.slides).each(function() {
			$(this).attr('id', 'presentation-slide-item'+index);
			//$(this).append('<div class="loader"></div>');
			index++;
		});
		elements.navigation.addClass('hidden');
		
		if (Modernizr.touch) {
			initMain();
		} else {
			preloadNav();
		}
    }
	function preloadNav() {
		var i = 0, _array = [];
		$('IMG', elements.navigationContainer).each(function() {
			_array[i] = new Image();
			_array[i].onload = onloadNav;
			_array[i].src = $(this).attr('src');
			i++;
		});
	}
	function onloadNav() {
		params.preloadNavLength++;
		if (params.preloadNavLength == params.itemLength) initMain();
	}
	
	function initMain() {
		params.itemWidth = 100/params.itemLength;
		
		elements.slides.show();
		elements.slidesContainer.css({width: (100*params.itemLength)+'%'});
		$('.presentation-slide', elements.slides).css({width: params.itemWidth+'%'});
		
		if (!Modernizr.touch) $('.presentation-slide', elements.slides).addClass('style-scrollbar');
		
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("android") > -1) $('.presentation-slide', elements.slides).addClass('backface-visibility');
		
		elements.navigation.show();
		elements.navigationContainer.css({minWidth: (params.previewWidth*(params.itemLength+1))+'px'});
		$('.presentation-nav-item:first-child', elements.navigationContainer).addClass('active');
		
		
		var arrowHTML = '<div class="presentation-arrow left disabled"><span></span></div><div class="presentation-arrow right disabled"><span></span></div>';
		elements.slides.append(arrowHTML);
		elements.navigation.append(arrowHTML);
		
		if (!Modernizr.touch) slideScrollInit();
		
		reset();
		resize();
		$(window).bind('resize', resize);
		
		//setTimeout(bind, 10);
		bindMainNav();
		
		elements.container.removeClass('loading');
		//setTimeout(reset,10);
		setTimeout(checkUrl,100);
		
		setTimeout(bgPreload,1000);
	}
	
	function bgPreload() {
		params.bgPreloadIndex++;
		if (params.bgPreloadIndex < params.itemLength) {
			var _slide = $('.presentation-slide', elements.slides).eq(params.bgPreloadIndex),
				_total = $('.img-to-load', _slide).length;
			params.bgPreloadData[params.bgPreloadIndex] = {total: _total, loaded: 0};
			if (_total > 0) {
				var i = 0, _array = [];
				$('.img-to-load', _slide).each(function() {
					_array[i] = new Image();
					_array[i].onload = bgOnload;
					_array[i].src = $(this).data('src');
					$(this).addClass('img-cached');
					i++;
				});
			} else {
				bgPreload();
			}
		}
	}
	function bgOnload() {
		params.bgPreloadData[params.bgPreloadIndex].loaded++;
		if (params.bgPreloadData[params.bgPreloadIndex].total == params.bgPreloadData[params.bgPreloadIndex].loaded) setTimeout(bgPreload,1000);
	}
	
	function trackPageView() {
		//console.log(document.location.hash.substr(1));
		pageTracker._trackPageview('presentation/'+document.location.hash.substr(1));
	}
	
	
	function reset() {
		if ($('#presentation-slide-item'+params.curIndex).index() == params.itemLength-1) {
			params.listMargin += 100;
			elements.slidesContainer
				.append($('.presentation-slide:first-child', elements.slides))
				.css(animStyle(params.listMargin));
		}
		if ($('#presentation-slide-item'+params.curIndex).index() == 0) {
			params.listMargin -= 100;
			elements.slidesContainer
				.prepend($('.presentation-slide:last-child', elements.slides))
				.css(animStyle(params.listMargin));
		}
		
		if (params.curIndex == 0) $('FOOTER').removeClass('inner');
		else $('FOOTER').addClass('inner');
		
		slideReset();
		
		setTimeout(animComplete, 1);
	}
	function rebuildBefore() {
		elements.slides.removeClass('animate');
		
		if (params.animLinear) {
			if (params.animDir) {
				params.listMargin += 100;
				elements.slidesContainer
					.append($('.presentation-slide:first-child', elements.slides))
					.css(animStyle(params.listMargin));
			} else {
				params.listMargin -= 100;
				elements.slidesContainer
					.prepend($('.presentation-slide:last-child', elements.slides))
					.css(animStyle(params.listMargin));
			}
		} else {
			var _newElem = $('#presentation-slide-item'+params.newIndex),
				_curElem = $('#presentation-slide-item'+params.curIndex);
			if (params.animDir) {
				_newElem.insertAfter(_curElem);
			} else {
				_newElem.insertBefore(_curElem);
			}
			var margin = -100*(_curElem.index());
			if (margin != params.listMargin) {
				params.listMargin = margin;
				elements.slidesContainer.css(animStyle(params.listMargin));
			}
		}
		
		$('.presentation-nav-item.active>DIV', elements.navigationContainer).css({marginRight: '0px'});
		$('.presentation-nav-item.active', elements.navigationContainer).removeClass('active');
		
		var _navElem = $('.presentation-nav-item', elements.navigationContainer).eq(params.newIndex);
		_navElem.addClass('active');
		document.location.hash = _navElem.data('url');
		
		//$('.nav-link').removeClass('active');
		//$('.nav-link[data-index="'+params.newIndex+'"]').addClass('active');
		
		elements.navigationSlider.css({left: (params.newIndex*100/params.itemLength)+'%'});
		
		previewReset();
		
		trackPageView();
		
		setTimeout(animPrepare, 20);
	}
	function animStyle(val) {
		if (!Modernizr.csstransitions) {
			return {marginLeft: val+'%'};
		} else {
			return {transform: 'translateX('+(val/10)+'%)'}
		}
	}
	function animPrepare() {
		elements.slides.addClass('animate');
		if (params.animFlag) {
			params.listMargin += (params.animDir)?-100:100;
			
			if (!Modernizr.csstransitions) {
				elements.slidesContainer.animate({marginLeft: params.listMargin+'%'}, {duration:params.animDuration, complete:rebuildAfter});
			} else {
				elements.slidesContainer.css(animStyle(params.listMargin));
				setTimeout(rebuildAfter, params.animDuration);
			}
		}
	}
	function rebuildAfter() {
		if (!params.animLinear) {
			elements.slides.removeClass('animate');
			var _prevElem = $('#presentation-slide-item'+((params.newIndex == 0)?(params.itemLength-1):(params.newIndex-1))),
				_newElem = $('#presentation-slide-item'+params.newIndex);
			_newElem.insertAfter(_prevElem);
			params.listMargin = -100*(_newElem.index());
			elements.slidesContainer.css(animStyle(params.listMargin));
		}
		params.curIndex = params.newIndex;
		reset();
	}
	function animComplete() {
		elements.slides.addClass('animate');
		params.animFlag = false;
	}
	function previewReset() {
		$('.presentation-nav-item.active>DIV', elements.navigationContainer).css({marginRight: params.previewMargin+'px'});
		if (params.previewOverflow > 0) {
			var _margin = params.previewWidth*params.newIndex;
			if (_margin > params.previewOverflow) _margin = params.previewOverflow;
			elements.navigationContainer.css({marginLeft: '-'+_margin+'px'});
		} else {
			elements.navigationContainer.css({marginLeft: '0px'});
		}
	}
	function bindMainNav() {
		$('.presentation-arrow')
			.bind('click', arrowClick)
			.removeClass('disabled');
			
		$('.nav-link').bind('click', navLinkClick);
		
		if (Modernizr.touch) {
			elements.slides.swipe({
					swipeLeft: swipeLeft,
					swipeRight: swipeRight,
					threshold: 100,
					fingers: 1,
					allowPageScroll:'vertical',
					excludedElements:$.fn.swipe.defaults.excludedElements+', .presentation-arrow, .hover-button'
			});
		}
	}
	function bindFootNav() {
		//elements.navigation.removeClass('hidden').addClass('minimized');
		
		if (Modernizr.touch) {
			
		} else {
			elements.navigation.removeClass('hidden').addClass('minimized');
			
			//elements.container
			$(window).bind('mousemove', mouseMove);
			$('.presentation-arrow', elements.navigation).bind('mouseenter', arrowHover);
			$('.presentation-arrow', elements.navigation).bind('mouseleave', arrowOut);
			$('.presentation-nav-item', elements.navigationContainer).bind('click', navClick);
		}
		params.bindFlag = true;
	}
	function unbindFootNav() {
		//elements.navigation.addClass('hidden').removeClass('minimized');
		
		if (Modernizr.touch) {
		
		} else {
			elements.navigation.addClass('hidden').removeClass('minimized');
			//elements.container
			$(window).unbind('mousemove');
			$('.presentation-arrow', elements.navigation).unbind('mouseenter').unbind('mouseleave');
			$('.presentation-nav-item', elements.navigationContainer).unbind('click');
		}
		params.bindFlag = false;
	}
	function arrowHover() {
		params.navShiftDir = $(this).hasClass('right');
		params.navTimer = setTimeout(navShift, 750);
	}
	function arrowOut() {
		clearTimeout(params.navTimer);
	}
	function arrowClick() {
		if (params.animFlag) return false;
		
		params.animFlag = true;
		params.animDir = $(this).hasClass('right');
		
		navSlide();
	}
	function swipeLeft() {
		if (params.animFlag) return false;
		
		params.animFlag = true;
		params.animDir = true;
		
		navSlide();
	}
	function swipeRight() {
		if (params.animFlag) return false;
		
		params.animFlag = true;
		params.animDir = false;
		
		navSlide();
	}
	function navSlide() {
		params.newIndex = params.curIndex;
		params.newIndex += (params.animDir)?1:-1;
		if (params.newIndex < 0) params.newIndex = params.itemLength-1;
		if (params.newIndex > params.itemLength-1) params.newIndex = 0;
		
		params.animLinear = true;
		rebuildBefore();
		
		clearTimeout(params.navTimer);
	}
	function navShift() {
		elements.navigationContainer.css({marginLeft: ((params.navShiftDir)?-params.previewOverflow:0)+'px'});
	}
	function navClick() {
		if (params.animFlag) return false;
		if ($(this).hasClass('active')) return false;
		
		params.animFlag = true;
		
		params.newIndex = $(this).index();
		navApply();
	}
	function navLinkClick() {
		if (params.animFlag) return false;
		
		var _index = $(this).data('index');
		if (_index == 0) {
			if (params.curIndex == 0) _index = 1;
		} else {
			if (_index == params.curIndex) return false;
		}
		
		params.animFlag = true;
		
		params.newIndex = _index;
		navApply();
	}
	function checkUrl() {
		_navElem;
		if (document.location.hash == '' || document.location.hash == '#') {
			document.location.hash =  $('.presentation-nav-item:first-child', elements.navigationContainer).data('url');
			return true;
		}
		var _navElem = $('.presentation-nav-item[data-url="'+document.location.hash.substr(1)+'"]', elements.navigationContainer);
		
		if (_navElem.length && _navElem.index() > 0) {
			params.animFlag = true;
		
			params.newIndex = _navElem.index();
			navApply();
			
			return true;
		}
		
		document.location.hash =  $('.presentation-nav-item:first-child', elements.navigationContainer).data('url');
	}
	function navApply() {
		var _abs = Math.abs(params.newIndex - params.curIndex);
		if (_abs < params.itemLength/2) {
			params.animDir = (params.newIndex > params.curIndex);
		} else {
			params.animDir = (params.newIndex < params.curIndex);
		}
		
		params.animLinear = (_abs == 1 || _abs == (params.itemLength-1));
		rebuildBefore();
	}
	function mouseMove(e) {
		if (e.pageY - $(window).scrollTop() > params.windowHeight-120) {
			elements.navigation.removeClass('minimized');
			$('.presentation-arrow', elements.slides).addClass('disabled');
		} else {
			elements.navigation.addClass('minimized');
			$('.presentation-arrow', elements.slides).removeClass('disabled');
		}
	}
	function resize() {
		params.windowWidth = $(window).width();
		//if (params.windowWidth <= 480) {
		//	params.minHeight = 480;
		//} else {
		//	params.minHeight = 650;
		//}
			
		params.windowHeight = $(window).height();
		
		//if (params.windowHeight < params.minHeight) params.windowHeight = params.minHeight;
		
		navResize();
		slideResize();
		
		if (params.windowWidth <= 480) {
			unbindFootNav();
		} else {
			if (!params.bindFlag) bindFootNav();
		}
	}
	function navResize() {
		if (!elements.navigation.hasClass('hidden')) elements.navigation.addClass('minimized');
		
		var _navWidth = elements.navigationContainer.width();
		params.previewMargin = _navWidth - params.previewWidth*params.itemLength;
		params.previewOverflow = _navWidth - elements.navigationWrapper.width();
		
		elements.navigationSlider.css({width: (100/params.itemLength)+'%'});
		
		previewReset();
	}
	
	function slideScrollInit() {
		if ($.browser.webkit) return;
		var i=0;
		$('.presentation-slide').each(function() {
			if (i++ > 1) {
				$(this).find('.presentation-slide-content')
					.addClass('viewport')
					.wrapInner('<div class="overview" />');
				$(this).addClass('scroll-block').append('<div class="scrollbar"><div class="track"><div class="thumb"></div></div></div>');
				$(this).tinyscrollbar();//{sizethumb:111});
			}
		});
	}
	function slideScrollReset() {
		if ($.browser.webkit) return;
		$('.scroll-block').each(function() {
			$(this).tinyscrollbar_update(0);
		});
	}
	function slideResize() {
		var _parentWidth = elements.container.width(),
			_parentHeight = params.windowHeight;
		
		$('.presentation-slide', elements.slides).css({height: _parentHeight});
		
		if (!Modernizr.touch) slideScrollReset();
		
		if (_parentWidth > 800) {
			var _height;
			$('.valign-helper').each(function() {
				_height = $(this).next('.valign').outerHeight();
				$(this).css('height', ((_parentHeight - _height)/2));
			});
		}
		
		var _imgKoef = 16/9,
			_imgWidth, _imgHeight, _imgMargin,
			_slideHeight;
		
		$('.presentation-slide.loaded', elements.slides).each(function() {
			if ($(this).find('.flex-bg').length && $(this).find('.flex-bg').is(':visible')) {
				_slideHeight = $(this).height();
				if (_parentHeight < _slideHeight) _parentHeight = _slideHeight;
				
				var _bgDouble = $(this).find('.flex-bg-double');
				if (_bgDouble.length) {
					var _bgHeight = _bgDouble.height();
					if (_bgHeight < _parentHeight) {
						_bgDouble.css({
							//height: _bgHeight+'px',
							paddingTop: (_parentHeight-_bgHeight)+'px'
						});
						_parentHeight = _bgHeight;
					}
				}
				
				if (_parentWidth/_parentHeight >= _imgKoef) {
					_imgWidth = _parentWidth;
					_imgHeight = _parentWidth / _imgKoef;
					//_imgMargin = '-'+( Math.round((_imgHeight - _parentHeight) / 2) )+'px 0px';
					_imgMargin = '-'+( Math.round(_imgHeight - _parentHeight) )+'px 0px 0px';
				} else {
					_imgHeight = _parentHeight;
					_imgWidth = _parentHeight * _imgKoef;
					_imgMargin = '0px -'+( Math.round((_imgWidth - _parentWidth) / 2) )+'px';
				}
				
				$(this).find('.flex-bg>IMG').css({width: Math.round(_imgWidth), height: Math.round(_imgHeight), margin: _imgMargin});
			}
		});
	}
	function slideReset() {
		if (!$('#presentation-slide-item'+params.curIndex).hasClass('loaded')) {
			slideLoad();
		}
	}
	function slideLoad() {
		var _slideElem = $('#presentation-slide-item'+params.curIndex), total = $('.img-to-load', _slideElem).length;
		if (total > 0) {
			_slideElem.addClass('loading');
			params.preloadData[params.curIndex] = {total: total, loaded: 0};
			var _array = [], _image;
			for (var i=0; i<total; i++) {
				_image = $('.img-to-load', _slideElem).eq(i);
				if (_image.hasClass('img-cached')) {
					slideImgLoadComplete(params.curIndex);
				} else {
					_array[i] = new Image();
					_array[i].setAttribute('slideindex', params.curIndex);
					_array[i].onload = slideImgLoaded;
					_array[i].src = _image.data('src');
				}
			}
		} else {
			_slideElem.addClass('loaded');
			slideResize();
		}
	}
	function slideImgLoaded() {
		slideImgLoadComplete(this.getAttribute('slideindex'));
	}
	function slideImgLoadComplete(_slideIndex) {
		var _slideElem = $('#presentation-slide-item'+_slideIndex);
			
		params.preloadData[_slideIndex].loaded++;
		if (params.preloadData[_slideIndex].loaded == params.preloadData[_slideIndex].total) {
			//var i=0;
			$('.img-to-load', _slideElem).each(function() {
				if (Modernizr.touch) {
					$(this).attr('src', $(this).data('src'));
				} else {
					var _this = $(this);
					_this
						.removeClass('img-to-load')
						//.delay(100*i)
						//.animate({opacity: 0}, {duration: 100, complete: function() {
						//	$(this).attr('src', $(this).data('src')).animate({opacity: 1});
						//}});
						.css({opacity: 0})
						.attr('src', $(this).data('src')).animate({opacity: 1});
				}
				//i++;
			})
			_slideElem.removeClass('loading').addClass('loaded');
			slideResize();
		}
	}
    return {
        init: init
    }
}();

//http://www.youtube.com/watch?v=kiePaAHK3jE


	
var popupMod = function() {
	var elements;
	
	function init() {
		$('BODY').append('<div id="popup-bg"></div>');
		elements = {
			items: $('.popup'),
			bg: $('#popup-bg')
		};
		
		elements.items.each(function() {
			$(this).append($('<div class="popup-hide"></div>'));
		});
		
		bind();
	}
	function bind() {
		$('.popup-show').bind('click', show);
		$('.popup-hide').bind('click', hide);
		
		$('.popup-content').bind('click', function(e){ e.stopPropagation(); });
		$('.popup-arrow').bind('click', function(e){ e.stopPropagation(); });
		elements.items.bind('click', hide);
		elements.bg.bind('click', hide);
	}
	
	function show() {
		showByName($(this).data('popup'));
	}
	function showByName(popup) {
		if ($('#popup-'+popup).length) {
			elements.bg.addClass('active');
			$('#popup-'+popup).addClass('active');
		}
	}
	function hide() {
		elements.items.removeClass('active');
		elements.bg.removeClass('active');
		popupVideo.reset();
	}
	
	return {
        init: init,
		showByName: showByName
    }
}();
var popupVideo = function() {
	var context, content, elements;
	
	function init() {
		context = $('#popup-video');
		content = $('.popup-content', context);
		
		bind();
	}
	function bind() {
		$('.video-button').bind('click', set);
	}
	function set() {
		content.html('<iframe src="http://player.vimeo.com/video/'+$(this).data('video')+'?autoplay=1&amp;title=0&amp;byline=0&amp;portrait=0&amp;color=d7df20" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
		popupMod.showByName('video');
	}
	function reset() {
		content.html('');
	}
	
	return {
        init: init,
		reset: reset
    }
}();
var popupPhoto = function() {
	var context, content, elements,
		photoParent, photoNum, photoCount = 16,
		photoAnim = false;
	
	function init() {
		context = $('#popup-photo');
		content = $('.popup-content', context);
		
		bind();
	}
	function bind() {
		$('.photo-button').bind('click', set);
		
		$('.popup-arrow', context).bind('click', clickArrow);
	}
	function set() {
		var _this = $(this)
		photoNum = _this.data('num');
		content.html('<div class="popup-content-photo __active"><img src="'+_this.data('src')+'" alt=""></div>');
		popupMod.showByName('photo');
		
		photoParent = _this.parents('.content-block');
		photoCount = $('.photo-button', photoParent).length;
	}
	function append() {
		var button = $('.photo-button[data-num="'+photoNum+'"]', photoParent);
		
		content.append('<div class="popup-content-photo __new"><img src="'+button.data('src')+'" alt=""></div>');
		hidePrev();
	}
	function hidePrev() {
		if ($('.popup-content-photo.__active', content).length) $('.popup-content-photo.__active', content).addClass('__old').removeClass('__active');
		setTimeout(showNew, 501);
	}
	function showNew() {
		if ($('.popup-content-photo.__old', content).length) $('.popup-content-photo.__old', content).remove();
		if ($('.popup-content-photo.__new', content).length) $('.popup-content-photo.__new', content).removeClass('__new').addClass('__active');
		photoAnim = false;
	}
	function clickArrow() {
		if (photoAnim) return false;
		
		photoAnim = true;
		
		var isPrev = ($(this).hasClass('left')),
			num = photoNum + ((isPrev)?-1:1);
		
		if (num == 0) num = photoCount;
		if (num == photoCount+1) num = 1;
		
		photoNum = num;
		
		append();
	}
	function reset() {
		
	}
	
	return {
        init: init,
		reset: reset
    }
}();


var portfolio = function() {
	var context, wrapper, params;
	
	function init() {
		context = $('#portfolio');
		wrapper = $('#portfolio-wrapper');
		params = {
			delay: 250,
			imgIndex: 0,
			imgLength: $('IMG', context).length
		};
		
		setTimeout(loadImg, params.delay);
		setTimeout(bind, params.delay);
	}
	function loadImg() {
		var _imgElem = $('IMG', context).eq(params.imgIndex),
			_imgObj = new Image();
		
		_imgObj.onload = loadImgComplete;
		_imgObj.src = _imgElem.data('src');
	}
	function loadImgComplete() {
		var _imgElem = $('IMG', context).eq(params.imgIndex);
		_imgElem.attr('src', this.src);
		params.imgIndex++;
		if (params.imgIndex < params.imgLength) setTimeout(loadImg, params.delay);
	}
	
	function bind() {
		if (Modernizr.touch) {
			$('.hover', context)
				.bind('click', function(e) {
					var _li = $(this).parents('LI');
					if (_li.hasClass('hover-effect')) {
						return true;
					} else {
						$('LI', context).removeClass('hover-effect');
						e.preventDefault();
						_li.addClass('hover-effect');
					}
				});
		}
	}
	
	
	
	return {
        init: init
    }
}();