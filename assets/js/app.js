// App.js
// ===========

// > (c) 2013 Ngo Minh Tri, Mucinis Inc.
// > App may be freely distributed under the MIT license.
// > For all details and documentation: http://www.mucinis.com

// Initial Setup
// ------------------------------------------------------------
(function (a, b) {
    var c = {
        thumb: ".thumb",
        slot: "li"
    };
    a.fn.lava = function (b) {
        var d = a.extend({}, c, b);
        return this.each(function (b, c) {
            var e = a(c),
                f = a(d.thumb, c),
                g = a(d.slot, c);
            f.width(g.filter(".active").width() + 32), g.click(function () {
                var b = a(this);
                if (!b.hasClass("active")) {
                    var c = g.filter(".active");
                    c.add(b).toggleClass("active"), f.animate({
                        width: b.width() + 32,
                        left: b.position().left + parseInt(b.css("margin-left")) - 19
                    })
                }
            })
        })
    }
})(jQuery);
(function(){
	var a = Backbone.Model.extend(),
	b = Backbone.Collection.extend({
		model: a
	}),
	c = Backbone.Model.extend({
		initialize: function () {
			this.pages = new b
		},
		validate: function (a) {
			if (!this.pages.get(a.activePage)) return "Can't find page " + a.activePage + " in section " + this.id
		}
	}),
	d = Backbone.Collection.extend({
		model: c
	}),
	g = function () {},
	h = $(document),
	i = [].slice,
	k = Backbone.View.extend({
		initialize: function (a) {
			this.model && (this.model.view = this);
			if (this.init !== g) {
				var b = this.init;
				this.init = function () {
					var a = _.toArray(arguments),
						c = a.pop();
					//b.apply(this, a), this.init = g, c()
				}
			}
			this.queue("init", "show", "hide")
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
		init: g,
		show: g,
		hide: g
	})
	m = k.extend({
		initialize: function (a) {
			k.prototype.initialize.apply(this, arguments), this.container = a.container || this.el, this.queue("setTitle", "loadImages", "scrollToTop")
		},
		events: {
			"mouseover .back": "showTooltip",
			"mouseout .back": "hideTooltip",
			"mouseup .back": "hideTooltip",
			"click .back-to-top": "scrollToTopHandler"
		},
		scrollToTopHandler: function () {
			this.scrollToTop(!0)
		},
		activate: function (a, b, c) {
			this.setTitle(), this.loadImages(), this.init(), a && this.show(!c.sectChanged && D.inited)
		},
		deactivate: function (a, b, c) {
			b && this.hide(!c.sectChanged && D.inited), this.scrollToTop(!1)
		},
		setTitle: function (a) {
			document.title = this.$("h1.title").text() + " - " + e.title, a()
		},
		loadImages: function (a) {
			$("img", this.el).each(function (a, b) {
				var c = $(b);
				c.attr("src", c.data("src"))
			}), this.loadImages = g, a()
		},
		show: function (a, b) {
			this.fadeIn(a, b)
		},
		hide: function (a, b) {
			this.fadeOut(a, b)
		},
		fadeIn: function (a, b) {
			var c = $(this.el);
			a ? c.fadeIn(_.after(c.length, b)) : (c.show(), b())
		},
		fadeOut: function (a, b) {
			var c = $(this.el);
			a ? c.fadeOut("fast", _.after(c.length, b)) : (c.hide(), b())
		},
		scrollToTop: function (a, b) {
			var c = $(this.container);
			a ? c.animate({
				scrollTop: 0
			}, b) : (c.scrollTop(0), b())
		},
		showTooltip: function () {
			var a = this.$(".tooltip");
			if (!a.length) {
				var b = this.$(".back"),
					c = _.template($("#tooltip-tpl").html(), {
						text: b.text()
					});
				a = $(c).insertAfter(b)
			}
			a.is(":visible") || a.animate({
				opacity: "show",
				marginRight: "-=5"
			}, "fast")
		},
		hideTooltip: function () {
			var a = this.$(".tooltip");
			a.is(":visible") && a.animate({
				opacity: "hide",
				marginRight: "+=5"
			}, "fast")
		}
	}),
	r = m.extend({
		initialize: function () {
			m.prototype.initialize.apply(this, arguments), this.queue("changeClass")
		},
		init: function () {
			var a = this.$(".thumbnails"),
				b = _.template($("#filter-tpl").html(), {});
			$(b).insertBefore(a);
			/*var c = $(this.el),
				d = c.css("display") == "none";
			d && c.css("visibility", "hidden").show();
			var f = this.$(".filter").lava();
			d && c.hide().css("visibility", "visible");
			var g = a.clone();
			$("li", f).click(function () {
				var b = $(this),
					c = "." + e.txt2name(b.text()),
					d = g.children(b.index() == 0 ? "" : c);
				/*a.quicksand(d, {
					adjustHeight: "dynamic",
					attribute: function (a) {
						return $("a", a).attr("href")
					}
				})
			})*/
		},
		activate: function () {
			this.changeClass(), m.prototype.activate.apply(this, arguments)
		},
		changeClass: function (a) {
			$(this.el).filter("header").removeClass("list-mode").addClass("overview-mode"), a()
		}
	});
	var w = new a({
        id: "/project"
    }),
	K = $("#project"),
	L = new r({
		model: w,
		container: K,
		el: $(">header, >footer", K)
	});
	// con khi kho
	var a = this.$(".thumbnails"),
				b = _.template($("#filter-tpl").html(), {});
				console.log(b);
				$(b).insertBefore(a);
	L.init();
})(jQuery);
(function(){
	var root = this;
	// Handle scroll
	// mouse wheel scroll for safari
	root.handle = function(delta) {
		var iAantalPixels = 75;
		if (delta < 0 ) {
			window.scrollBy(iAantalPixels, 0);
		} else {
			window.scrollBy(-iAantalPixels, 0);
		}
	} 
	root.wheel = function(event){
		root.cancelscroll(event);
		var delta = 0;
		if (!event) {
			event = window.event;
		}
		if (event.wheelDelta) {
			delta = event.wheelDelta/120;
			if (window.opera) {
				delta = -delta;
			}
		} else if (event.detail) {
			delta = -event.detail/3;
		}
		if (delta) {
			this.handle(delta);
		}
	}	
	root.cancelscroll = function(e) {
		e.preventDefault();
	};
	
	// Initialization code
	if (window.addEventListener){
		window.addEventListener('DOMMouseScroll', root.wheel, false);
	}
	$(".faqs .scroll").bind('mousewheel', function() {
		return false;
	});
	window.onmousewheel = document.onmousewheel = root.wheel;
	
	jQuery(document).ready(function($) {
		jQuery(".scroll-to").click(function(event){
			event.preventDefault();
			if( $(window).width() > 1024 ){
				jQuery('html,body').animate({scrollLeft:$(this.hash).offset().left}, 1000);
			}
			else{
				jQuery('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
			}
		});
		// Using backbone for FAQs
		jQuery(".faqEntry .question a").click(function(event){
			if(jQuery(this).hasClass('link_collapse')){
				jQuery(this).removeClass('link_collapse').addClass('link_expand');
				jQuery(this).parent().next(".collapse").removeClass('collapse').addClass('expand');
			}else{
				jQuery(this).removeClass('link_expand').addClass('link_collapse');
				jQuery(this).parent().next(".expand").removeClass('expand').addClass('collapse');
			}
			return false;
		});
		jQuery(".faqs .link_expandAll").click(function(event){
			if(jQuery(this).hasClass('link_expandAll')){
				jQuery(this).removeClass('link_expandAll').addClass('link_collapseAll');
				jQuery(this).text("Hide All");
				jQuery(".faqs .collapse").removeClass('collapse').addClass('expand');
			}else{
				jQuery(this).removeClass('link_collapseAll').addClass('link_expandAll');
				jQuery(this).text("Show All");
				jQuery(".faqs .expand").removeClass('expand').addClass('collapse');
			}
			//$('.vscroll').jScrollPane({scrollbarWidth:20, scrollbarMargin:10});
			return false;
		});
	});
	//Backbone.history.start();
	// vscroll
	//this.$('.vscroll').jScrollPane({scrollbarWidth:20, scrollbarMargin:10});
}).call(this);
