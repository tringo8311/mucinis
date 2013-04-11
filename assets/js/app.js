// App.js
// ===========

// > (c) 2013 Ngo Minh Tri, Mucinis Inc.
// > App may be freely distributed under the MIT license.
// > For all details and documentation: http://www.mucinis.com

// Initial Setup
// ------------------------------------------------------------
// Google function 
(function (a) {
    function g(b, c) {
        var d = new google.maps.Geocoder;
		
        d.geocode({
            address: c.address
        }, function (d, e) {
            if (e == google.maps.GeocoderStatus.OK) {
                var f = d[0].geometry.location;
				console.log(f);
                a.each(b, function (a, b) {
                    var d = new google.maps.Map(b, {
                        zoom: c.zoom,
                        center: f,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        scrollwheel: c.scrollwheel,
                        mapTypeControl: c.mapTypeControl
                    }),
                        e = new google.maps.Marker({
                            map: d,
                            position: f
                        })
                })
            }
        })
    }
    var b = "__jquerygmaps__",
        c = "http://maps.google.com/maps/api/js?v=3.3&sensor=false&callback=" + b,
        d = !1,
        e = a(document);
    window[b] = function () {
        d = !0, e.trigger("gmapsloaded")
    }, a.getScript(c);
    var f = {
        zoom: 13,
        scrollwheel: !1,
        mapTypeControl: !1
    };
    a.fn.gmaps = function (b) {		
        var c = a.extend({}, f, b),
            h = this;
        d ? g(h, c) : e.bind("gmapsloaded", function () {
            g(h, c)
        });
        return this
    }
})(jQuery);
// Form function
(function (a, b) {
    a.attrHooks.required = {}, a.fn.h5f = function () {
        return this.each(function (c, d) {
            var e = a(d),
                f = a("input, textarea", e);
            Modernizr.interactivevalidation || e.bind("submit", function (c) {
                f.each(function (d, e) {
                    var f = a(e);
                    if (f.attr("required") !== b && !f.val() || f.attr("type") === "email" && !/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(f.val())) c.preventDefault(), c.stopPropagation(), c.stopImmediatePropagation(), f.trigger("invalid")
                })
            }), f.bind("invalid", function (b) {
                var c = a(b.target).closest("p");
                c.addClass("invalid");
                var d = a("p.invalid", e);
                c[0] === d[0] && a("input, textarea", c).focus()
            }).bind("keyup", function (b) {
                a(b.target).closest("p").removeClass("invalid")
            })
        })
    }
})(jQuery);
(function(){
	var a = Backbone.Model.extend(),
	b = Backbone.Collection.extend({
		model: a
	}),
	g = function () {},
	h = $(document),
	i = [].slice,
	k = Backbone.View.extend({
		flag: false,
		initialize: function (a) {			
			//this.queue("init", "show", "hide");
		},
		queue: function () {
			_.each(arguments, function (a) {				
				var b = this[a];
				b !== g && (this[a] = function () {
					var a = [b, this].concat(_.toArray(arguments));
					h.queue(_.bind.apply(_, a))
				})
			}, this)
		},
		activate: function (a, b, c) {
			this.setTitle(), this.loadImages(), a
		},
		init: g,
		show: g,
		hide: g,
		setTitle: function(a){
			document.title = jQuery("h1.title").text() + " - " + this.$("h2.title").text();
		},
		loadImages: function (a) {
			$("img", this.el).each(function (a, b) {
				var c = $(b);
				c.attr("src", c.data("src"))
			}), this.loadImages = g
		},		
	});
	// About Us :: View
	aboutUsView = k.extend({
		init: function (_flag) {
			this.flag = _flag == undefined ? false : true;
			// Overlay
			this.$("div.hover-button[rel]").overlay({
				mask: {
					color: '#ebecff',
					loadSpeed: 200,
					opacity: 0.9
				}
			});
			// End Overlay
		},
		el: "#about-us"
	});
	// Service :: View
	serviceView = k.extend({
		init: function(_flag) {
			this.flag = _flag == undefined ? false : true;
			setTimeout(function() {
				this.$(".scroll").niceScroll({cursorcolor:"#fff", cursorwidth: 5, cursoropacitymin: 0, cursoropacitymax: .7, cursorborderradius: 0, background: '#000'});
			}, 1000);
		},
		el: "#service"
	});
	// Project :: View
	projectView = k.extend({
		init: function (_flag) {
			this.flag = _flag == undefined ? false : true;
			$("#main").scrollable({
				// basic settings
				vertical: true,
				// up/down keys will always control this scrollable
				keyboard: 'static',
				// assign left/right keys to the actively viewed scrollable
				onSeek: function(event, i) {
					horizontal.eq(i).data("scrollable").focus();
				}
				// main navigator (thumbnail images)
			}).navigator("#main_navi");
			// horizontal scrollables. each one is circular and has its own navigator instance
			var horizontal = $(".scrollable").scrollable({ circular: false }).navigator(".navi");

			// when page loads setup keyboard focus on the first horzontal scrollable
			horizontal.eq(0).data("scrollable").focus();
		},
		el: "#project"
	});
	// FAQs :: View
	faqView = k.extend({
		init: function (_flag) {
			this.flag = _flag == undefined ? false : true;
			// Using backbone for FAQs
			this.$(".faqEntry .question a").click(function(event){
				if(jQuery(this).hasClass('link_collapse')){
					jQuery(this).removeClass('link_collapse').addClass('link_expand');
					jQuery(this).parent().next(".collapse").removeClass('collapse').addClass('expand');
				}else{
					jQuery(this).removeClass('link_expand').addClass('link_collapse');
					jQuery(this).parent().next(".expand").removeClass('expand').addClass('collapse');
				}
				return false;
			});
			this.$(".link_expandAll").click(function(event){
				//console.log(this);
				if(jQuery(this).hasClass('link_expandAll')){
					jQuery(this).removeClass('link_expandAll').addClass('link_collapseAll');
					jQuery(this).text("Hide All");
					jQuery(".collapse").removeClass('collapse').addClass('expand');
				}else{
					jQuery(this).removeClass('link_collapseAll').addClass('link_expandAll');
					jQuery(this).text("Show All");
					jQuery(".expand").removeClass('expand').addClass('collapse');
				}
				//$('.vscroll').jScrollPane({scrollbarWidth:20, scrollbarMargin:10});
				return false;
			});
		},
		el: "#faqs"
	});
	// contact Us :: View
	contactUsView = k.extend({
		init: function (_flag) {
			this.flag = _flag == undefined ? false : true;
			this.$(".map figure").gmaps({
				address: this.$("dd.address").text()
			});
			var a = _.template($("#indicators-tpl").html(), {});
			this.$("form").append(a).h5f().submit(function (a) {
				a.preventDefault();
				var b = $(this);
				if (!b.data("sending")) {
					b.data("sending", !0);
					var c = $(".indicators .progress", b),
						d = $(".indicators .success", b),
						e = $(".indicators .error", b);
					d.stop(!0, !0).hide(), e.stop(!0, !0).hide(), c.stop(!0, !0).hide().fadeIn(), $.ajax({
						url: b.attr("action"),
						type: b.attr("method"),
						data: b.serialize(),
						success: function () {
							c.fadeOut("fast", function () {
								d.fadeIn().delay(5e3).fadeOut()
							})
						},
						error: function () {
							c.fadeOut("fast", function () {
								e.fadeIn().delay(5e3).fadeOut()
							})
						},
						complete: function () {
							b.data("sending", !1)
						}
					})
				}
			})
		},
		el: "#contact-us"
	});	
	
	jQuery(document).ready(function($) {
		var PlayersAppRouter = Backbone.Router.extend({
			initialize: function() {
				$("#loading").hide();
				// Auto width
				$(".scroll-section-container .item:not(:first) article").width($(window).width()).find(".section-inner").css('min-height', '520px');
				jQuery("nav.main ul").tabs(".scroll-section-container > .panes > .item", { tabs : "a.scroll-to", history : true, effect: 'horizontal'}).slideshow({clickable: false});
				jQuery("nav.main ul").bind("onClick", function(event, tabIndex) {
					// cancel the default action.
					// same as using "return false;" as the last line of this code block.
					event.preventDefault();
					/* If you have multiple callbacks of the same type this prevents
					  the rest of the callbacks from being executed. */
					event.stopImmediatePropagation();
					
					if(tabIndex>0){						
						$("nav.main").addClass('active');
					}else{
						$("nav.main").removeClass('active');
					}
					// Hash change
					lHash = $("li a.scroll-to", this).eq(tabIndex).attr("href");
					if(lHash != window.location.hash){
						window.location.hash = lHash.replace('#', '');
					}
				});
				// window.location.hash = 'list' if ! _.include( _.keys(@routes),(window.location.hash || '').replace('#',''))
			},
			routes: {
				"about-us" : "aboutUsRoute",
				"service" : "serviceRoute",
				"project" : "projectRoute",
				"faqs" : "faqsRoute",
				"contact-us" : "contactUsRoute",
				"*actions": "defaultRoute",
			},
			defaultRoute: function () {
				
			},
			aboutUsRoute: function(){
				if(!APP.ABOUTUS.flag){
					APP.ABOUTUS.init(true);
				}
				APP.ABOUTUS.activate();
			},
			serviceRoute: function(){
				if(!APP.SERVICE.flag){
					APP.SERVICE.init(true);
				}
				APP.SERVICE.activate();
			},
			projectRoute: function(){
				if(!APP.PROJECT.flag){
					APP.PROJECT.init(true);
				}
				APP.PROJECT.activate();
			},
			faqsRoute: function(){
				if(!APP.FAQs.flag){
					APP.FAQs.init(true);
				}
				APP.FAQs.activate();
			},
			contactUsRoute: function(){
				if(!APP.CONTACTUS.flag){
					APP.CONTACTUS.init(true);
				}
				APP.CONTACTUS.activate();
			}		
		});
		var APP = {};	
		APP.ROUTER = new PlayersAppRouter();
		
		APP.ABOUTUS = new aboutUsView();		
		APP.SERVICE = new serviceView();		
		APP.PROJECT = new projectView();
		APP.FAQs = new faqView();
		APP.CONTACTUS = new contactUsView();
		
		Backbone.history.start();
		//jQuery(".scroll").niceScroll({cursorcolor:"#00F"});
	});
}).call(this);