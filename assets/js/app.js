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
(function (a) {
    a.fn.quicksand = function (b, c) {
        var e = {
            duration: 750,
            easing: "swing",
            attribute: "data-id",
            adjustHeight: "auto",
            useScaling: !0,
            enhancement: function (a) {},
            selector: "> *",
            dx: 0,
            dy: 0
        };
        a.extend(e, c);
        if (a.browser.msie || typeof a.fn.scale == "undefined") e.useScaling = !1;
        var f;
        if (typeof arguments[1] == "function") var f = arguments[1];
        else if (typeof (arguments[2] == "function")) var f = arguments[2];
        return this.each(function (c) {
            var g, h = [],
                i = a(b).clone(),
                j = a(this),
                k = a(this).css("height"),
                l, m = !1,
                n = a(j).offset(),
                o = [],
                p = a(this).find(e.selector);
            if (a.browser.msie && a.browser.version.substr(0, 1) < 7) j.html("").append(i);
            else {
                var q = 0,
                    r = function () {
                        q || (q = 1, $toDelete = j.find("> *"), j.prepend(w.find("> *")), $toDelete.remove(), m && j.css("height", l), e.enhancement(j), typeof f == "function" && f.call(this))
                    },
                    s = j.offsetParent(),
                    t = s.offset();
                s.css("position") == "relative" ? s.get(0).nodeName.toLowerCase() != "body" && (t.top += parseFloat(s.css("border-top-width")) || 0, t.left += parseFloat(s.css("border-left-width")) || 0) : (t.top -= parseFloat(s.css("border-top-width")) || 0, t.left -= parseFloat(s.css("border-left-width")) || 0, t.top -= parseFloat(s.css("margin-top")) || 0, t.left -= parseFloat(s.css("margin-left")) || 0), isNaN(t.left) && (t.left = 0), isNaN(t.top) && (t.top = 0), t.left -= e.dx, t.top -= e.dy, j.css("height", a(this).height()), p.each(function (b) {
                    o[b] = a(this).offset()
                }), a(this).stop();
                var u = 0,
                    v = 0;
                p.each(function (b) {
                    a(this).stop();
                    var c = a(this).get(0);
                    c.style.position == "absolute" ? (u = -e.dx, v = -e.dy) : (u = e.dx, v = e.dy), c.style.position = "absolute", c.style.margin = "0", c.style.top = o[b].top - parseFloat(c.style.marginTop) - t.top + v + "px", c.style.left = o[b].left - parseFloat(c.style.marginLeft) - t.left + u + "px"
                });
                var w = a(j).clone(),
                    x = w.get(0);
                x.innerHTML = "", x.setAttribute("id", ""), x.style.height = "auto", x.style.width = j.width() + "px", w.append(i), w.insertBefore(j), w.css("opacity", 0), x.style.zIndex = -1, x.style.margin = "0", x.style.position = "absolute", x.style.top = n.top - t.top + "px", x.style.left = n.left - t.left + "px", e.adjustHeight === "dynamic" ? j.animate({
                    height: w.height()
                }, e.duration, e.easing) : e.adjustHeight === "auto" && (l = w.height(), parseFloat(k) < parseFloat(l) ? j.css("height", l) : m = !0), p.each(function (b) {
                    var c = [];
                    typeof e.attribute == "function" ? (g = e.attribute(a(this)), i.each(function () {
                        if (e.attribute(this) == g) {
                            c = a(this);
                            return !1
                        }
                    })) : c = i.filter("[" + e.attribute + "=" + a(this).attr(e.attribute) + "]"), c.length ? e.useScaling ? h.push({
                        element: a(this),
                        animation: {
                            top: c.offset().top - t.top,
                            left: c.offset().left - t.left,
                            opacity: 1,
                            scale: "1.0"
                        }
                    }) : h.push({
                        element: a(this),
                        animation: {
                            top: c.offset().top - t.top,
                            left: c.offset().left - t.left,
                            opacity: 1
                        }
                    }) : e.useScaling ? h.push({
                        element: a(this),
                        animation: {
                            opacity: "0.0",
                            scale: "0.0"
                        }
                    }) : h.push({
                        element: a(this),
                        animation: {
                            opacity: "0.0"
                        }
                    })
                }), i.each(function (b) {
                    var c = [],
                        f = [];
                    typeof e.attribute == "function" ? (g = e.attribute(a(this)), p.each(function () {
                        if (e.attribute(this) == g) {
                            c = a(this);
                            return !1
                        }
                    }), i.each(function () {
                        if (e.attribute(this) == g) {
                            f = a(this);
                            return !1
                        }
                    })) : (c = p.filter("[" + e.attribute + "=" + a(this).attr(e.attribute) + "]"), f = i.filter("[" + e.attribute + "=" + a(this).attr(e.attribute) + "]"));
                    var k;
                    if (c.length === 0) {
                        e.useScaling ? k = {
                            opacity: "1.0",
                            scale: "1.0"
                        } : k = {
                            opacity: "1.0"
                        }, d = f.clone();
                        var l = d.get(0);
                        l.style.position = "absolute", l.style.margin = "0", l.style.top = f.offset().top - t.top + "px", l.style.left = f.offset().left - t.left + "px", d.css("opacity", 0), e.useScaling && d.css("transform", "scale(0.0)"), d.appendTo(j), h.push({
                            element: a(d),
                            animation: k
                        })
                    }
                }), w.remove(), e.enhancement(j);
                for (c = 0; c < h.length; c++) h[c].element.animate(h[c].animation, e.duration, e.easing, r)
            }
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
	e = Backbone.Model.extend({
            initialize: function () {
                this.sects = new d
            }
        }, {
            title: document.title,
            txt2name: function (a) {
                return $.trim(a).toLowerCase().replace(/\s+/g, "-")
            }
        }),
	f = Backbone.Router.extend({
            routes: {
                "*path": "match"
            },
            redirects: {
                "": "/"
            },
            match: function (a) {
                a in this.redirects && (a = this.redirects[a]);
                var b = {
                    activePage: a
                };
                D.sects.some(function (a) {
                    if (!a.validate(b)) {
                        a.set(b, {
                            silent: !0
                        }), D.set({
                            activeSect: a.id
                        }, {
                            silent: !0
                        }), D.change(), a.change();
                        return !0
                    }
                })
            }
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
					b.apply(this, a), this.init = g;/*, c()*/
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
	}),
	l = k.extend({
		activate: function (a, b) {
			this.init();
			var c = b.pages.get(b.get("activePage")),
				d = c.view,
				e = {
					sectChanged: !! a
				};
			if (!b.hasChanged("activePage")) d.activate(null, c, e);
			else {
				var f = b.pages.get(b.previous("activePage")),
					g = f.view;
				g.deactivate(f, c, e), d.activate(f, c, e)
			}
			a && this.show()
		},
		deactivate: function (a, b) {
			var c = a.pages.get(a.get("activePage")),
				d = c.view;
			this.hide(), d.deactivate(c, null)
		},
		show: function (a) {
			/*$("#page").animate({
				top: -this.model.id * 100 + "%"
			}, a)*/
		}
	}),
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
			var c = $(this.el),
				d = c.css("display") == "none";
			d && c.css("visibility", "hidden").show();
			
			var f = this.$(".filter").lava();
			
			d && c.hide().css("visibility", "visible");
			var g = a.clone();
			
			$("li", f).click(function () {
				var b = $(this),
					c = "." + e.txt2name(b.text()),
					d = g.children(b.index() == 0 ? "" : c);
				a.quicksand(d, {
					adjustHeight: "dynamic",
					attribute: function (a) {
						return $("a", a).attr("href")
					}
				});
			})
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
